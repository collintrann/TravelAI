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
import { api } from "../../convex/_generated/api";

const formSchema = z.object({
    link: z.string()
  })

interface props {
    groupName: string;
}

export function LinkFormModal(props : props) {

    const updateGroupLink = useMutation(api.groups.updateGroupLink);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (props.groupName === undefined) {
            throw new Error("Group name not found");
        }
        await updateGroupLink({name: props.groupName, link: values.link});
        form.reset();
    }
 
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>enter tiktok link</FormLabel>
                        <Input placeholder="ex: https://www.tiktok.com/t/ZP8eHEmVc/" {...field} />
                    </FormItem>
                )}
            />
            <Button type="submit">add</Button>
          </form>
        </Form>
    )
}