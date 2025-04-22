import { Sinner } from "@/types"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface SinnerCardProps {
  sinner: Sinner
  onRemove?: () => void
}

export function SinnerCard({ sinner, onRemove }: SinnerCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold">{sinner.name}</h3>
            <p className="text-sm text-muted-foreground">{sinner.sin}</p>
          </div>
          {onRemove && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onRemove}
              className="h-8 w-8"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
} 