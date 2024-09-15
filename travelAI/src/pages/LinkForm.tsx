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
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const formSchema = z.object({
    link1: z.string(),
    link2: z.string(),
    link3: z.string(),
    link4: z.string(),
    link5: z.string(),
  })

export function LinkForm() {
    const  navigate = useNavigate(); 
    const { groupName } = useParams();
    const updateGroupLink = useMutation(api.groups.updateGroupLink);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            link1: "",
            link2: "",
            link3: "",
            link4: "",
            link5: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (groupName === undefined) {
            throw new Error("Group name not found");
        }
        await updateGroupLink({name: groupName, link: values.link1});
        await updateGroupLink({name: groupName, link: values.link2});
        await updateGroupLink({name: groupName, link: values.link3});
        await updateGroupLink({name: groupName, link: values.link4});
        await updateGroupLink({name: groupName, link: values.link5});
        navigate('/dashboard/' + groupName);
    }
 
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
                control={form.control}
                name="link1"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>enter tiktok links</FormLabel>
                        <Input placeholder="ex: https://www.tiktok.com/t/ZP8eHEmVc/" {...field} />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="link2"
                render={({ field }) => (
                    <FormItem>
                        <Input placeholder="ex: https://www.tiktok.com/t/ZP8eHEmVc/" {...field} />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="link3"
                render={({ field }) => (
                    <FormItem>
                        <Input placeholder="ex: https://www.tiktok.com/t/ZP8eHEmVc/" {...field} />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="link4"
                render={({ field }) => (
                    <FormItem>
                        <Input placeholder="ex: https://www.tiktok.com/t/ZP8eHEmVc/" {...field} />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="link5"
                render={({ field }) => (
                    <FormItem>
                        <Input placeholder="ex: https://www.tiktok.com/t/ZP8eHEmVc/" {...field} />
                    </FormItem>
                )}
            />
            <br/>
            <Button type="submit">next</Button>
          </form>
        </Form>
    )
}