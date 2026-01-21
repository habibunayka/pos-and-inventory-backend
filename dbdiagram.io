// Database diagram synced with Prisma schema (prisma/entities)
// Update Prisma models before editing this file.

Table users {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null]
  email text [unique]
  password_hash text
  pin_code_hash text
  avatar_url text
  status text [not null, default: 'active']
}

Table roles {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null, unique]
  description text
}

Table permissions {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null, unique]
  description text
}

Table role_permissions {
  id serial [pk, not null]
  deleted_at timestamp
  role_id int [not null, ref: > roles.id]
  permission_id int [not null, ref: > permissions.id]

  indexes {
    (role_id, permission_id) [unique]
  }
}

Table user_roles {
  id serial [pk, not null]
  deleted_at timestamp
  user_id int [not null, ref: > users.id]
  role_id int [not null, ref: > roles.id]
  place_id int [ref: > places.id]

  indexes {
    (user_id, role_id, place_id) [unique]
  }
}

Table places {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null]
  address text
  phone text
  logo_path text
  type text
  is_active boolean [not null, default: true]
}

Table place_stocks {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [not null, ref: > places.id]
  ingredient_id int [not null, ref: > ingredients.id]
  qty decimal(12,2) [not null, default: 0]
  unit_id int [not null, ref: > units.id]

  indexes {
    (place_id, ingredient_id, unit_id) [unique]
  }
}

Table cashier_shifts {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [not null, ref: > places.id]
  station_id int [not null, ref: > stations.id]
  shift_id int [not null, ref: > shifts.id]
  cashier_id int [not null, ref: > users.id]
  opened_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
  closed_at timestamp
  opening_balance decimal(12,2) [not null, default: 0]
  closing_balance decimal(12,2)
  system_balance decimal(12,2)
  ip_address text [not null]
  status text [not null, default: 'open']
}

Table stations {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [not null, ref: > places.id]
  name text [not null]
  description text
  is_active boolean [not null, default: true]

  indexes {
    (place_id, name) [unique]
  }
}

Table shifts {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [not null, ref: > places.id]
  name text [not null]
  start_time text [not null]
  end_time text [not null]
  description text
  is_active boolean [not null, default: true]

  indexes {
    (place_id, name) [unique]
  }
}

Table menus {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [ref: > places.id]
  name text [not null]
  category_id int [ref: > categories.id]
  description text
  sku text
  is_active boolean [not null, default: true]
}

Table categories {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null, unique]
}

Table menu_variants {
  id serial [pk, not null]
  deleted_at timestamp
  menu_id int [not null, ref: > menus.id]
  name text [not null]
}

Table menu_prices {
  id serial [pk, not null]
  deleted_at timestamp
  menu_id int [not null, ref: > menus.id]
  price decimal(12,2) [not null]
  effective_date date [not null]
}

Table menu_variant_items {
  id serial [pk, not null]
  deleted_at timestamp
  menu_variant_id int [not null, ref: > menu_variants.id]
  name text [not null]
  additional_price decimal(12,2) [not null, default: 0]
}

Table units {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null, unique]
  abbreviation text [not null, unique]
}

Table ingredients {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null]
  unit_id int [not null, ref: > units.id]
}

Table recipes {
  id serial [pk, not null]
  deleted_at timestamp
  menu_id int [not null, ref: > menus.id]
  ingredient_id int [not null, ref: > ingredients.id]
  qty decimal(12,2) [not null]

  indexes {
    (menu_id, ingredient_id) [unique]
  }
}

Table payment_methods {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null, unique]
  description text
  is_active boolean [not null, default: true]
}

Table transactions {
  id serial [pk, not null]
  deleted_at timestamp
  cashier_id int [not null, ref: > users.id]
  place_id int [ref: > places.id]
  table_id int [ref: > tables.id]
  order_type text
  customer_name text
  status text
  note text
  items_json jsonb
  total decimal(12,2) [not null]
  tax decimal(12,2)
  discount decimal(12,2)
  payment_method_id int [ref: > payment_methods.id]
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
}

Table transaction_items {
  id serial [pk, not null]
  deleted_at timestamp
  transaction_id int [not null, ref: > transactions.id]
  menu_id int [not null, ref: > menus.id]
  qty int [not null]
  price decimal(12,2) [not null]
  discount decimal(12,2)
}

Table transaction_item_variants {
  id serial [pk, not null]
  deleted_at timestamp
  transaction_item_id int [not null, ref: > transaction_items.id]
  menu_variant_id int [not null, ref: > menu_variants.id]
  extra_price decimal(12,2) [not null, default: 0]

  indexes {
    (transaction_item_id, menu_variant_id) [unique]
  }
}

