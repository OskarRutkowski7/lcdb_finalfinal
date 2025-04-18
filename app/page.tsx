import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">Limbus Company Database / Wiki</h1>
          <p className="text-xl text-muted-foreground">Your comprehensive resource for all things Limbus Company</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
          <Card className="bg-card/60 border-primary/20 hover:border-primary/50 transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-40 w-40 rounded-full bg-primary/10 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Identity Icon"
                  width={160}
                  height={160}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold">Identity Database</h2>
              <p className="text-muted-foreground">
                Explore detailed information about all Sinners and their abilities
              </p>
              <Link href="/identity" className="w-full">
                <Button className="w-full">
                  View Identities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-primary/20 hover:border-primary/50 transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-40 w-40 rounded-full bg-primary/10 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="EGO Icon"
                  width={160}
                  height={160}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold">E.G.O. Database</h2>
              <p className="text-muted-foreground">Discover all E.G.O. abilities, effects, and mechanics</p>
              <Link href="/ego" className="w-full">
                <Button className="w-full">
                  View E.G.O. Abilities
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="bg-card/60 border-primary/20 hover:border-primary/50 transition-all">
            <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
              <div className="h-40 w-40 rounded-full bg-primary/10 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=160&width=160"
                  alt="Team Builder Icon"
                  width={160}
                  height={160}
                  className="rounded-full"
                />
              </div>
              <h2 className="text-2xl font-bold">Team Builder</h2>
              <p className="text-muted-foreground">
                Create, save, and share your optimal Limbus Company team compositions
              </p>
              <Link href="/team-builder" className="w-full">
                <Button className="w-full">
                  Build Your Team
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <Card className="border-primary/20">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-3 rounded-lg bg-card/60">
                <div className="bg-primary/20 p-2 rounded-md">
                  <span className="text-xs font-bold">NEW</span>
                </div>
                <div>
                  <h3 className="font-semibold">The Middle Little Brother SinClair Added</h3>
                  <p className="text-sm text-muted-foreground">2025-04-03</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-card/60">
                <div className="bg-primary/20 p-2 rounded-md">
                  <span className="text-xs font-bold">NEW</span>
                </div>
                <div>
                  <h3 className="font-semibold">Heishou Pack - Mao Branch Updated</h3>
                  <p className="text-sm text-muted-foreground">2025-03-20</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-lg bg-card/60">
                <div className="bg-primary/20 p-2 rounded-md">
                  <span className="text-xs font-bold">EVENT</span>
                </div>
                <div>
                  <h3 className="font-semibold">Mirror of the Dreaming Event</h3>
                  <p className="text-sm text-muted-foreground">Ongoing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
