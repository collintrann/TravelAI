import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const addGroup = mutation({
    args: {
      name: v.string(),
      location: v.string(),
      links: v.array(v.string()),
    },
  
    handler: async (ctx, args) => {
      const id = await ctx.db.insert("groups", args);
      return id;
    },
  });

  export const updateGroup = mutation({
    args: {
      name: v.string(),
      location: v.string(),
    },
  
    handler: async (ctx, args) => {
      const group = (await ctx.db.query("groups").filter((g) => g.eq(g.field("name"), args.name)).collect()).pop();
      if (!group) {
        throw new Error("Group not found");
      }
      const id = await ctx.db.patch(group._id, { location: args.location });
      return id;
    },
  });