import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, Shield, Zap, Swords, Flame } from "lucide-react"
import { getSinnerData, type SinnerData, type Skill } from "@/lib/identity-data"

export default async function SinnerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params
  const sinner = getSinnerData(resolvedParams.id)

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
                  src={sinner.image}
                  alt={sinner.name}
                  width={300}
                  height={300}
                  className="rounded-lg border-2 border-primary/20"
                />
                <div className="absolute top-2 right-2 bg-background/80 rounded-md px-2 py-1">
                  <div className="flex">
                    {Array.from({ length: sinner.rarity }).map((_, i) => (
                      <span key={i} className="text-yellow-500">★</span>
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
                    <div className="text-sm text-muted-foreground">Release: {sinner.releaseDate}</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="w-full bg-card/60 mb-4">
                <CardHeader className="p-3">
                  <CardTitle className="text-lg">Statuses</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  {sinner.statuses.map((status: string, index: number) => (
                    <div key={index} className="flex items-center">
                      <Flame className="h-5 w-5 text-red-500 mr-2" />
                      <span>{status}</span>
                    </div>
                  ))}
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
                      <span>{sinner.stats.def}</span>
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
                      <div>{sinner.stats.resistances.slash}</div>
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
                      <div>{sinner.stats.resistances.blunt}</div>
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
                {sinner.skills.map((skill: Skill, index: number) => (
                  <Card key={index} className="border-l-4 border-l-red-500">
                    <CardHeader className="p-4 bg-primary/5">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-semibold">{skill.name}</h3>
                          <Badge variant="outline">{skill.type}</Badge>
                          <Badge variant="outline">×{skill.uses}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="mb-4">{skill.description}</p>
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div className="text-center">
                          <div className="font-semibold text-yellow-500">Normal</div>
                          <div>{skill.coinPower.normal}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-blue-500">Clash</div>
                          <div>{skill.coinPower.clash}</div>
                        </div>
                        <div className="text-center">
                          <div className="font-semibold text-red-500">Counter</div>
                          <div>{skill.coinPower.counter}</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        {skill.effects.map((effect: string, i: number) => (
                          <div key={i} className="flex items-center gap-2">
                            <span className="text-sm">{i + 1}.</span>
                            <span>{effect}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="passives">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {sinner.passives.map((passive: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="outline">{index + 1}</Badge>
                          <span>{passive}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="sanity">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {sinner.sanitySkills.map((skill: string, index: number) => (
                        <div key={index} className="flex items-center gap-2">
                          <Badge variant="outline">{index + 1}</Badge>
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="egos">
                <div className="space-y-4">
                  {sinner.egos.map((ego, index: number) => (
                    <Card key={index}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div>
                            <CardTitle>{ego.name}</CardTitle>
                            <Badge variant="outline" className="mt-2">{ego.category}</Badge>
                            <Badge variant="outline" className="ml-2">{ego.damage}</Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p>{ego.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
