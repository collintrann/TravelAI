import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addGroup = mutation({
    args: {
      name: v.string(),
      links: v.array(v.string()),
    },
  
    handler: async (ctx, args) => {
      const id = await ctx.db.insert("groups", args);
  
      return id;
    },
  });