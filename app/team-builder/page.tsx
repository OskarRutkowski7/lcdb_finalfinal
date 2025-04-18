"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/components/auth-provider"
import Image from "next/image"
import Link from "next/link"
import { Save, Share2, Trash2, Info, X, LogIn } from "lucide-react"

// Mock data for Sinners
const sinners = [
  { id: 1, name: "Yi Sang", rarity: 3, sin: "Wrath", damage: "Slash", image: "/placeholder.svg?height=80&width=80" },
  { id: 2, name: "Faust", rarity: 3, sin: "Lust", damage: "Pierce", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 3,
    name: "Don Quixote",
    rarity: 3,
    sin: "Pride",
    damage: "Slash",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 4, name: "Ryōshū", rarity: 3, sin: "Sloth", damage: "Slash", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 5,
    name: "Meursault",
    rarity: 3,
    sin: "Gluttony",
    damage: "Blunt",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 6, name: "Hong Lu", rarity: 3, sin: "Wrath", damage: "Slash", image: "/placeholder.svg?height=80&width=80" },
  { id: 7, name: "Heathcliff", rarity: 3, sin: "Envy", damage: "Blunt", image: "/placeholder.svg?height=80&width=80" },
  {
    id: 8,
    name: "Ishmael",
    rarity: 3,
    sin: "Gluttony",
    damage: "Pierce",
    image: "/placeholder.svg?height=80&width=80",
  },
  { id: 9, name: "Rodion", rarity: 3, sin: "Greed", damage: "Pierce", image: "/placeholder.svg?height=80&width=80" },
  { id: 10, name: "Sinclair", rarity: 3, sin: "Pride", damage: "Blunt", image: "/placeholder.svg?height=80&width=80" },
  { id: 11, name: "Outis", rarity: 3, sin: "Sloth", damage: "Pierce", image: "/placeholder.svg?height=80&width=80" },
  { id: 12, name: "Gregor", rarity: 3, sin: "Envy", damage: "Blunt", image: "/placeholder.svg?height=80&width=80" },
]

// Mock data for EGO abilities
const egos = [
  {
    id: 1,
    name: "Don't Fear The Reaper",
    rarity: 2,
    sin: "Wrath",
    damage: "Slash",
    character: "Yi Sang",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    name: "Pale Rider",
    rarity: 3,
    sin: "Wrath",
    damage: "Slash",
    character: "Yi Sang",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    name: "The Crimson Scar",
    rarity: 3,
    sin: "Lust",
    damage: "Pierce",
    character: "Faust",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    name: "Windmill",
    rarity: 2,
    sin: "Pride",
    damage: "Slash",
    character: "Don Quixote",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 5,
    name: "La Sangre",
    rarity: 3,
    sin: "Pride",
    damage: "Blunt",
    character: "Don Quixote",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 6,
    name: "Bamboo Cutter",
    rarity: 2,
    sin: "Sloth",
    damage: "Slash",
    character: "Ryōshū",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 7,
    name: "Moonlight",
    rarity: 3,
    sin: "Sloth",
    damage: "Pierce",
    character: "Ryōshū",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 8,
    name: "Sunshower",
    rarity: 2,
    sin: "Gluttony",
    damage: "Blunt",
    character: "Meursault",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 9,
    name: "Stranger",
    rarity: 3,
    sin: "Gluttony",
    damage: "Blunt",
    character: "Meursault",
    image: "/placeholder.svg?height=80&width=80",
  },
]

// Mock saved teams
const savedTeams = [
  {
    id: 1,
    name: "Slash Team",
    description: "High damage output team focused on Slash damage",
    characters: [1, 3, 6],
    egos: [1, 4, 5],
  },
  {
    id: 2,
    name: "Balanced Team",
    description: "Well-rounded team with mixed damage types",
    characters: [2, 7, 11],
    egos: [3, 7, 9],
  },
]

