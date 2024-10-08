import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { IconBrandGithub, IconRocket } from "@tabler/icons-react";
import Footer from "@/components/layout/footer";
import { Separator } from "@/components/ui/separator";

export default function Home() {

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar/>
            <div className="h-full w-full flex items-center flex-col justify-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_70%_50%_at_50%_00%,#000_70%,transparent_110%)]">
                </div>
                <div className="z-10 text-center py-16 md:py-24 px-8">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-mono font-extrabold tracking-tight mb-6">
                        NextLevel
                    </h1>
                    <p className="text-md md:text-2xl mb-8 max-w-3xl mx-auto font-mono">
                        a starter template for Next.js, builded with TailwindCSS, Shadcn UI, Lucia Auth, and Prisma.
                    </p>
                    <div className="flex gap-3 justify-center">
                        <Button variant="default" className="gap-2" asChild>
                            <Link href="https://github.com/KhaiZulfa18/nextlevel" prefetch={false}>
                                <IconBrandGithub size={16} />
                                Go to Github
                            </Link>
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <IconRocket size={16} />
                            Get Started
                        </Button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
