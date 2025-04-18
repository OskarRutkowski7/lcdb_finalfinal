import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

// Mock data for Sinners
const sinners = [
  { id: 1, name: "Yi Sang", rarity: 3, sin: "Wrath", image: "/placeholder.svg?height=120&width=120" },
  { id: 2, name: "Faust", rarity: 3, sin: "Lust", image: "/placeholder.svg?height=120&width=120" },
  { id: 3, name: "Don Quixote", rarity: 3, sin: "Pride", image: "/placeholder.svg?height=120&width=120" },
  { id: 4, name: "Ryōshū", rarity: 3, sin: "Sloth", image: "/placeholder.svg?height=120&width=120" },
  { id: 5, name: "Meursault", rarity: 3, sin: "Gluttony", image: "/placeholder.svg?height=120&width=120" },
  { id: 6, name: "Hong Lu", rarity: 3, sin: "Wrath", image: "/placeholder.svg?height=120&width=120" },
  { id: 7, name: "Heathcliff", rarity: 3, sin: "Envy", image: "/placeholder.svg?height=120&width=120" },
  { id: 8, name: "Ishmael", rarity: 3, sin: "Gluttony", image: "/placeholder.svg?height=120&width=120" },
  { id: 9, name: "Rodion", rarity: 3, sin: "Greed", image: "/placeholder.svg?height=120&width=120" },
  { id: 10, name: "Sinclair", rarity: 3, sin: "Pride", image: "/placeholder.svg?height=120&width=120" },
  { id: 11, name: "Outis", rarity: 3, sin: "Sloth", image: "/placeholder.svg?height=120&width=120" },
  { id: 12, name: "Gregor", rarity: 3, sin: "Envy", image: "/placeholder.svg?height=120&width=120" },
]

export default function IdentityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Identity Database</h1>
          <p className="text-muted-foreground">
            Browse and search for detailed information about all Sinners in Limbus Company
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="rarity">Rarity</TabsTrigger>
            <TabsTrigger value="sin">Sin</TabsTrigger>
            <TabsTrigger value="damage">Damage Type</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
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
                      <Image
                        src={sinner.image || "/placeholder.svg"}
                        alt={sinner.name}
                        width={120}
                        height={120}
                        className="rounded-full border-2 border-primary/20"
                      />
                    </div>
                    <CardContent className="p-3 text-center">
                      <h3 className="font-semibold truncate">{sinner.name}</h3>
                      <Badge variant="outline" className="mt-1">
                        {sinner.sin}
                      </Badge>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rarity" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Filter by Rarity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <Button variant="outline">★</Button>
                  <Button variant="outline">★★</Button>
                  <Button variant="outline">★★★</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sin" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Filter by Sin</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline">Wrath</Button>
                  <Button variant="outline">Lust</Button>
                  <Button variant="outline">Sloth</Button>
                  <Button variant="outline">Gluttony</Button>
                  <Button variant="outline">Greed</Button>
                  <Button variant="outline">Envy</Button>
                  <Button variant="outline">Pride</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="damage" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Filter by Damage Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <Button variant="outline">Slash</Button>
                  <Button variant="outline">Pierce</Button>
                  <Button variant="outline">Blunt</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

function Button({ children, variant = "default", className, ...props }: any) {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
  }

  const variantStyle = variant === "outline" ? variants.outline : variants.default

  return (
    <button className={`${baseStyles} ${variantStyle} ${className || ""}`} {...props}>
      {children}
    </button>
  )
}
