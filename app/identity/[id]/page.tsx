import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Shield, Zap, Swords } from "lucide-react"

// Mock data for a single Sinner
const getSinner = (id: string) => {
  return {
    id: Number.parseInt(id),
    name: "Yi Sang",
    title: "The Plagiarist",
    rarity: 3,
    sin: "Wrath",
    image: "/placeholder.svg?height=300&width=300",
    description:
      "A writer who plagiarized others' works. He was caught and sentenced to death, but was saved by the Head Manager and brought to the Limbus Company.",
    stats: {
      hp: 85,
      stagger: 70,
      slash: 90,
      pierce: 60,
      blunt: 40,
      defense: {
        slash: "Normal",
        pierce: "Endure",
        blunt: "Fatal",
      },
      speed: 3,
    },
    skills: [
      {
        name: "Borrowed Blade",
        description: "Deal Slash damage to a single target. If the target is staggered, deal additional damage.",
        coinCount: 3,
        type: "Slash",
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Plagiarized Strike",
        description: "Deal Slash damage to all enemies. Gain 1 Counter on hit.",
        coinCount: 4,
        type: "Slash",
        image: "/placeholder.svg?height=50&width=50",
      },
      {
        name: "Stolen Technique",
        description: "Deal Pierce damage to a single target and apply Bleed status for 2 turns.",
        coinCount: 2,
        type: "Pierce",
        image: "/placeholder.svg?height=50&width=50",
      },
    ],
    egos: [
      {
        name: "Don't Fear The Reaper",
        description: "Increase Slash damage by 30% for 3 turns. Gain immunity to Stagger for 2 turns.",
        rarity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        name: "Pale Rider",
        description:
          "Deal massive Slash damage to all enemies. Has a 30% chance to instantly kill targets below 25% HP.",
        rarity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  }
}

export default function SinnerPage({ params }: { params: { id: string } }) {
  const sinner = getSinner(params.id)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/identity" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Identity Database
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Image
                  src={sinner.image || "/placeholder.svg"}
                  alt={sinner.name}
                  width={300}
                  height={300}
                  className="rounded-lg border-2 border-primary/20"
                />
                <div className="absolute top-2 right-2 bg-background/80 rounded-md px-2 py-1">
                  <div className="flex">
                    {Array.from({ length: sinner.rarity }).map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold">{sinner.name}</h1>
              <p className="text-muted-foreground">{sinner.title}</p>

              <Badge className="mt-2" variant="outline">
                {sinner.sin}
              </Badge>

              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center">
                  <Heart className="h-5 w-5 mr-2 text-red-500" />
                  <span className="font-semibold mr-2">HP:</span>
                  <Progress value={sinner.stats.hp} className="flex-1" />
                  <span className="ml-2">{sinner.stats.hp}</span>
                </div>

                <div className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-500" />
                  <span className="font-semibold mr-2">Stagger:</span>
                  <Progress value={sinner.stats.stagger} className="flex-1" />
                  <span className="ml-2">{sinner.stats.stagger}</span>
                </div>

                <div className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  <span className="font-semibold mr-2">Speed:</span>
                  <span>{sinner.stats.speed}</span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="text-center p-2 bg-primary/10 rounded-md">
                    <div className="font-semibold">Slash</div>
                    <div
                      className={`mt-1 ${sinner.stats.defense.slash === "Fatal" ? "text-red-500" : sinner.stats.defense.slash === "Endure" ? "text-green-500" : ""}`}
                    >
                      {sinner.stats.defense.slash}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-primary/10 rounded-md">
                    <div className="font-semibold">Pierce</div>
                    <div
                      className={`mt-1 ${sinner.stats.defense.pierce === "Fatal" ? "text-red-500" : sinner.stats.defense.pierce === "Endure" ? "text-green-500" : ""}`}
                    >
                      {sinner.stats.defense.pierce}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-primary/10 rounded-md">
                    <div className="font-semibold">Blunt</div>
                    <div
                      className={`mt-1 ${sinner.stats.defense.blunt === "Fatal" ? "text-red-500" : sinner.stats.defense.blunt === "Endure" ? "text-green-500" : ""}`}
                    >
                      {sinner.stats.defense.blunt}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <Tabs defaultValue="overview">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="egos">E.G.O.</TabsTrigger>
                <TabsTrigger value="builds">Builds</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Background</h2>
                  <p>{sinner.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Combat Stats</h2>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="flex flex-col items-center p-3 bg-primary/10 rounded-md">
                      <Swords className="h-6 w-6 mb-1" />
                      <span className="font-semibold">Slash</span>
                      <Progress value={sinner.stats.slash} className="w-full mt-1" />
                      <span>{sinner.stats.slash}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-primary/10 rounded-md">
                      <Swords className="h-6 w-6 mb-1" />
                      <span className="font-semibold">Pierce</span>
                      <Progress value={sinner.stats.pierce} className="w-full mt-1" />
                      <span>{sinner.stats.pierce}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-primary/10 rounded-md">
                      <Swords className="h-6 w-6 mb-1" />
                      <span className="font-semibold">Blunt</span>
                      <Progress value={sinner.stats.blunt} className="w-full mt-1" />
                      <span>{sinner.stats.blunt}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Recommended Teams</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Slash Team</CardTitle>
                        <CardDescription>High damage output</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex space-x-2">
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Yi Sang"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Don Quixote"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Hong Lu"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="p-4">
                        <CardTitle className="text-base">Mixed Team</CardTitle>
                        <CardDescription>Balanced approach</CardDescription>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex space-x-2">
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Yi Sang"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Faust"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Gregor"
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="skills" className="space-y-4">
                {sinner.skills.map((skill, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Image
                          src={skill.image || "/placeholder.svg"}
                          alt={skill.name}
                          width={50}
                          height={50}
                          className="rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{skill.name}</h3>
                            <Badge variant="outline">{skill.type}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{skill.description}</p>
                          <div className="mt-2">
                            <span className="text-sm">Coin Count: {skill.coinCount}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="egos" className="space-y-4">
                {sinner.egos.map((ego, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start">
                        <Image
                          src={ego.image || "/placeholder.svg"}
                          alt={ego.name}
                          width={80}
                          height={80}
                          className="rounded-md mr-4"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-semibold">{ego.name}</h3>
                            <div className="flex">
                              {Array.from({ length: ego.rarity }).map((_, i) => (
                                <span key={i} className="text-yellow-500">
                                  ★
                                </span>
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{ego.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <Link href={`/ego?character=${sinner.id}`}>
                  <Button variant="outline" className="w-full">
                    View All Compatible E.G.O.
                  </Button>
                </Link>
              </TabsContent>

              <TabsContent value="builds" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Popular Builds</CardTitle>
                    <CardDescription>Recommended builds from the community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold">Slash Specialist</h3>
                        <p className="text-sm text-muted-foreground">Focus on maximizing Slash damage output</p>
                        <div className="mt-2 flex space-x-2">
                          <Badge>Slash +20%</Badge>
                          <Badge>Speed +1</Badge>
                          <Badge>Counter on Hit</Badge>
                        </div>
                      </div>

                      <div className="p-4 border rounded-md">
                        <h3 className="font-semibold">Survivability Build</h3>
                        <p className="text-sm text-muted-foreground">Balanced approach with focus on staying alive</p>
                        <div className="mt-2 flex space-x-2">
                          <Badge>HP +15%</Badge>
                          <Badge>Stagger Resist</Badge>
                          <Badge>Healing +10%</Badge>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Link href="/team-builder">
                        <Button className="w-full">Create Your Own Build</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
