import { ArrowRight, Calendar, MapPin, Settings2 } from "lucide-react";
import { Button } from "../../../componentes/button";

interface DestinationAndDateStepProps {
    isGuestsImputOpen: boolean
    closeGuestsImput: () => void
    openGuestsImput: () => void
}

export function DestinationAndDateStep({
    isGuestsImputOpen,
    closeGuestsImput,
    openGuestsImput,
}: DestinationAndDateStepProps) {
    return (
        <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
                <MapPin className="size-5 text-zinc-400" />
                <input disabled={isGuestsImputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none" />
            </div>

            <div className="flex items-center gap-2">
                <Calendar className="size-5 text-zinc-400" />
                <input disabled={isGuestsImputOpen} type="text" placeholder="quando?" className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none" />
            </div>

            <div className="w-px h-6 bg-zinc-800" />

            {isGuestsImputOpen ? (
                <Button onClick={closeGuestsImput} variant="secondary">
                    Alterar Local/Data
                    <Settings2 className="size-5" />
                </Button>
            ) : (
                <Button onClick={openGuestsImput} variant="primary">
                    Continuar
                    <ArrowRight className="size-5 text-lime-950" />
                </Button>
            )}
        </div>
    )
}