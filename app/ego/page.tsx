import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"

// Mock data for EGO abilities
const egos = [
  {
    id: 1,
    name: "Don't Fear The Reaper",
    rarity: 2,
    sin: "Wrath",
    damage: "Slash",
    character: "Yi Sang",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    name: "Pale Rider",
    rarity: 3,
    sin: "Wrath",
    damage: "Slash",
    character: "Yi Sang",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    name: "The Crimson Scar",
    rarity: 3,
    sin: "Lust",
    damage: "Pierce",
    character: "Faust",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 4,
    name: "Windmill",
    rarity: 2,
    sin: "Pride",
    damage: "Slash",
    character: "Don Quixote",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 5,
    name: "La Sangre",
    rarity: 3,
    sin: "Pride",
    damage: "Blunt",
    character: "Don Quixote",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 6,
    name: "Bamboo Cutter",
    rarity: 2,
    sin: "Sloth",
    damage: "Slash",
    character: "Ryōshū",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 7,
    name: "Moonlight",
    rarity: 3,
    sin: "Sloth",
    damage: "Pierce",
    character: "Ryōshū",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 8,
    name: "Sunshower",
    rarity: 2,
    sin: "Gluttony",
    damage: "Blunt",
    character: "Meursault",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 9,
    name: "Stranger",
    rarity: 3,
    sin: "Gluttony",
    damage: "Blunt",
    character: "Meursault",
    image: "/placeholder.svg?height=120&width=120",
  },
]

export default function EgoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">E.G.O. Database</h1>
          <p className="text-muted-foreground">
            Browse and search for detailed information about all E.G.O. abilities in Limbus Company
          </p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search E.G.O. by name, character, or sin..." className="pl-10" />
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="rarity">Rarity</TabsTrigger>
            <TabsTrigger value="sin">Sin</TabsTrigger>
            <TabsTrigger value="damage">Damage Type</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {egos.map((ego) => (
                <Link href={`/ego/${ego.id}`} key={ego.id}>
                  <Card className="overflow-hidden hover:border-primary/50 transition-all">
                    <div className="relative bg-primary/10 p-4 flex justify-center">
                      <div className="absolute top-2 right-2">
                        <div className="flex">
                          {Array.from({ length: ego.rarity }).map((_, i) => (
                            <span key={i} className="text-yellow-500">
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <Image
                        src={ego.image || "/placeholder.svg"}
                        alt={ego.name}
                        width={120}
                        height={120}
                        className="rounded-lg border-2 border-primary/20"
                      />
                    </div>
                    <CardContent className="p-3 text-center">
                      <h3 className="font-semibold truncate">{ego.name}</h3>
                      <div className="flex justify-center gap-1 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-xs">
                          {ego.sin}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {ego.damage}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{ego.character}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rarity" className="mt-6">
            <Card>
              <CardContent className="p-6">
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
              <CardContent className="p-6">
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
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
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
