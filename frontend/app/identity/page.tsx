import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { sinnersData } from "@/lib/identity-data"

export default function IdentityPage() {
  const sinners = Object.values(sinnersData)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Identity Database</h1>
          <p className="text-muted-foreground">
            Browse detailed information about all Sinners in Limbus Company
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {sinners.map((sinner) => (
            <Link href={`/identity/${sinner.id}`} key={sinner.id}>
              <Card className="overflow-hidden hover:border-primary/50 transition-all">
                <div className="relative bg-primary/10 p-4 flex justify-center">
                  <div className="absolute top-2 right-2">
                    <div className="flex">
                      {Array.from({ length: sinner.rarity }).map((_, i) => (
                        <span key={i} className="text-yellow-500">
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="relative w-[120px] h-[120px]">
                    <Image
                      src={sinner.image}
                      alt={sinner.name}
                      fill
                      className="rounded-full border-2 border-primary/20 object-cover"
                      sizes="120px"
                      priority={parseInt(sinner.id) <= 6}
                    />
                  </div>
                </div>
                <CardContent className="p-3 text-center">
                  <h3 className="font-semibold truncate">{sinner.name}</h3>
                  <div className="flex gap-1 justify-center mt-1">
                    <Badge variant="outline">{sinner.sin}</Badge>
                    <Badge variant="outline">{sinner.skills[0].damage}</Badge>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
