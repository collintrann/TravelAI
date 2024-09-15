import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

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

export const updateGroupLocation = mutation({
    args: {
        name: v.string(),
        location: v.string(),
    },

    handler: async (ctx, args) => {
        const group = (await ctx.db.query("groups").filter((g) => g.eq(g.field("name"), args.name)).collect()).pop();
        if (!group) {
        throw new Error("Group not found");
        }
        await ctx.db.patch(group._id, { location: args.location });
    },
});

export const updateGroupLink = mutation({
    args: {
        name: v.string(),
        link: v.string(),
    },
    
    handler: async (ctx, args) => {
        const group = (await ctx.db.query("groups").filter((g) => g.eq(g.field("name"), args.name)).collect()).pop();
        if (!group) {
        throw new Error("Group not found");
        }
        let links = group.links;
        links.push(args.link);
        await ctx.db.patch(group._id, { links: links});
    },
});
    
export const getGroup = query({
    args: {
        name: v.string(),
    },

    handler: async (ctx, args) => {
        const group = (await ctx.db.query("groups").filter((g) => g.eq(g.field("name"), args.name)).collect()).pop();
        if (!group) {
        throw new Error("Group not found");
        }
        return group;
    },
});