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
                  src="/identity.png"
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
                  src="/ego.png"
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
                  src="/teambuilder.jpg"
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
      </div>
    </div>
  )
}
