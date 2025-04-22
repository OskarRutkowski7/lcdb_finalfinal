"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { Search } from "lucide-react"
import { getAllEgos } from "@/lib/ego-data"
import { useState } from "react"

// Constants for filter options
const SINS = ["Wrath", "Lust", "Pride", "Sloth", "Gluttony", "Greed", "Envy"] as const
const DAMAGE_TYPES = ["Slash", "Pierce", "Blunt"] as const

type FilterType = "All" | "Sin" | "Damage Type"

export default function EgoPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("All")
  const [selectedSin, setSelectedSin] = useState<string>("")
  const [selectedDamage, setSelectedDamage] = useState<string>("")
  const egos = getAllEgos()

  const filteredEgos = egos.filter(ego => {
    // Search query filter
    const matchesSearch = ego.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ego.sinner.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ego.sin.toLowerCase().includes(searchQuery.toLowerCase())

    // Additional filters based on selected filter type
    if (selectedFilter === "Sin" && selectedSin) {
      return matchesSearch && ego.sin === selectedSin
    }
    if (selectedFilter === "Damage Type" && selectedDamage) {
      return matchesSearch && ego.damage === selectedDamage
    }
    
    return matchesSearch
  })

  const handleFilterClick = (type: FilterType) => {
    if (selectedFilter === type) {
      // Reset the filter if clicking the same one
      setSelectedFilter("All")
      setSelectedSin("")
      setSelectedDamage("")
    } else {
      setSelectedFilter(type)
      // Reset the other filter's selection
      if (type === "Sin") setSelectedDamage("")
      if (type === "Damage Type") setSelectedSin("")
    }
  }

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
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search E.G.O. by name, character, or sin..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              variant={selectedFilter === "All" ? "default" : "outline"}
              onClick={() => handleFilterClick("All")}
            >
              All
            </Button>
            <Button
              variant={selectedFilter === "Sin" ? "default" : "outline"}
              onClick={() => handleFilterClick("Sin")}
            >
              Sin
            </Button>
            <Button
              variant={selectedFilter === "Damage Type" ? "default" : "outline"}
              onClick={() => handleFilterClick("Damage Type")}
            >
              Damage Type
            </Button>
          </div>

          {selectedFilter === "Sin" && (
            <div className="flex flex-wrap gap-2">
              {SINS.map((sin) => (
                <Button
                  key={sin}
                  variant={selectedSin === sin ? "default" : "outline"}
                  onClick={() => setSelectedSin(selectedSin === sin ? "" : sin)}
                  size="sm"
                >
                  {sin}
                </Button>
              ))}
            </div>
          )}

          {selectedFilter === "Damage Type" && (
            <div className="flex flex-wrap gap-2">
              {DAMAGE_TYPES.map((damageType) => (
                <Button
                  key={damageType}
                  variant={selectedDamage === damageType ? "default" : "outline"}
                  onClick={() => setSelectedDamage(selectedDamage === damageType ? "" : damageType)}
                  size="sm"
                >
                  {damageType}
                </Button>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredEgos.map((ego) => (
            <Link href={`/ego/${ego.id}`} key={ego.id}>
              <Card className="overflow-hidden hover:border-primary/50 transition-all">
                <div className="relative bg-primary/10 aspect-square">
                  <Image
                    src={ego.image}
                    alt={ego.name}
                    fill
                    className="object-cover p-2"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    priority={parseInt(ego.id) <= 5}
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate mb-2">{ego.name}</h3>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="bg-primary/5">{ego.category}</Badge>
                    <Badge variant="outline">{ego.sin}</Badge>
                    <Badge variant="outline">{ego.damage}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 truncate">{ego.sinner}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
