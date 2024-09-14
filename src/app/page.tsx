import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/layout/navbar";

export default function Home() {

    return (
        <div className="flex min-h-screen w-full flex-col">
            <Navbar/>
        </div>
    );
}
