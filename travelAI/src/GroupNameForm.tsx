"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";

const formSchema = z.object({
    name: z.string().min(2, {
      message: "Group name must be at least 2 characters.",
    }),
  })

export function GroupNameForm() {
    const addGroup = useMutation(api.groups.addGroup);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
       addGroup({ name: values.name, links: []});
    }
 
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>enter group name</FormLabel>
                        <Input placeholder="group name" {...field} />
                    </FormItem>
                )}
            />
            <Button type="submit">next</Button>
          </form>
        </Form>
      )
}