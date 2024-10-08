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
    location: z.string()
  })

export function LocationForm() {
    const  navigate = useNavigate(); 
    const { groupName } = useParams();
    const updateGroupLocation = useMutation(api.groups.updateGroupLocation);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            location: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (groupName === undefined) {
            throw new Error("Group name not found");
        }
        await updateGroupLocation({name: groupName, location: values.location});
        navigate('/links/' + groupName);
    }
 
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>enter destination</FormLabel>
                        <Input placeholder="ex: hawaii" {...field} />
                    </FormItem>
                )}
            />
            <Button type="submit">next</Button>
          </form>
        </Form>
    )
}