import { cn } from "@/lib/utils";
import React, { ComponentPropsWithoutRef, FC } from "react";
import { DashboardCard } from "./DashboardCard";
import { useDashboardStore } from "@/store/DashboardStore";
import { SectionType } from "@/types/taskType";

interface DashboardProps extends ComponentPropsWithoutRef<"div"> {}

export const Dashboard: FC<DashboardProps> = ({ className, ...props }) => {
  const cards = useDashboardStore((state) => state.sections) as SectionType[];
  return (
    <div
      className={cn(
        "flex-1 p-2 bg-secondary flex flex-col items-center justify-center relative",
        className
      )}
      {...props}
    >
      <div className="flex gap-2 flex-1 w-full max-h-[80vh]">
        {cards.map((card) => (
          <DashboardCard key={card.id} {...card} />
        ))}
      </div>
    </div>
  );
};
