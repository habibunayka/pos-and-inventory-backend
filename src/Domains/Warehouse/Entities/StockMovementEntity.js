
export default class StockMovement {
  constructor({
    id = null,
    warehouseId,  
    itemId,      
    qty,              
    type,            
    reference = null,   
    note = null,       
    createdAt = null,
  }) {
    this.id = id;
    this.warehouseId = warehouseId;
    this.itemId = itemId;
    this.qty = qty;
    this.type = type;
    this.reference = reference;
    this.note = note;
    this.createdAt = createdAt;
  }

  static fromPersistence(record) {
    if (!record) return null;

    return new StockMovement({
      id: record.id,
      warehouseId: record.warehouseId ?? record.warehouse_id,
      itemId: record.itemId ?? record.item_id,
      qty: record.qty,
      type: record.type,
      reference: record.reference ?? null,
      note: record.note ?? null,
      createdAt: record.createdAt ?? record.created_at ?? null,
    });
  }

  get signedQty() {
    const outTypes = ['TRANSFER_OUT', 'WASTE', 'ADJUSTMENT_MINUS'];
    return outTypes.includes(this.type)
      ? -Math.abs(this.qty)
      : Math.abs(this.qty);
  }

  toJSON() {
    return {
      id: this.id,
      warehouseId: this.warehouseId,
      itemId: this.itemId,
      qty: this.qty,
      signedQty: this.signedQty,
      type: this.type,
      reference: this.reference,
      note: this.note,
      createdAt: this.createdAt,
    };
  }
}
