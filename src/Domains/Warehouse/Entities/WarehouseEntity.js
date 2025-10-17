// src/Domains/Warehouse/Entities/WarehouseEntity.js


export default class Warehouse {
  constructor({
    id = null,
    code = null,      
    name,           
    location = null,   
    type = 'branch',    
    isActive = true,    
    createdAt = null,
    updatedAt = null,
  }) {
    this.id = id;
    this.code = code;
    this.name = name;
    this.location = location;
    this.type = type;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }


  static fromPersistence(record) {
    if (!record) return null;

    return new Warehouse({
      id: record.id,
      code: record.code ?? null,
      name: record.name,
      location: record.location ?? null,
      type: record.type ?? 'branch',
      isActive: record.isActive ?? record.is_active ?? true,
      createdAt: record.createdAt ?? record.created_at ?? null,
      updatedAt: record.updatedAt ?? record.updated_at ?? null,
    });
  }


  toJSON() {
    return {
      id: this.id,
      code: this.code,
      name: this.name,
      location: this.location,
      type: this.type,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
