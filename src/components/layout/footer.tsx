import React from 'react'
import { Button } from '../ui/button'
import { Separator } from '../ui/separator'
import { IconCoffee } from '@tabler/icons-react'

export default function Footer () {
    return (
        <footer className="z-10 bottom-0 bg-background dark:bg-background py-3 mt-auto">
            <Separator className="mb-2" />
            <div className="container mx-auto px-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
                    <p className="text-sm text-gray-600 dark:text-gray-500">
                        &copy; 2024 NextLevel. All rights reserved.
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-500">
                        Built in the half-space.
                    </p>
                </div>
            </div>
        </footer>

    )
}