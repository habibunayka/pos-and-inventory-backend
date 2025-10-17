export default class WarehousePresenter {
  presentWarehouse(x) {
    return { id: x.id, name: x.name, type: x.type ?? null, isActive: x.isActive ?? true };
  }

  presentStock(x) {
    return {
      ingredientId: x.ingredientId ?? x.ingredient?.id ?? null,
      ingredientName: x.ingredient?.name ?? null,
      qty: Number(x.qty ?? x.quantity ?? 0),
      warehouseId: x.warehouseId ?? x.outletId ?? null,
    };
  }

  present(x) {
    return x && (x.ingredientId || x.ingredient) ? this.presentStock(x) : this.presentWarehouse(x);
  }
  presentCollection(xs) {
    return xs.map((x) => this.present(x));
  }
}
