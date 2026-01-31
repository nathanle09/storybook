import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Arrangement data
    title: v.string(),
    subtitle: v.optional(v.string()),
    message: v.optional(v.string()),
    productId: v.string(),
    productName: v.string(),
    productPhotos: v.string(),
    productPrice: v.number(),

    // Customer info
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zip: v.string(),

    // Order status
    status: v.union(
      v.literal("draft"),
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("cancelled")
    ),

    // File references (from Convex storage)
    imageStorageIds: v.array(v.id("_storage")),
    videoStorageId: v.optional(v.id("_storage")),

    // Timestamps
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"]),
});
