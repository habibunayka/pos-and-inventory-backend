export default class ReceivePurchaseUsecase {
  constructor({ warehouseRepository }) {
    if (!warehouseRepository) throw new Error('ReceivePurchaseUsecase requires warehouseRepository');
    this.repo = warehouseRepository;
  }

  async execute(payload) {
    const { purchaseId } = payload ?? {};
    if (!purchaseId) throw new Error('RECEIVE.PURCHASE_ID_REQUIRED');

    // Validasi status & item handled di repo
    return this.repo.receivePurchase({ purchaseId: Number(purchaseId) });
  }
}
