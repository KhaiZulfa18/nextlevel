import { IconChevronLeft } from "@tabler/icons-react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface Props {
    isOpen: boolean | undefined;
    setIsOpen?: () => void;
}
export default function SidebarToggle({isOpen, setIsOpen}: Props) {

    return (
        <div className="invisible md:visible absolute top-[12px] -right-[16px] z-20">
            <Button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-md w-8 h-8"
                variant="outline"
                size="icon"
            >
                <IconChevronLeft
                className={clsx(
                    "h-4 w-4 transition-transform ease-in-out duration-500",
                    isOpen === false ? "rotate-180" : "rotate-0"
                )}
                />
            </Button>
        </div>
    )
}