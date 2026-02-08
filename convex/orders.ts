import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createOrder = mutation({
  args: {
    title: v.string(),
    productId: v.string(),
    productName: v.string(),
    productPhotos: v.string(),
    productPrice: v.number(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zip: v.string(),
    images: v.record(v.string(), v.id("_storage")),
    videoStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    const orderId = await ctx.db.insert("orders", {
      ...args,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    });
    return orderId;
  },
});

export const getOrder = query({
  args: {
    orderId: v.id("orders"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.orderId);
  },
});

export const updateOrderStatus = mutation({
  args: {
    orderId: v.id("orders"),
    status: v.union(
      v.literal("draft"),
      v.literal("pending"),
      v.literal("processing"),
      v.literal("completed"),
      v.literal("cancelled")
    ),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.orderId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

export const getOrdersByEmail = query({
  args: {
    email: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .collect();
  },
});

export const updateOrderWithFiles = mutation({
  args: {
    orderId: v.id("orders"),
    images: v.record(v.string(), v.id("_storage")),
    videoStorageId: v.optional(v.id("_storage")),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    address: v.string(),
    city: v.string(),
    state: v.string(),
    zip: v.string(),
  },
  handler: async (ctx, args) => {
    const { orderId, images, videoStorageId, ...customerInfo } = args;
    await ctx.db.patch(orderId, {
      images: images as any,
      videoStorageId: videoStorageId as any,
      ...customerInfo,
      updatedAt: Date.now(),
    });
  },
});
