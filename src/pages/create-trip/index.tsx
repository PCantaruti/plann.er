import { ArrowRight, UserRoundPlus,} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { InviteGuestsModal } from './invite-guests-modal'
import { ConfirmTripModal } from './confirm-trip-modal'
import { DestinationAndDateStep } from './steps/destination-and-date-step'
import { InviteGuestsStep } from './steps/invite-guests-step'
import { DateRange } from 'react-day-picker'
import { api } from '../../lib/axios'

export function CreateTripPage() {
    const [isGuestsImputOpen, setIsGuestsImputOpen] = useState(false)
    const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)
    const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false)
    
    const [destination, setDestination] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [ownerEmail, setOwnerEmail] = useState('')
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
    
    const [emailsToInvite, setEmailsToInvite] = useState([
        'pamela@hotmail.com',
        'jhon@hotmail.com',
    ])

    const navigate = useNavigate()

    function openGuestsImput() {
        setIsGuestsImputOpen(true)
    }

    function closeGuestsImput() {
        setIsGuestsImputOpen(false)
    }

    function openGuestsModal() {
        setIsGuestsModalOpen(true)
    }

    function closeGuestsModal() {
        setIsGuestsModalOpen(false)
    }

    function openConfirmTripModal() {
        setIsConfirmTripModalOpen(true)
    }

    function closeConfirmTripModal() {
        setIsConfirmTripModalOpen(false)
    }


    function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        const email = data.get('email')?.toString()

        if (!email) {
            return
        }

        if (emailsToInvite.includes(email)) {
            return
        }

        setEmailsToInvite([
            ...emailsToInvite,
            email
        ])

        event.currentTarget.reset()
    }

    function resetEmailFromInvites(emailToRemove: string) {
        const newEmailList = emailsToInvite.filter(email => email !== emailToRemove)

        setEmailsToInvite(newEmailList)
    }

    async function createTrip(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        console.log(destination)
        console.log(ownerEmail)
        console.log(ownerName)
        console.log(eventStartAndEndDates)
        console.log(emailsToInvite)

        if (!destination){
            return
        }

        if (!eventStartAndEndDates?.from || !eventStartAndEndDates.to){
            return
        }
        
        if (emailsToInvite.length ===0){
            return
        }

        if (!ownerName || !ownerEmail){
            return
        }

        const response = await api.post('/trips', {
            destination,
            starts_at: eventStartAndEndDates.from,
            ends_at: eventStartAndEndDates.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail
        })

        const {tripId } = response.data

       navigate(`/trips/${tripId}`)
    }

    return (
        <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
            <div className="max-w-3xl w-full px-6 text-center space-y-10">
                <div className="flex flex-col items-center">
                    <img src="/logo.svg" alt="Logo Plann.er" />
                </div>
                <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua primeira viagem!</p>

                <div className="space-y-4">
                    <DestinationAndDateStep 
                    closeGuestsImput={closeGuestsImput}
                    isGuestsImputOpen={isGuestsImputOpen}   
                    openGuestsImput={openGuestsImput}
                    setDestination={setDestination}
                    eventStartAndEndDates={eventStartAndEndDates}
                    setEventStartAndEndDates={setEventStartAndEndDates}
                    />

                    {isGuestsImputOpen && (
                        <InviteGuestsStep
                        emailsToInvite={emailsToInvite}
                        openConfirmTripModal={openConfirmTripModal}
                        openGuestsModal={openGuestsModal}
                        />
                    )}
                </div>

                <p className="text-sm text-zinc-500">Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
                    com nossos <a className="text-zinc-300 underline" href="#">termos de uso</a> e <a className="text-zinc-300 underline" href="#">políticas de privacidade.</a></p>
            </div>

            {isGuestsModalOpen && (
                <InviteGuestsModal 
                emailsToInvite={emailsToInvite}
                addNewEmailToInvite={addNewEmailToInvite}
                closeGuestsModal={closeGuestsModal}
                resetEmailFromInvites={resetEmailFromInvites}
                />
        
            )}

            {isConfirmTripModalOpen && (
               <ConfirmTripModal 
               closeConfirmTripModal={closeConfirmTripModal}
               createTrip={createTrip}
               setOwnerName={setOwnerName}
               setOwnerEmail={setOwnerEmail}
               />
            )}
            
        </div>
    )
}


