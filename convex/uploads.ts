import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const generateUploadUrlMultiple = mutation({
  args: {
    count: v.number(),
  },
  handler: async (ctx, args) => {
    const urls = [];
    for (let i = 0; i < args.count; i++) {
      urls.push(await ctx.storage.generateUploadUrl());
    }
    return urls;
  },
});

export const storeFileReference = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    // This just returns the storage ID for reference
    return args.storageId;
  },
});
