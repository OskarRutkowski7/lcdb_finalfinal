import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Mock data for a single EGO
const getEgo = (id: string) => {
  return {
    id: Number.parseInt(id),
    name: "Pale Rider",
    rarity: 3,
    sin: "Wrath",
    damage: "Slash",
    character: "Yi Sang",
    image: "/placeholder.svg?height=300&width=300",
    description: "A manifestation of Yi Sang's inner turmoil. This E.G.O. grants immense power at the cost of sanity.",
    effect: "Deal massive Slash damage to all enemies. Has a 30% chance to instantly kill targets below 25% HP.",
    stats: {
      power: 85,
      speed: -1,
      sanity: -20,
    },
    resistances: {
      slash: "Endure",
      pierce: "Normal",
      blunt: "Fatal",
    },
    acquisition: "Complete Chapter 3 of the Main Story with Yi Sang in your party.",
    lore: "The Pale Rider represents death, one of the Four Horsemen of the Apocalypse. Yi Sang's connection to this figure stems from his constant struggle with mortality and the existential dread that plagued his writings.",
  }
}

export default async function EgoDetailPage({ params }: { params: { id: string } }) {
  const { id: idStr } = await Promise.resolve(params)
  const id = Number.parseInt(idStr)
  const ego = await getEgo(id.toString())

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/ego" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to E.G.O. Database
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <Image
                  src={ego.image || "/placeholder.svg"}
                  alt={ego.name}
                  width={300}
                  height={300}
                  className="rounded-lg border-2 border-primary/20"
                />
                <div className="absolute top-2 right-2 bg-background/80 rounded-md px-2 py-1">
                  <div className="flex">
                    {Array.from({ length: ego.rarity }).map((_, i) => (
                      <span key={i} className="text-yellow-500">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <h1 className="text-2xl font-bold">{ego.name}</h1>
              <Link href={`/identity/${ego.character.toLowerCase().replace(" ", "-")}`}>
                <p className="text-muted-foreground hover:text-foreground">{ego.character}</p>
              </Link>

              <div className="flex space-x-2 mt-2">
                <Badge variant="outline">{ego.sin}</Badge>
                <Badge variant="outline">{ego.damage}</Badge>
              </div>

              <div className="w-full mt-6 space-y-4">
                <div className="grid grid-cols-3 gap-2">
                  <div className="text-center p-2 bg-primary/10 rounded-md">
                    <div className="font-semibold">Power</div>
                    <div className="mt-1">{ego.stats.power}</div>
                  </div>
                  <div className="text-center p-2 bg-primary/10 rounded-md">
                    <div className="font-semibold">Speed</div>
                    <div
                      className={`mt-1 ${ego.stats.speed < 0 ? "text-red-500" : ego.stats.speed > 0 ? "text-green-500" : ""}`}
                    >
                      {ego.stats.speed > 0 ? `+${ego.stats.speed}` : ego.stats.speed}
                    </div>
                  </div>
                  <div className="text-center p-2 bg-primary/10 rounded-md">
                    <div className="font-semibold">Sanity</div>
                    <div
                      className={`mt-1 ${ego.stats.sanity < 0 ? "text-red-500" : ego.stats.sanity > 0 ? "text-green-500" : ""}`}
                    >
                      {ego.stats.sanity > 0 ? `+${ego.stats.sanity}` : ego.stats.sanity}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Resistances</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="text-center p-2 bg-primary/10 rounded-md">
                      <div className="font-semibold">Slash</div>
                      <div
                        className={`mt-1 ${ego.resistances.slash === "Fatal" ? "text-red-500" : ego.resistances.slash === "Endure" ? "text-green-500" : ""}`}
                      >
                        {ego.resistances.slash}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-primary/10 rounded-md">
                      <div className="font-semibold">Pierce</div>
                      <div
                        className={`mt-1 ${ego.resistances.pierce === "Fatal" ? "text-red-500" : ego.resistances.pierce === "Endure" ? "text-green-500" : ""}`}
                      >
                        {ego.resistances.pierce}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-primary/10 rounded-md">
                      <div className="font-semibold">Blunt</div>
                      <div
                        className={`mt-1 ${ego.resistances.blunt === "Fatal" ? "text-red-500" : ego.resistances.blunt === "Endure" ? "text-green-500" : ""}`}
                      >
                        {ego.resistances.blunt}
                      </div>
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
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="effect">Effect</TabsTrigger>
                <TabsTrigger value="lore">Lore</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent>
              <TabsContent value="overview" className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p>{ego.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Acquisition</h2>
                  <p>{ego.acquisition}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Compatible Characters</h2>
                  <div className="flex flex-wrap gap-2">
                    <Link href={`/identity/1`}>
                      <div className="flex items-center p-2 bg-primary/10 rounded-md hover:bg-primary/20">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Yi Sang"
                          width={40}
                          height={40}
                          className="rounded-full mr-2"
                        />
                        <span>Yi Sang</span>
                      </div>
                    </Link>
                    <Link href={`/identity/7`}>
                      <div className="flex items-center p-2 bg-primary/10 rounded-md hover:bg-primary/20">
                        <Image
                          src="/placeholder.svg?height=40&width=40"
                          alt="Heathcliff"
                          width={40}
                          height={40}
                          className="rounded-full mr-2"
                        />
                        <span>Heathcliff</span>
                      </div>
                    </Link>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-2">Recommended Usage</h2>
                  <Card>
                    <CardContent className="p-4">
                      <p className="mb-2">Best used in the following situations:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>Against multiple enemies with low HP</li>
                        <li>When facing enemies weak to Slash damage</li>
                        <li>During boss fights to execute low health targets</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="effect" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Effect Details</CardTitle>
                    <CardDescription>Complete breakdown of this E.G.O.'s effects and mechanics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold">Primary Effect</h3>
                        <p>{ego.effect}</p>
                      </div>

                      <div>
                        <h3 className="font-semibold">Damage Calculation</h3>
                        <p>Base damage: {ego.stats.power} × (1 + Slash Proficiency/100)</p>
                        <p>Execution threshold: 25% of target's max HP</p>
                        <p>Execution chance: 30%</p>
                      </div>

                      <div>
                        <h3 className="font-semibold">Status Effects</h3>
                        <div className="flex flex-wrap gap-2 mt-2">
                          <Badge>Speed {ego.stats.speed}</Badge>
                          <Badge>Sanity {ego.stats.sanity}</Badge>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold">Cooldown</h3>
                        <p>3 turns after use</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Combat Example</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p>When used against a group of 3 enemies:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>All enemies take Slash damage based on power rating</li>
                        <li>Any enemy below 25% HP has a 30% chance to be instantly defeated</li>
                        <li>User's speed is reduced by 1 for the duration of the battle</li>
                        <li>
                          User's sanity is reduced by 20, potentially triggering Panic status if threshold is reached
                        </li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="lore" className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Background</h2>
                  <p>{ego.lore}</p>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Symbolism</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      In the Book of Revelation, the Pale Rider represents Death, the fourth horseman of the apocalypse.
                      This E.G.O. manifests Yi Sang's fascination with mortality and the inevitable end that awaits all
                      living beings.
                    </p>
                    <p>
                      The instant death mechanic of this E.G.O. directly references this symbolism, allowing Yi Sang to
                      become an agent of death itself, particularly for those already close to their end (below 25% HP).
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Related Story Elements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Link href="/main-story/chapter-3">
                        <div className="p-2 bg-primary/10 rounded-md hover:bg-primary/20">
                          <h3 className="font-semibold">Chapter 3: The Pale Horseman</h3>
                          <p className="text-sm text-muted-foreground">
                            The chapter where this E.G.O. is first encountered
                          </p>
                        </div>
                      </Link>
                      <Link href="/abnormality-story/death">
                        <div className="p-2 bg-primary/10 rounded-md hover:bg-primary/20">
                          <h3 className="font-semibold">Abnormality: Death's Embrace</h3>
                          <p className="text-sm text-muted-foreground">Related abnormality story</p>
                        </div>
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