export default function TeamBuilderPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [selectedCharacters, setSelectedCharacters] = useState<number[]>([])
  const [selectedEgos, setSelectedEgos] = useState<number[]>([])
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [savedTeamsList, setSavedTeamsList] = useState(savedTeams)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("characters")

  // Filter characters based on search term
  const filteredCharacters = sinners.filter(
    (character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.sin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.damage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filter EGOs based on search term
  const filteredEgos = egos.filter(
    (ego) =>
      ego.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ego.character.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ego.sin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ego.damage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Handle character selection
  const toggleCharacterSelection = (characterId: number) => {
    if (selectedCharacters.includes(characterId)) {
      setSelectedCharacters(selectedCharacters.filter((id) => id !== characterId))
    } else {
      if (selectedCharacters.length < 3) {
        setSelectedCharacters([...selectedCharacters, characterId])
      } else {
        toast({
          title: "Team Limit Reached",
          description: "You can only select up to 3 characters for your team.",
          variant: "destructive",
        })
      }
    }
  }

  // Handle EGO selection
  const toggleEgoSelection = (egoId: number) => {
    if (selectedEgos.includes(egoId)) {
      setSelectedEgos(selectedEgos.filter((id) => id !== egoId))
    } else {
      if (selectedEgos.length < 3) {
        setSelectedEgos([...selectedEgos, egoId])
      } else {
        toast({
          title: "E.G.O. Limit Reached",
          description: "You can only select up to 3 E.G.O. abilities for your team.",
          variant: "destructive",
        })
      }
    }
  }

  // Save team
  const saveTeam = () => {
    if (!user) {
      setShowLoginPrompt(true)
      return
    }

    if (selectedCharacters.length === 0) {
      toast({
        title: "No Characters Selected",
        description: "Please select at least one character for your team.",
        variant: "destructive",
      })
      return
    }

    if (!teamName.trim()) {
      toast({
        title: "Team Name Required",
        description: "Please provide a name for your team.",
        variant: "destructive",
      })
      return
    }

    const newTeam = {
      id: savedTeamsList.length + 1,
      name: teamName,
      description: teamDescription,
      characters: selectedCharacters,
      egos: selectedEgos,
    }

    setSavedTeamsList([...savedTeamsList, newTeam])

    toast({
      title: "Team Saved",
      description: `Your team "${teamName}" has been saved successfully.`,
    })

    // Reset form
    setTeamName("")
    setTeamDescription("")
  }

  // Share team
  const shareTeam = () => {
    if (selectedCharacters.length === 0) {
      toast({
        title: "No Characters Selected",
        description: "Please select at least one character for your team.",
        variant: "destructive",
      })
      return
    }

    // In a real app, this would generate a shareable link
    const shareableLink = `https://limbuscompany.wiki/team-builder/shared?c=${selectedCharacters.join(",")}&e=${selectedEgos.join(",")}`

    // Copy to clipboard
    navigator.clipboard.writeText(shareableLink).then(() => {
      toast({
        title: "Link Copied",
        description: "Shareable link has been copied to your clipboard.",
      })
    })
  }

  // Load a saved team
  const loadTeam = (team: (typeof savedTeams)[0]) => {
    setSelectedCharacters(team.characters)
    setSelectedEgos(team.egos)
    setTeamName(team.name)
    setTeamDescription(team.description)

    toast({
      title: "Team Loaded",
      description: `Team "${team.name}" has been loaded.`,
    })
  }

  // Delete a saved team
  const deleteTeam = (teamId: number) => {
    setSavedTeamsList(savedTeamsList.filter((team) => team.id !== teamId))

    toast({
      title: "Team Deleted",
      description: "The team has been deleted successfully.",
    })
  }

  // Reset current team
  const resetTeam = () => {
    setSelectedCharacters([])
    setSelectedEgos([])
    setTeamName("")
    setTeamDescription("")

    toast({
      title: "Team Reset",
      description: "Your current team has been reset.",
    })
  }

  // Get character by ID
  const getCharacterById = (id: number) => {
    return sinners.find((character) => character.id === id)
  }

  // Get EGO by ID
  const getEgoById = (id: number) => {
    return egos.find((ego) => ego.id === id)
  }

  // Calculate team stats
  const calculateTeamStats = () => {
    let slashCount = 0
    let pierceCount = 0
    let bluntCount = 0

    selectedCharacters.forEach((id) => {
      const character = getCharacterById(id)
      if (character) {
        if (character.damage === "Slash") slashCount++
        if (character.damage === "Pierce") pierceCount++
        if (character.damage === "Blunt") bluntCount++
      }
    })

    selectedEgos.forEach((id) => {
      const ego = getEgoById(id)
      if (ego) {
        if (ego.damage === "Slash") slashCount++
        if (ego.damage === "Pierce") pierceCount++
        if (ego.damage === "Blunt") bluntCount++
      }
    })

    return {
      slash: slashCount,
      pierce: pierceCount,
      blunt: bluntCount,
      total: selectedCharacters.length + selectedEgos.length,
      balance:
        (Math.max(slashCount, pierceCount, bluntCount) / (selectedCharacters.length + selectedEgos.length || 1)) * 100,
    }
  }

  const teamStats = calculateTeamStats()

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team Builder</h1>
          <p className="text-muted-foreground">Create, save, and share your optimal Limbus Company team compositions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Build Your Team</CardTitle>
                <CardDescription>Select up to 3 characters and 3 E.G.O. abilities for your team</CardDescription>
                <div className="relative mt-2">
                  <Input
                    placeholder={`Search ${activeTab === "characters" ? "characters" : "E.G.O. abilities"}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full"
                  />
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="characters" onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="characters">Characters</TabsTrigger>
                    <TabsTrigger value="egos">E.G.O. Abilities</TabsTrigger>
                  </TabsList>

                  <TabsContent value="characters" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {filteredCharacters.map((character) => (
                        <div
                          key={character.id}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            selectedCharacters.includes(character.id)
                              ? "border-primary"
                              : "border-transparent hover:border-primary/50"
                          }`}
                          onClick={() => toggleCharacterSelection(character.id)}
                        >
                          <div className="bg-primary/10 p-3 flex flex-col items-center">
                            <Image
                              src={character.image || "/placeholder.svg"}
                              alt={character.name}
                              width={80}
                              height={80}
                              className="rounded-full"
                            />
                            <h3 className="font-semibold mt-2 text-center">{character.name}</h3>
                            <div className="flex space-x-1 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {character.sin}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {character.damage}
                              </Badge>
                            </div>
                          </div>

                          {selectedCharacters.includes(character.id) && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="egos" className="mt-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {filteredEgos.map((ego) => (
                        <div
                          key={ego.id}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            selectedEgos.includes(ego.id)
                              ? "border-primary"
                              : "border-transparent hover:border-primary/50"
                          }`}
                          onClick={() => toggleEgoSelection(ego.id)}
                        >
                          <div className="bg-primary/10 p-3 flex flex-col items-center">
                            <Image
                              src={ego.image || "/placeholder.svg"}
                              alt={ego.name}
                              width={80}
                              height={80}
                              className="rounded-lg"
                            />
                            <h3 className="font-semibold mt-2 text-center text-sm">{ego.name}</h3>
                            <p className="text-xs text-muted-foreground">{ego.character}</p>
                            <div className="flex space-x-1 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {ego.sin}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {ego.damage}
                              </Badge>
                            </div>
                          </div>

                          {selectedEgos.includes(ego.id) && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Saved Teams</CardTitle>
                <CardDescription>
                  {user ? "Your saved team compositions" : "Log in to save your team compositions"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {!user ? (
                  <div className="text-center p-6">
                    <Link href="/login">
                      <Button>
                        <LogIn className="mr-2 h-4 w-4" />
                        Log In to Save Teams
                      </Button>
                    </Link>
                  </div>
                ) : savedTeamsList.length === 0 ? (
                  <div className="text-center p-6 text-muted-foreground">
                    <p>You haven't saved any teams yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedTeamsList.map((team) => (
                      <Card key={team.id}>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold">{team.name}</h3>
                              <p className="text-sm text-muted-foreground">{team.description}</p>
                            </div>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => loadTeam(team)}>
                                Load
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => deleteTeam(team.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="flex flex-wrap gap-2">
                              {team.characters.map((characterId) => {
                                const character = getCharacterById(characterId)
                                return character ? (
                                  <div
                                    key={characterId}
                                    className="flex items-center bg-primary/10 rounded-full p-1 pl-1 pr-2"
                                  >
                                    <Image
                                      src={character.image || "/placeholder.svg"}
                                      alt={character.name}
                                      width={24}
                                      height={24}
                                      className="rounded-full mr-1"
                                    />
                                    <span className="text-xs">{character.name}</span>
                                  </div>
                                ) : null
                              })}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Current Team</CardTitle>
                <CardDescription>Your selected characters and E.G.O. abilities</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold mb-2">Characters ({selectedCharacters.length}/3)</h3>
                    {selectedCharacters.length === 0 ? (
                      <div className="text-center p-4 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No characters selected</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedCharacters.map((characterId) => {
                          const character = getCharacterById(characterId)
                          return character ? (
                            <div
                              key={characterId}
                              className="flex items-center justify-between bg-primary/10 p-2 rounded-lg"
                            >
                              <div className="flex items-center">
                                <Image
                                  src={character.image || "/placeholder.svg"}
                                  alt={character.name}
                                  width={40}
                                  height={40}
                                  className="rounded-full mr-2"
                                />
                                <div>
                                  <h4 className="font-semibold">{character.name}</h4>
                                  <div className="flex space-x-1">
                                    <Badge variant="outline" className="text-xs">
                                      {character.sin}
                                    </Badge>
                                    <Badge variant="outline" className="text-xs">
                                      {character.damage}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleCharacterSelection(characterId)
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">E.G.O. Abilities ({selectedEgos.length}/3)</h3>
                    {selectedEgos.length === 0 ? (
                      <div className="text-center p-4 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No E.G.O. abilities selected</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedEgos.map((egoId) => {
                          const ego = getEgoById(egoId)
                          return ego ? (
                            <div key={egoId} className="flex items-center justify-between bg-primary/10 p-2 rounded-lg">
                              <div className="flex items-center">
                                <Image
                                  src={ego.image || "/placeholder.svg"}
                                  alt={ego.name}
                                  width={40}
                                  height={40}
                                  className="rounded-lg mr-2"
                                />
                                <div>
                                  <h4 className="font-semibold text-sm">{ego.name}</h4>
                                  <p className="text-xs text-muted-foreground">{ego.character}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleEgoSelection(egoId)
                                }}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : null
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Team Stats</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span>Slash Damage:</span>
                        <Badge variant="outline">{teamStats.slash}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Pierce Damage:</span>
                        <Badge variant="outline">{teamStats.pierce}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Blunt Damage:</span>
                        <Badge variant="outline">{teamStats.blunt}</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Damage Balance:</span>
                        <Badge
                          variant={
                            teamStats.balance > 70 ? "destructive" : teamStats.balance > 50 ? "outline" : "secondary"
                          }
                        >
                          {teamStats.balance.toFixed(0)}%
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <h3 className="font-semibold mb-2">Team Details</h3>
                    <div className="space-y-2">
                      <div>
                        <Label htmlFor="team-name">Team Name</Label>
                        <Input
                          id="team-name"
                          placeholder="Enter team name"
                          value={teamName}
                          onChange={(e) => setTeamName(e.target.value)}
                        />
                      </div>
                      <div>
                        <Label htmlFor="team-description">Description</Label>
                        <Textarea
                          id="team-description"
                          placeholder="Enter team description"
                          value={teamDescription}
                          onChange={(e) => setTeamDescription(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-2">
                <div className="flex space-x-2 w-full">
                  <Button className="flex-1" onClick={saveTeam}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Team
                  </Button>
                  <Button variant="outline" className="flex-1" onClick={shareTeam}>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
                </div>
                <Button variant="ghost" onClick={resetTeam}>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Reset Team
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Team Building Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">
                      Balance your damage types (Slash, Pierce, Blunt) to handle different enemy resistances.
                    </p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">Consider character synergies based on Sin types for optimal performance.</p>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">
                      Match E.G.O. abilities with characters that have high proficiency in that damage type.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Login Prompt Dialog */}
      <Dialog open={showLoginPrompt} onOpenChange={setShowLoginPrompt}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Required</DialogTitle>
            <DialogDescription>You need to be logged in to save your team compositions.</DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setShowLoginPrompt(false)}>
              Cancel
            </Button>
            <Link href="/login">
              <Button>Log In</Button>
            </Link>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function Check(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
