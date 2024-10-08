import React from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { IconCoffee } from '@tabler/icons-react'

export default function Footer () {
    return (
        <footer className="z-10 bottom-0 bg-background dark:bg-background py-3 mt-auto">
            <Separator className="mb-2" />
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="mb-4 md:mb-0">
                        <h3 className="text-base sm:text-lg font-mono">NextLevel</h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-500 font-mono">
                            Simple starter template, built with NextJs, TailwindCSS, Shadcn UI, and Prisma.
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <Button variant="outline" className="gap-2" size={'sm'}>
                            <IconCoffee size={16} />
                            Support me!
                        </Button>
                    </div>
                </div>
                <Separator className="my-4" />
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <p className="text-sm text-gray-600 dark:text-gray-500">
                        &copy; 2024 NextLevel. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-500">
                        Built with ❤️ by Khai Zulfa.
                    </p>
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Twitter</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">GitHub</a>
                        <a href="#" className="text-sm text-gray-600 hover:text-gray-900">LinkedIn</a>
                    </div>
                </div>
            </div>
        </footer>

    )
}