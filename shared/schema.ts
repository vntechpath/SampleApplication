import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const skuInventory = pgTable("sku_inventory", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  sku: text("sku").notNull().unique(),
  productName: text("product_name").notNull(),
  category: text("category").notNull(),
  quantityOnHand: integer("quantity_on_hand").notNull(),
  quantityReserved: integer("quantity_reserved").notNull(),
  quantityAvailable: integer("quantity_available").notNull(),
  reorderPoint: integer("reorder_point").notNull(),
  reorderQuantity: integer("reorder_quantity").notNull(),
  unitCost: numeric("unit_cost", { precision: 10, scale: 2 }).notNull(),
  totalValue: numeric("total_value", { precision: 12, scale: 2 }).notNull(),
  supplier: text("supplier").notNull(),
  leadTimeDays: integer("lead_time_days").notNull(),
  lastRestockDate: timestamp("last_restock_date"),
  location: text("location").notNull(),
});

export const alternativeSkus = pgTable("alternative_skus", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  primarySku: text("primary_sku").notNull(),
  alternativeSku: text("alternative_sku").notNull(),
  description: text("description").notNull(),
  conversionRatio: numeric("conversion_ratio", { precision: 10, scale: 4 }).notNull(),
});

export const openOrders = pgTable("open_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  orderNumber: text("order_number").notNull(),
  sku: text("sku").notNull(),
  customerName: text("customer_name").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
  totalAmount: numeric("total_amount", { precision: 12, scale: 2 }).notNull(),
  orderDate: timestamp("order_date").notNull(),
  expectedShipDate: timestamp("expected_ship_date"),
  status: text("status").notNull(),
  priority: text("priority").notNull(),
});

export const purchaseOrders = pgTable("purchase_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  poNumber: text("po_number").notNull(),
  sku: text("sku").notNull(),
  supplier: text("supplier").notNull(),
  quantity: integer("quantity").notNull(),
  unitCost: numeric("unit_cost", { precision: 10, scale: 2 }).notNull(),
  totalCost: numeric("total_cost", { precision: 12, scale: 2 }).notNull(),
  orderDate: timestamp("order_date").notNull(),
  expectedDeliveryDate: timestamp("expected_delivery_date"),
  status: text("status").notNull(),
});

export const leads = pgTable("leads", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  leadNumber: text("lead_number").notNull(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  interestedSku: text("interested_sku").notNull(),
  estimatedQuantity: integer("estimated_quantity"),
  estimatedValue: numeric("estimated_value", { precision: 12, scale: 2 }),
  status: text("status").notNull(),
  source: text("source").notNull(),
  createdDate: timestamp("created_date").notNull(),
});

export const opportunities = pgTable("opportunities", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  opportunityNumber: text("opportunity_number").notNull(),
  companyName: text("company_name").notNull(),
  contactName: text("contact_name").notNull(),
  sku: text("sku").notNull(),
  quantity: integer("quantity").notNull(),
  proposedPrice: numeric("proposed_price", { precision: 10, scale: 2 }).notNull(),
  totalValue: numeric("total_value", { precision: 12, scale: 2 }).notNull(),
  probability: integer("probability").notNull(),
  stage: text("stage").notNull(),
  expectedCloseDate: timestamp("expected_close_date"),
  createdDate: timestamp("created_date").notNull(),
});

export const insertSkuInventorySchema = createInsertSchema(skuInventory).omit({ id: true });
export const insertAlternativeSkuSchema = createInsertSchema(alternativeSkus).omit({ id: true });
export const insertOpenOrderSchema = createInsertSchema(openOrders).omit({ id: true });
export const insertPurchaseOrderSchema = createInsertSchema(purchaseOrders).omit({ id: true });
export const insertLeadSchema = createInsertSchema(leads).omit({ id: true });
export const insertOpportunitySchema = createInsertSchema(opportunities).omit({ id: true });

export type SkuInventory = typeof skuInventory.$inferSelect;
export type AlternativeSku = typeof alternativeSkus.$inferSelect;
export type OpenOrder = typeof openOrders.$inferSelect;
export type PurchaseOrder = typeof purchaseOrders.$inferSelect;
export type Lead = typeof leads.$inferSelect;
export type Opportunity = typeof opportunities.$inferSelect;

export type InsertSkuInventory = z.infer<typeof insertSkuInventorySchema>;
export type InsertAlternativeSku = z.infer<typeof insertAlternativeSkuSchema>;
export type InsertOpenOrder = z.infer<typeof insertOpenOrderSchema>;
export type InsertPurchaseOrder = z.infer<typeof insertPurchaseOrderSchema>;
export type InsertLead = z.infer<typeof insertLeadSchema>;
export type InsertOpportunity = z.infer<typeof insertOpportunitySchema>;