Table transaction_item_costs {
  id serial [pk, not null]
  deleted_at timestamp
  transaction_item_id int [not null, ref: > transaction_items.id]
  total_cost decimal(12,2) [not null]
  calculated_at timestamp [not null, default: `CURRENT_TIMESTAMP`]

  indexes {
    (transaction_item_id) [unique]
  }
}

Table tables {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [not null, ref: > places.id]
  name text [not null]
  capacity int [not null, default: 0]
  status text
}

Table kitchen_orders {
  id serial [pk, not null]
  deleted_at timestamp
  transaction_item_id int [not null, ref: > transaction_items.id]
  status text [not null, default: 'queued']
  started_at timestamp
  finished_at timestamp
  note text
}

Table suppliers {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null]
  contact_name text
  phone text
  email text
  address text
}

Table supplier_products {
  id serial [pk, not null]
  deleted_at timestamp
  supplier_id int [not null, ref: > suppliers.id]
  ingredient_id int [not null, ref: > ingredients.id]
  package_id int [not null, ref: > packages.id]
  qty decimal(12,2) [not null]
  price decimal(12,2) [not null]
  lead_time int
  is_active boolean [not null, default: true]

  indexes {
    (supplier_id, ingredient_id, package_id) [unique]
  }
}

Table purchase_orders {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [not null, ref: > places.id]
  supplier_id int [not null, ref: > suppliers.id]
  type text
  note text
  status text [not null, default: 'draft']
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
}

Table purchase_order_items {
  id serial [pk, not null]
  deleted_at timestamp
  purchase_order_id int [not null, ref: > purchase_orders.id]
  ingredient_package_id int [not null, ref: > ingredient_packages.id]
  qty decimal(12,2) [not null]
  price decimal(12,2) [not null]
}

Table packages {
  id serial [pk, not null]
  deleted_at timestamp
  name text [not null, unique]
  description text
}

Table ingredient_packages {
  id serial [pk, not null]
  deleted_at timestamp
  ingredient_id int [not null, ref: > ingredients.id]
  package_id int [not null, ref: > packages.id]
  qty decimal(12,2) [not null]

  indexes {
    (ingredient_id, package_id) [unique]
  }
}

Table goods_receipts {
  id serial [pk, not null]
  deleted_at timestamp
  purchase_order_id int [not null, ref: > purchase_orders.id]
  received_by int [ref: > users.id]
  received_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
  note text
}

Table goods_receipt_items {
  id serial [pk, not null]
  deleted_at timestamp
  goods_receipt_id int [not null, ref: > goods_receipts.id]
  purchase_order_item_id int [not null, ref: > purchase_order_items.id]
  unit_received decimal(12,2) [not null]
  unit_damaged decimal(12,2) [not null, default: 0]
  unit_id int [not null, ref: > units.id]
  remarks text
}

Table stock_transfers {
  id serial [pk, not null]
  deleted_at timestamp
  ingredient_id int [not null, ref: > ingredients.id]
  from_place_id int [ref: > places.id]
  to_place_id int [ref: > places.id]
  qty decimal(12,2) [not null]
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
}

Table wastes {
  id serial [pk, not null]
  deleted_at timestamp
  ingredient_id int [not null, ref: > ingredients.id]
  place_id int [ref: > places.id]
  qty decimal(12,2) [not null]
  reason text
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
}

Table inventory_stock_daily {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [not null, ref: > places.id]
  ingredient_id int [not null, ref: > ingredients.id]
  date date [not null]
  opening_qty decimal(12,2) [not null, default: 0]
  closing_qty decimal(12,2) [not null, default: 0]
  diff_qty decimal(12,2)
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]

  indexes {
    (place_id, ingredient_id, date) [unique]
  }
}

Table promotions {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [ref: > places.id]
  name text [not null]
  start_at timestamp
  end_at timestamp
}

Table promotion_rules {
  id serial [pk, not null]
  deleted_at timestamp
  promotion_id int [not null, ref: > promotions.id]
  rule_type text
  value text
}

Table activity_logs {
  id serial [pk, not null]
  deleted_at timestamp
  user_id int [ref: > users.id]
  action text [not null]
  entity_type text
  entity_id int
  context_json jsonb
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
}

Table system_logs {
  id serial [pk, not null]
  deleted_at timestamp
  level text
  message text [not null]
  context_json jsonb
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
}

Table report_files {
  id serial [pk, not null]
  deleted_at timestamp
  report_type text [not null]
  report_scope text [not null]
  report_date date
  place_id int [ref: > places.id]
  file_name text [not null]
  file_path text [not null]
  created_at timestamp [not null, default: `CURRENT_TIMESTAMP`]
}

Table delivery_integrations {
  id serial [pk, not null]
  deleted_at timestamp
  place_id int [not null, ref: > places.id]
  platform_name text [not null]
  api_key text
  settings_json jsonb
}
