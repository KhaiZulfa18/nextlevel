import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import Navbar from "@/components/guest/Navbar";

export default function Home() {

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar/>
        </div>
    );
}
