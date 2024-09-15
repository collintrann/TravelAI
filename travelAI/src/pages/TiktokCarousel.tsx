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
    <Carousel className="w-full max-w-xs">
        <CarouselContent>
        {group !== undefined && group.links.map((link) => (
            <CarouselItem key={link}>
            <div className="p-1">
                <TikTok url={link}></TikTok>
            </div>
            </CarouselItem>
        ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
    </Carousel>
  )
}
