import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useParams } from "react-router-dom";

import { TikTok } from 'react-tiktok';

export function TiktokCarousel() {
    const { groupName } = useParams();

    if (groupName === undefined) {
        throw new Error("Group name not found");
    }

    const group = useQuery(api.groups.getGroup, {name: groupName});

    return (
    <Carousel className="w-full max-w-xs carousel">
        <CarouselContent>
        {group !== undefined && group.links.map((link) => (
            <CarouselItem key={link}>
            <div className="tiktok_container">
                <div className="tiktok">
                    <TikTok url={link}></TikTok>
                </div>
            </div>
            </CarouselItem>
        ))}
        </CarouselContent>
        {group !== undefined && group.links.length != 0  && <CarouselPrevious />}
        {group !== undefined && group.links.length != 0  && <CarouselNext />}
    </Carousel>
  )
}
