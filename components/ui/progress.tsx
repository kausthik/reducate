"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

interface ProgressProps
  extends React.ComponentProps<typeof ProgressPrimitive.Root> {
  showLabel?: boolean
  indicatorClassName?: string
}

function Progress({
  className,
  value,
  showLabel = false,
  indicatorClassName,
  ...props
}: ProgressProps) {
  return (
    <div className="flex w-full items-center gap-2">
      <ProgressPrimitive.Root
        data-slot="progress"
        className={cn(
          "relative flex h-2 w-full items-center overflow-hidden rounded-full bg-muted",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className={cn(
            "relative size-full flex-1 rounded-full bg-primary transition-transform duration-700 ease-out",
            indicatorClassName
          )}
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        >
          <span className="absolute inset-0 animate-pulse bg-white/20" />
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>

      {showLabel && (
        <span className="min-w-[2.5rem] text-right text-xs font-medium text-muted-foreground tabular-nums">
          {Math.round(value || 0)}%
        </span>
      )}
    </div>
  )
}

export { Progress }
