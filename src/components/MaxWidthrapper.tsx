import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

function MaxWidthrapper({
  className,
  children,
}: {
  className?: String;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-screen px-2.5 md:px-20 ",
        className
      )}
    >
      {children}
    </div>
  );
}

export default MaxWidthrapper;
