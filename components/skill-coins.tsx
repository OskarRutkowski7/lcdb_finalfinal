import { cn } from "@/lib/utils"

interface SkillCoinsProps {
  count: number
  className?: string
}

export function SkillCoins({ count, className }: SkillCoinsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="w-6 h-6 rounded-full bg-yellow-500/90 border border-yellow-600 flex items-center justify-center text-black font-bold shadow-inner"
        >
          <span className="text-xs">C</span>
        </div>
      ))}
    </div>
  )
}
