export default class WarehousePresenter {
  present(warehouse) {
    if (!warehouse) return null;
    return {
      id: warehouse.id,
      name: warehouse.name,
      location: warehouse.address ?? null,
      phone: warehouse.phone ?? null,
    };
  }

  presentCollection(warehouses) {
    return warehouses.map((w) => this.present(w));
  }
}
