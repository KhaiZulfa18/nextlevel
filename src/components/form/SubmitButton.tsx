import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";
import { IconLoader2 } from "@tabler/icons-react";

export default function SubmitButton({text = 'Submit', className = '', ...props}: {text?: string, className?: string}) {
    const { pending } = useFormStatus();
  
    return (
        <Button type="submit" disabled={pending} className={className}>
            {pending && <IconLoader2 size={16} className="mr-2 animate-spin" />}
            {text}
        </Button>
    );
}