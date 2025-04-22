"use client"

import { useState, useEffect } from "react"
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
import { getSinners, getEgos, getEgosByCategory, getTeams, createTeam, updateTeam, deleteTeam, Sinner, EGO, Team } from "@/lib/api"
import { SinnerCard } from "@/components/sinner-card"

// EGO categories
const egoCategories = ["ZAYIN", "TETH", "HE", "WAW"]

// Mock data for Sinners
const sinners: Sinner[] = []

// Mock data for EGO abilities
const egos: EGO[] = []

// Mock saved teams
const savedTeams: Team[] = []

export default function TeamBuilderPage() {
  const { toast } = useToast()
  const { user, isAuthenticated } = useAuth()
  const [selectedCharacters, setSelectedCharacters] = useState<string[]>([])
  const [selectedEgos, setSelectedEgos] = useState<Array<{ egoId: string; sinnerId: string }>>([])
  const [teamName, setTeamName] = useState("")
  const [teamDescription, setTeamDescription] = useState("")
  const [savedTeamsList, setSavedTeamsList] = useState<Team[]>([])
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("characters")
  const [activeEgoCategory, setActiveEgoCategory] = useState("all")
  const [sinners, setSinners] = useState<Sinner[]>([])
  const [egos, setEgos] = useState<EGO[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Starting to fetch sinners and egos...');
        
        const sinnersPromise = getSinners();
        const egosPromise = getEgos();
        
        console.log('Promises created, awaiting results...');
        
        const [sinnersData, egosData] = await Promise.all([
          sinnersPromise,
          egosPromise,
        ])
        
        console.log('Sinners data:', sinnersData);
        console.log('Egos data:', egosData);
        
        if (!Array.isArray(sinnersData)) {
          throw new Error('Sinners data is not an array');
        }
        if (!Array.isArray(egosData)) {
          throw new Error('Egos data is not an array');
        }
        
        setSinners(sinnersData)
        setEgos(egosData)
        
        console.log('State updated with:', { 
          sinnersCount: sinnersData.length, 
          egosCount: egosData.length 
        });

        if (isAuthenticated) {
          const token = localStorage.getItem("token")
          if (!token) {
            throw new Error("No authentication token found")
          }

          console.log('Fetching teams with token:', token.substring(0, 10) + '...');
          
          const teamsResponse = await fetch("http://localhost:3001/api/teams", {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          })

          const teamsData = await teamsResponse.json()
          console.log('Teams response status:', teamsResponse.status);
          console.log('Teams response data:', teamsData);

          if (!teamsResponse.ok) {
            const errorMessage = teamsData.error 
              ? `${teamsData.error}${teamsData.details ? ': ' + teamsData.details : ''}`
              : "Failed to fetch teams";
            throw new Error(errorMessage);
          }

          setSavedTeamsList(teamsData)
        }
      } catch (error: any) {
        console.error("Error fetching data:", error)
        console.error("Error details:", {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        toast({
          title: "Error",
          description: error?.message || "Failed to load data",
          variant: "destructive"
        })
      }
    }
    fetchData()
  }, [isAuthenticated, toast])

  // Filter characters based on search term
  const filteredCharacters = sinners.filter(
    (character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.sin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.damage.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Filter EGOs based on search term and category
  const filteredEgos = egos.filter((ego) => {
    const matchesCategory = activeEgoCategory === "all" || ego.category === activeEgoCategory;
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = 
      ego.name.toLowerCase().includes(searchTermLower) ||
      ego.sin.toLowerCase().includes(searchTermLower) ||
      ego.damage.toLowerCase().includes(searchTermLower) ||
      (ego.character?.name || '').toLowerCase().includes(searchTermLower);
    
    return matchesCategory && matchesSearch;
  });

  // Handle character selection
  const toggleCharacterSelection = (characterId: string) => {
    if (selectedCharacters.includes(characterId)) {
      setSelectedCharacters(selectedCharacters.filter((id) => id !== characterId))
    } else {
      if (selectedCharacters.length < 6) {
        setSelectedCharacters([...selectedCharacters, characterId])
      } else {
        toast({
          title: "Team Full",
          description: "You can only select up to 6 characters",
          variant: "destructive"
        })
      }
    }
  }

  // Handle EGO selection
  const toggleEgoSelection = (egoId: string, sinnerId: string) => {
    if (selectedEgos.some(ego => ego.egoId === egoId)) {
      setSelectedEgos(selectedEgos.filter(ego => ego.egoId !== egoId))
    } else {
      if (selectedEgos.length < 6) {
        setSelectedEgos([...selectedEgos, { egoId, sinnerId }])
      } else {
        toast({
          title: "Team Full",
          description: "You can only select up to 6 E.G.O. abilities",
          variant: "destructive"
        })
      }
    }
  }

  // Save team
  const handleSaveTeam = async () => {
    if (!isAuthenticated) {
      setShowLoginPrompt(true)
      return
    }

    if (!teamName) {
      toast({
        title: "Error",
        description: "Team name is required",
        variant: "destructive",
      })
      return
    }

    if (selectedCharacters.length === 0) {
      toast({
        title: "Error",
        description: "Please select at least one character",
        variant: "destructive",
      })
      return
    }

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const teamData = {
        name: teamName,
        description: teamDescription,
        characters: selectedCharacters,
        egos: selectedEgos.map(ego => ({
          ego_id: String(ego.egoId),
          sinner_id: String(ego.sinnerId)
        }))
      }

      console.log('Saving team with data:', JSON.stringify(teamData, null, 2));

      const response = await fetch("http://localhost:3001/api/teams", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(teamData),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || responseData.details || "Failed to save team")
      }

      setSavedTeamsList([...savedTeamsList, responseData])
      toast({
        title: "Success",
        description: "Team saved successfully",
      })

      // Reset form
      setTeamName("")
      setTeamDescription("")
      setSelectedCharacters([])
      setSelectedEgos([])
    } catch (error: any) {
      console.error("Error saving team:", error)
      toast({
        title: "Error",
        description: error?.message || "Failed to save team",
        variant: "destructive",
      })
    }
  }

  // Load team
  const handleLoadTeam = (team: Team) => {
    setSelectedCharacters(team.characters.map((character) => character.id))
    setSelectedEgos(team.egos.map((ego) => ({ 
      egoId: ego.id,
      sinnerId: ego.characterId
    })))
    setTeamName(team.name)
    setTeamDescription(team.description)
  }

  // Delete team
  const handleDeleteTeam = async (teamId: number) => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found")
      }

      const response = await fetch(`http://localhost:3001/api/teams/${teamId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to delete team")
      }

      setSavedTeamsList(savedTeamsList.filter((team) => team.id !== teamId))
      toast({
        title: "Success",
        description: "Team deleted successfully",
      })
    } catch (error: any) {
      console.error("Error deleting team:", error)
      toast({
        title: "Error",
        description: error?.message || "Failed to delete team",
        variant: "destructive",
      })
    }
  }

  // Get character by ID
  const getCharacterById = (id: string) => {
    return sinners.find((character) => character.id === id)
  }

  // Get EGO by ID
  const getEgoById = (id: string) => {
    return egos.find((ego) => ego.id === id)
  }

  // Calculate team stats
  const calculateTeamStats = () => {
    const stats = {
      sins: new Set<string>(),
      damageTypes: new Set<string>(),
      averageRarity: 0
    }

    selectedCharacters.forEach(characterId => {
      const character = getCharacterById(characterId)
      if (character) {
        stats.sins.add(character.sin)
        stats.damageTypes.add(character.damage)
        stats.averageRarity += character.rarity
      }
    })

    return {
      sins: Array.from(stats.sins),
      damageTypes: Array.from(stats.damageTypes),
      averageRarity: stats.averageRarity / selectedCharacters.length || 0
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
                <CardDescription>Select up to 6 characters and E.G.O. abilities for your team</CardDescription>
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
                        <div key={character.id} className="relative">
                          <Card
                            className={`cursor-pointer transition-all ${
                              selectedCharacters.includes(character.id) ? "ring-2 ring-primary" : ""
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
                          </Card>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="egos" className="mt-4">
                    <div className="mb-4">
                      <div className="w-full grid grid-cols-5 gap-2">
                        <Button
                          variant={activeEgoCategory === "all" ? "default" : "outline"}
                          onClick={() => setActiveEgoCategory("all")}
                          className="w-full"
                        >
                          All
                        </Button>
                        {egoCategories.map((category) => (
                          <Button
                            key={category}
                            variant={activeEgoCategory === category ? "default" : "outline"}
                            onClick={() => setActiveEgoCategory(category)}
                            className="w-full"
                          >
                            {category}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {filteredEgos.map((ego) => (
                        <div key={ego.id} className="relative">
                          <Card
                            className={`cursor-pointer transition-all ${
                              selectedEgos.some(selectedEgo => selectedEgo.egoId === ego.id) ? "ring-2 ring-primary" : ""
                            }`}
                            onClick={() => toggleEgoSelection(ego.id, ego.characterId)}
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
                              <p className="text-xs text-muted-foreground">{ego.character?.name}</p>
                              <div className="flex flex-wrap justify-center gap-1 mt-1">
                                <Badge variant="outline" className="text-xs">
                                  {ego.category}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {ego.sin}
                                </Badge>
                                <Badge variant="outline" className="text-xs">
                                  {ego.damage}
                                </Badge>
                              </div>
                            </div>

                            {selectedEgos.some(selectedEgo => selectedEgo.egoId === ego.id) && (
                              <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                          </Card>
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
                  {isAuthenticated ? "Your saved team compositions" : "Log in to save your team compositions"}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {!isAuthenticated ? (
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
                              <Button variant="outline" size="sm" onClick={() => handleLoadTeam(team)}>
                                Load
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleDeleteTeam(team.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4">
                            <div className="grid grid-cols-3 gap-2">
                              {selectedCharacters.map((characterId) => {
                                const character = getCharacterById(characterId)
                                return character ? (
                                  <div key={character.id} className="text-center">
                                    <Image
                                      src={character.image}
                                      alt={character.name}
                                      width={40}
                                      height={40}
                                      className="mx-auto"
                                    />
                                    <p className="text-xs mt-1">{character.name}</p>
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
                    <h3 className="font-semibold mb-2">Characters ({selectedCharacters.length}/6)</h3>
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
                              key={character.id}
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
                                  toggleCharacterSelection(character.id)
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
                    <h3 className="font-semibold mb-2">E.G.O. Abilities</h3>
                    {selectedEgos.length === 0 ? (
                      <div className="text-center p-4 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">No E.G.O. abilities selected</p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {selectedEgos.map((selectedEgo) => {
                          const egoData = getEgoById(selectedEgo.egoId)
                          const sinnerData = getCharacterById(selectedEgo.sinnerId)
                          return egoData ? (
                            <div key={selectedEgo.egoId} className="flex items-center justify-between bg-primary/10 p-2 rounded-lg">
                              <div className="flex items-center">
                                <Image
                                  src={egoData.image}
                                  alt={egoData.name}
                                  width={40}
                                  height={40}
                                  className="rounded-lg mr-2"
                                />
                                <div>
                                  <p className="font-semibold">{egoData.name}</p>
                                  <p className="text-sm text-muted-foreground">{sinnerData?.name || 'Unknown'}</p>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  toggleEgoSelection(selectedEgo.egoId, selectedEgo.sinnerId)
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
                        <span>Average Rarity:</span>
                        <Badge variant="outline">{teamStats.averageRarity.toFixed(2)}</Badge>
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
                  <Button className="flex-1" onClick={handleSaveTeam} disabled={!isAuthenticated}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Team
                  </Button>
                </div>
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
                  <div className="flex items-start space-x-2">
                    <Info className="h-5 w-5 text-primary mt-0.5" />
                    <p className="text-sm">
                      Try to include a mix of E.G.O. categories (ZAYIN, TETH, HE, WAW) for versatility.
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
