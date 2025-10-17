
import WarehouseRepository from "../../Domains/Warehouse/repositories/WarehouseRepository.js";

export default class PrismaWarehouseRepository extends WarehouseRepository {
  constructor({ prisma } = {}) {
    super();

    if (!prisma) {
      throw new Error("PRISMA_WAREHOUSE_REPOSITORY.MISSING_CLIENT");
    }

    this._prisma = prisma;
  }

  async findAll() {
    return this._prisma.warehouse.findMany({ orderBy: { id: "asc" } });
  }

  async findById(id) {
    return this._prisma.warehouse.findUnique({ where: { id } });
  }

  async createWarehouse({ warehouseData }) {
    return this._prisma.warehouse.create({ data: warehouseData });
  }

  async updateWarehouse({ id, warehouseData }) {
    try {
      return await this._prisma.warehouse.update({ where: { id }, data: warehouseData });
    } catch (error) {
      if (error?.code === "P2025") return null;
      throw error;
    }
  }

  async deleteWarehouse(id) {
    try {
      await this._prisma.warehouse.delete({ where: { id } });
      return true;
    } catch (error) {
      if (error?.code === "P2025") return false;
      throw error;
    }
  }

  async findStocksByWarehouse(warehouseId) {
    return this._prisma.warehouseStock.findMany({
      where: { warehouseId },
      include: { ingredient: true },
      orderBy: { ingredientId: "asc" },
    });
  }

  async assertSufficientStock(warehouseId, ingredientId, quantity) {
    const stock = await this._prisma.warehouseStock.findUnique({
      where: { warehouseId_ingredientId: { warehouseId, ingredientId } },
    });

    if (!stock || Number(stock.qty) < Number(quantity)) {
      throw new Error("WAREHOUSE_REPOSITORY.INSUFFICIENT_STOCK");
    }

    return true;
  }

  async transferStock({ sourceWarehouseId, targetWarehouseId, productId, quantity, note }) {
    await this.assertSufficientStock(sourceWarehouseId, productId, quantity);

    return this._prisma.$transaction(async (tx) => {
      await tx.warehouseStock.update({
        where: { warehouseId_ingredientId: { warehouseId: sourceWarehouseId, ingredientId: productId } },
        data: { qty: { decrement: quantity } },
      });

      await tx.warehouseStock.upsert({
        where: { warehouseId_ingredientId: { warehouseId: targetWarehouseId, ingredientId: productId } },
        update: { qty: { increment: quantity } },
        create: { warehouseId: targetWarehouseId, ingredientId: productId, qty: quantity },
      });

     
      await tx.stockTransfer.create({
        data: {
          ingredientId: productId,
          fromOutletId: sourceWarehouseId,
          toOutletId: targetWarehouseId,
          qty: quantity,

        },
      });

      return { message: "Stock transferred successfully" };
    });
  }

  async receivePurchase({ warehouseId, items }) {
    return this._prisma.$transaction(async (tx) => {
      for (const item of items) {
        await tx.warehouseStock.upsert({
          where: { warehouseId_ingredientId: { warehouseId, ingredientId: item.itemId } },
          update: { qty: { increment: item.qty } },
          create: { warehouseId, ingredientId: item.itemId, qty: item.qty },
        });

        await tx.stockTransfer.create({
          data: {
            ingredientId: item.itemId,
            fromOutletId: null,
            toOutletId: warehouseId,
            qty: item.qty,
          },
        });
      }

      return { message: "Purchase received successfully", warehouseId };
    });
  }

  async createStockAdjustment({ warehouseId, productId, difference, reason }) {
    return this._prisma.$transaction(async (tx) => {
      const stock = await tx.warehouseStock.findUnique({
        where: { warehouseId_ingredientId: { warehouseId, ingredientId: productId } },
      });

      if (!stock) {
        throw new Error("STOCK_ADJUSTMENT.ITEM_NOT_FOUND");
      }

      const newQty = Number(stock.qty) + Number(difference);
      await tx.warehouseStock.update({
        where: { warehouseId_ingredientId: { warehouseId, ingredientId: productId } },
        data: { qty: newQty },
      });

      await tx.stockAdjustment.create({
        data: {
          ingredientId: productId,
          outletId: warehouseId,
          qtyDiff: difference,
          reason,
        },
      });

      return { message: "Stock adjusted successfully", newQty };
    });
  }
}
