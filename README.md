# POS and Inventory Backend

Backend service for the POS and inventory platform.

## Permissions

Manage permissions imply the view/add/edit/delete permissions for the same domain.

### Permission Catalog

| Permission | Description |
| --- | --- |
| manage_menus | Create, edit, and archive menu items. |
| view_menus | View menu items. |
| add_menus | Create new menu items. |
| edit_menus | Update existing menu items. |
| delete_menus | Remove menu items. |
| manage_categories | Create, edit, and archive menu categories. |
| view_categories | View menu categories. |
| add_categories | Create new menu categories. |
| edit_categories | Update existing menu categories. |
| delete_categories | Remove menu categories. |
| manage_inventory | Track stock levels, perform stock counts, and adjust inventory. |
| view_inventory | View inventory levels and stock movements. |
| add_inventory | Record new inventory items or adjustments. |
| edit_inventory | Modify inventory details and stock counts. |
| delete_inventory | Remove inventory items or adjustments. |
| manage_suppliers | Maintain supplier records and purchasing agreements. |
| view_suppliers | View supplier profiles and products. |
| add_suppliers | Create new supplier records or products. |
| edit_suppliers | Update supplier information and offerings. |
| delete_suppliers | Remove suppliers or supplier products. |
| manage_promotions | Create and control promotions, vouchers, and discounts. |
| view_promotions | View promotions and voucher configurations. |
| add_promotions | Create new promotions or voucher rules. |
| edit_promotions | Update promotion settings and eligibility. |
| delete_promotions | Archive or remove promotions and voucher rules. |
| manage_orders | Handle dine-in, takeaway, and delivery orders. |
| view_orders | View orders and their fulfillment status. |
| add_orders | Create new dine-in, takeaway, or delivery orders. |
| edit_orders | Modify existing orders and their details. |
| delete_orders | Cancel or remove orders and order items. |
| manage_payments | Process payments, refunds, and cash reconciliation. |
| view_payments | View payment configurations and shift logs. |
| add_payments | Record new payment methods or cashier shifts. |
| edit_payments | Update payment method settings or shift records. |
| delete_payments | Remove payment methods or cashier shift entries. |
| manage_places | Create and update place information and operating hours. |
| view_places | View outlet or place configurations. |
| add_places | Create new places or outlet profiles. |
| edit_places | Update place information and operating details. |
| delete_places | Deactivate or remove place records. |
| manage_tables | Manage dining table layout and reservations. |
| view_tables | View table layouts and assignments. |
| add_tables | Create new tables or seating areas. |
| edit_tables | Modify table details, layout, or assignments. |
| delete_tables | Remove tables or seating configurations. |
| manage_delivery_channels | Configure delivery partners and online ordering channels. |
| view_delivery_channels | View delivery channel integrations. |
| add_delivery_channels | Create new delivery channel integrations. |
| edit_delivery_channels | Update delivery channel settings. |
| delete_delivery_channels | Remove delivery channel integrations. |
| manage_kitchen_operations | Control kitchen display systems and production queues. |
| view_kitchen_operations | View kitchen orders and production queues. |
| add_kitchen_operations | Create new kitchen orders or tickets. |
| edit_kitchen_operations | Update kitchen order progress or routing. |
| delete_kitchen_operations | Remove kitchen orders from the queue. |
| manage_staff | Invite employees and manage their assignments. |
| view_staff | View employee lists and assignments. |
| add_staff | Create employee accounts or invitations. |
| edit_staff | Update staff details or assignments. |
| delete_staff | Deactivate or remove staff accounts. |
| manage_roles_permissions | Configure roles and permission assignments. |
| view_roles | View available roles and their permissions. |
| add_roles | Create new roles with permission sets. |
| edit_roles | Update role details and assigned permissions. |
| delete_roles | Remove roles and revoke assignments. |
| view_permissions | View registered permissions. |
| add_permissions | Register new permissions. |
| edit_permissions | Update permission descriptions. |
| delete_permissions | Remove permissions from the catalog. |
| manage_reports | Manage generated reports, logs, and exports. |
| view_reports | Access sales, operational, and financial reports. |
| add_reports | Generate new reports or log entries. |
| edit_reports | Update generated report metadata or status. |
| delete_reports | Delete reports or associated logs. |
| manage_company_profile | Manage company profile, subscription, and billing settings. |
| manage_customer_data | Maintain customer database and loyalty programs. |

### Default Role Permissions

| Role | Description | Permissions |
| --- | --- | --- |
| brand_owner | Brand owner with complete system access. | All permissions in the catalog. |
| location_owner | Location owner overseeing outlet performance and configuration. | manage_company_profile, manage_places, manage_staff, manage_menus, manage_categories, manage_inventory, manage_suppliers, manage_promotions, manage_orders, manage_payments, manage_tables, manage_delivery_channels, manage_reports, manage_kitchen_operations, manage_customer_data, manage_roles_permissions |
| admin | Administrator managing staff access and master data. | manage_places, manage_staff, manage_menus, manage_categories, manage_inventory, manage_suppliers, manage_promotions, manage_reports, manage_roles_permissions, manage_customer_data |
| store_manager | Store manager handling daily operations. | manage_orders, manage_payments, manage_tables, manage_kitchen_operations, manage_menus, manage_categories, manage_inventory, manage_suppliers, manage_customer_data, manage_reports |
| cashier | Point of sale operator using PIN authentication. | manage_orders, manage_payments, manage_customer_data |
| chef | Kitchen staff focused on production queue. | manage_kitchen_operations, manage_orders |
| purchaising | Staff responsible for procurement and stock replenishment. | manage_inventory, manage_suppliers, manage_promotions, manage_reports |
| waiters | Front-of-house staff managing tables and customer service. | manage_orders, manage_tables, manage_customer_data |
