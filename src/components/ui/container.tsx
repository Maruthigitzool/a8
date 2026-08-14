import type { ReactNode } from "react";

import { cn } from "@/app/lib/cn";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className = "" }: ContainerProps) {
  return <div className={cn("page-container", className)}>{children}</div>;
}
