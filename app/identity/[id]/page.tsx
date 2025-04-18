import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Shield, Zap, Swords, Flame } from "lucide-react"
import { getSinnerByIdMerged } from "@/lib/identity-data-merge"
import { SkillCoins } from "@/components/skill-coins"

export default function SinnerPage({ params }: { params: { id: string } }) {
  const id = Number.parseInt(params.id)
  const sinner = getSinnerByIdMerged(id)

  if (!sinner) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">Identity not found</h1>
        <p className="mt-4">The requested identity could not be found.</p>
        <Link href="/identity" className="mt-6 inline-block">
          <Button>Return to Identity Database</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/identity" className="inline-flex items-center mb-6 text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Identity Database
      </Link>

      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">
          [{sinner.title}] {sinner.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column - Character Info */}
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

              <Badge className="mt-2 mb-4" variant="outline">
                {sinner.sin}
              </Badge>

              <Card className="w-full bg-card/60 mb-4">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Info</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="text-center">
                    <div className="bg-primary/10 py-2 rounded-md mb-2">
                      <span className="font-semibold">Standard Fare</span>
                    </div>
                    <div className="text-sm text-muted-foreground">Release: 19.02.2025</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full bg-card/60 mb-4">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Statuses</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="flex items-center">
                    <Flame className="h-5 w-5 text-red-500 mr-2" />
                    <span>Burn</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full bg-card/60 mb-4">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Stats</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="flex flex-col items-center">
                      <Heart className="h-5 w-5 text-red-500" />
                      <span className="text-sm font-semibold">HP</span>
                      <span>{sinner.stats.hp}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-semibold">Speed</span>
                      <span>{sinner.stats.speed}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <Shield className="h-5 w-5 text-blue-500" />
                      <span className="text-sm font-semibold">DEF</span>
                      <span>{sinner.stats.defense}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full bg-card/60">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Resistances</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <div className="flex justify-center mb-1">
                        <Swords className="h-5 w-5 text-red-500" />
                      </div>
                      <span className="text-sm font-semibold">Slash</span>
                      <div className="text-red-500 font-bold">{sinner.stats.resistances.slash}</div>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-md">
                      <div className="flex justify-center mb-1">
                        <Swords className="h-5 w-5 text-yellow-500" />
                      </div>
                      <span className="text-sm font-semibold">Pierce</span>
                      <div>{sinner.stats.resistances.pierce}</div>
                    </div>
                    <div className="bg-primary/10 p-2 rounded-md">
                      <div className="flex justify-center mb-1">
                        <Swords className="h-5 w-5 text-blue-500" />
                      </div>
                      <span className="text-sm font-semibold">Blunt</span>
                      <div className="text-green-500">{sinner.stats.resistances.blunt}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Stagger Threshold</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-red-500">Slash:</span>
                        <span>{sinner.stats.staggerThreshold.slash}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-yellow-500">Pierce:</span>
                        <span>{sinner.stats.staggerThreshold.pierce}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-500">Blunt:</span>
                        <span>{sinner.stats.staggerThreshold.blunt}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Skills and Details */}
        <Card className="lg:col-span-3">
          <Tabs defaultValue="skills">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="passives">Passives</TabsTrigger>
                <TabsTrigger value="sanity">Sanity</TabsTrigger>
                <TabsTrigger value="egos">E.G.O.</TabsTrigger>
              </TabsList>
            </CardHeader>

            <CardContent className="p-6">
              <TabsContent value="skills" className="space-y-6">
                {sinner.skills.map((skill, index) => (
                  <Card key={index} className={`border-l-4 ${index === 3 ? "border-l-blue-500" : "border-l-red-500"}`}>
                    <CardHeader className="p-4 bg-primary/5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center">
                          <div className="bg-primary/20 p-2 rounded-md mr-3">
                            <Image
                              src={skill.image || "/placeholder.svg"}
                              alt={skill.name}
                              width={40}
                              height={40}
                              className="rounded-md"
                            />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{skill.name}</CardTitle>
                            {skill.type && (
                              <Badge variant="outline" className="mt-1">
                                {skill.type}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {skill.coinCount && <SkillCoins count={skill.coinCount} />}
                          {skill.multiplier && <div className="text-xl font-bold">{skill.multiplier}</div>}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="mb-4">{skill.description}</p>

                      {skill.coinPower && (
                        <div className="mb-4">
                          <div className="flex flex-col space-y-2">
                            <div className="text-sm font-semibold">Coin Power</div>
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-yellow-500/90 border border-yellow-600 flex items-center justify-center text-black font-bold shadow-inner">
                                  <span className="text-xs">N</span>
                                </div>
                                <span className="ml-2 font-medium">{skill.coinPower.normal}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-green-500/90 border border-green-600 flex items-center justify-center text-black font-bold shadow-inner">
                                  <span className="text-xs">S</span>
                                </div>
                                <span className="ml-2 font-medium">{skill.coinPower.success}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-red-500/90 border border-red-600 flex items-center justify-center text-black font-bold shadow-inner">
                                  <span className="text-xs">G</span>
                                </div>
                                <span className="ml-2 font-medium">{skill.coinPower.great}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {skill.effects && (
                        <div className="space-y-2">
                          {skill.effects.map((effect, i) => (
                            <div key={i} className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs mr-2 mt-0.5">
                                {i + 1}
                              </div>
                              <div className="flex-1">
                                <span
                                  className={effect.includes("Burn") ? "text-red-500" : ""}
                                  dangerouslySetInnerHTML={{
                                    __html: effect.replace(/Burn/g, '<span class="text-red-500">Burn</span>'),
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="passives" className="space-y-6">
                {sinner.passives.map((passive, index) => (
                  <Card key={index}>
                    <CardHeader className="p-4 bg-primary/5">
                      <CardTitle>{passive.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p>{passive.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="sanity" className="space-y-6">
                <Card>
                  <CardHeader className="p-4 bg-primary/5">
                    <CardTitle>{sinner.sanity.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <p className="mb-4">{sinner.sanity.description}</p>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Sanity Effects:</h3>
                        <div className="space-y-2">
                          {sinner.sanity.effects.map((effect, i) => (
                            <div key={i} className="flex items-start">
                              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs mr-2 mt-0.5">
                                {i + 1}
                              </div>
                              <div>{effect}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Sanity Meter</h3>
                        <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
                          <div className="bg-red-600 h-4 rounded-full" style={{ width: "100%" }}></div>
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>Critical</span>
                          <span>Low</span>
                          <span>Normal</span>
                          <span>High</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="egos" className="space-y-6">
                {sinner.egos.map((ego, index) => (
                  <Card key={index}>
                    <CardHeader className="p-4 bg-primary/5">
                      <div className="flex items-center">
                        <div className="bg-primary/20 p-2 rounded-md mr-3">
                          <Image
                            src={ego.image || "/placeholder.svg"}
                            alt={ego.name}
                            width={60}
                            height={60}
                            className="rounded-md"
                          />
                        </div>
                        <div>
                          <CardTitle>{ego.name}</CardTitle>
                          <div className="flex mt-1">
                            {Array.from({ length: ego.rarity }).map((_, i) => (
                              <span key={i} className="text-yellow-500">
                                ★
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p>{ego.description}</p>
                      <div className="mt-4">
                        <Link href={`/ego?character=${sinner.id}`}>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                <div className="text-center mt-4">
                  <Link href={`/ego?character=${sinner.id}`}>
                    <Button>View All Compatible E.G.O.</Button>
                  </Link>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
