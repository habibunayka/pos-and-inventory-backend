
export default class ReceivePurchaseUsecase {
  constructor({ warehouseRepository }) {
    if (!warehouseRepository)
      throw new Error('ReceivePurchaseUsecase requires warehouseRepository');
    this.repo = warehouseRepository;
  }

  async execute(payload) {
    const { warehouseId, items } = payload ?? {};

    if (!warehouseId) throw new Error('RECEIVE.WAREHOUSE_ID_REQUIRED');
    if (!Array.isArray(items) || items.length === 0)
      throw new Error('RECEIVE.INVALID_ITEMS');

    // setiap item minimal butuh itemId dan qty
    for (const item of items) {
      if (!item.itemId || typeof item.qty !== 'number' || item.qty <= 0) {
        throw new Error('RECEIVE.INVALID_ITEM_DATA');
      }
    }

    return this.repo.receivePurchase({
      warehouseId: Number(warehouseId),
      items: items.map((i) => ({
        itemId: Number(i.itemId),
        qty: Number(i.qty),
      })),
    });
  }
}
