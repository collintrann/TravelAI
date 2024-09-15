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
import { LinkForm } from "./LinkForm";
import { TiktokCarousel } from "./TiktokCarousel";

export function Dashboard() {
    const { groupName } = useParams();

    if (groupName === undefined) {
        throw new Error("Group name not found");
    }

    const group = useQuery(api.groups.getGroup, {name: groupName});

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
                    <p>{"plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"
                      + "plan plan plan plan plan plan plan plan \n"}</p>
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
                        <LinkForm groupName={groupName}></LinkForm>
                </DialogContent>
                </Dialog>
                <TiktokCarousel></TiktokCarousel>
            </div>
        </>
        // <>
        //     <p>{group?._id}</p>
        //     <p>{group?.name}</p>
        //     <p>{group?.location}</p>
        //     <p>{group?.links}</p>
        // </>
    )
} 