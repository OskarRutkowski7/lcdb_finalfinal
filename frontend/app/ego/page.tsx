"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { useState } from "react"

// Mock data for EGO abilities
const egos = [
  {
    id: 1,
    name: "Don't Fear The Reaper",
    sin: "Wrath",
    damage: "Slash",
    character: "Yi Sang",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 2,
    name: "Pale Rider",
    sin: "Wrath",
    damage: "Slash",
    character: "Yi Sang",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 3,
    name: "The Crimson Scar",
    sin: "Lust",
    damage: "Pierce",
    character: "Faust",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 4,
    name: "Windmill",
    sin: "Pride",
    damage: "Slash",
    character: "Don Quixote",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 5,
    name: "La Sangre",
    sin: "Pride",
    damage: "Blunt",
    character: "Don Quixote",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 6,
    name: "Bamboo Cutter",
    sin: "Sloth",
    damage: "Slash",
    character: "Ryōshū",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 7,
    name: "Moonlight",
    sin: "Sloth",
    damage: "Pierce",
    character: "Ryōshū",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 8,
    name: "Sunshower",
    sin: "Gluttony",
    damage: "Blunt",
    character: "Meursault",
    image: "/placeholder.svg?height=120&width=120",
  },
  {
    id: 9,
    name: "Stranger",
    sin: "Gluttony",
    damage: "Blunt",
    character: "Meursault",
    image: "/placeholder.svg?height=120&width=120",
  },
]

export default function EgoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState("all")
  const [selectedSin, setSelectedSin] = useState("")
  const [selectedDamage, setSelectedDamage] = useState("")

  const filteredEgos = egos.filter((ego) => {
    const matchesSearch = 
      ego.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ego.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ego.sin.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesSin = !selectedSin || ego.sin === selectedSin
    const matchesDamage = !selectedDamage || ego.damage === selectedDamage

    return matchesSearch && matchesSin && matchesDamage
  })

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
          <Input 
            placeholder="Search E.G.O. by name, character, or sin..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Tabs defaultValue="all" className="w-full" onValueChange={setActiveFilter}>
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="sin">Sin</TabsTrigger>
            <TabsTrigger value="damage">Damage Type</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredEgos.map((ego) => (
                <Link href={`/ego/${ego.id}`} key={ego.id}>
                  <Card className="overflow-hidden hover:border-primary/50 transition-all">
                    <div className="relative bg-primary/10 p-4 flex justify-center">
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

          <TabsContent value="sin" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Wrath", "Lust", "Sloth", "Gluttony", "Greed", "Envy", "Pride"].map((sin) => (
                    <Button 
                      key={sin}
                      variant={selectedSin === sin ? "default" : "outline"}
                      onClick={() => setSelectedSin(selectedSin === sin ? "" : sin)}
                    >
                      {sin}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredEgos.map((ego) => (
                <Link href={`/ego/${ego.id}`} key={ego.id}>
                  <Card className="overflow-hidden hover:border-primary/50 transition-all">
                    <div className="relative bg-primary/10 p-4 flex justify-center">
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

          <TabsContent value="damage" className="mt-6">
            <Card>
              <CardContent className="p-6">
                <div className="grid grid-cols-3 gap-4">
                  {["Slash", "Pierce", "Blunt"].map((damage) => (
                    <Button 
                      key={damage}
                      variant={selectedDamage === damage ? "default" : "outline"}
                      onClick={() => setSelectedDamage(selectedDamage === damage ? "" : damage)}
                    >
                      {damage}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {filteredEgos.map((ego) => (
                <Link href={`/ego/${ego.id}`} key={ego.id}>
                  <Card className="overflow-hidden hover:border-primary/50 transition-all">
                    <div className="relative bg-primary/10 p-4 flex justify-center">
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
