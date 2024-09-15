import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "react-router-dom";
import { LinkFormModal } from "./LinkFormModal";
import { TiktokCarousel } from "./TiktokCarousel";
import { useEffect, useState } from "react";

export function Dashboard() {
    const [plan, setPlan] = useState("");
    const { groupName } = useParams();

    if (groupName === undefined) {
        throw new Error("Group name not found");
    }

    const group = useQuery(api.groups.getGroup, {name: groupName});

    useEffect(() => {
        if (group !== undefined) {
            fetch('http://localhost:5000/initialize', {
                'method':'POST',
                headers : {
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({destination: group.location, urls: group.links})
            })
            .then(response => response.json())
            .then(data => setPlan(data)); 
        }
    }, []);

    return (
        <>
            <div>
                <h1>{groupName}</h1>
                <br/>
                <h2>{group && "travel plan for "}<b>{group?.location}</b></h2>
            </div>
            <div className="row">
                <div className="plan">
                    <br></br>
                    <p>{plan}</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline">add inspo</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogTitle>add inspo</DialogTitle>
                        <DialogDescription>
                            copy & paste tiktok links here,
                            paste one link at a time
                        </DialogDescription>
                        <LinkFormModal groupName={groupName}></LinkFormModal>
                </DialogContent>
                </Dialog>
                <TiktokCarousel></TiktokCarousel>
            </div>
        </>
    )
} 