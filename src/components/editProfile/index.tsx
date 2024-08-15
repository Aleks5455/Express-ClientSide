import { useContext, useState } from "react"
import type { User } from "../../app/types"
import { ThemeContext } from "../theme-provider"
import { useUpdateUserMutation } from "../../app/services/userApi"
import { useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import { Input } from "../input"
import { MdOutlineEmail } from "react-icons/md"

type Props = {
  isOpen: boolean
  onClose: () => {}
  user?: User
}

export const EditProfile: React.FC<Props> = ({ isOpen, onClose, user }) => {
  const { theme } = useContext(ThemeContext)
  const [updateUser, { isLoading }] = useUpdateUserMutation()
  const [error, setError] = useState("")
  const [selectedAvatar, setSelectedAvatar] = useState<File | null>(null)
  const { id } = useParams<{ id: string }>()

  const { handleSubmit, control } = useForm<User>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: user?.email,
      name: user?.name,
      dateOfBirth: user?.dateOfBirth,
      bio: user?.bio,
      location: user?.location,
    },
  })

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className={`${theme} text-foreground`}
    >
      <ModalContent>
        {onClose => (
          <>
            {" "}
            <ModalHeader className="flex flex-col gap-1">
              Profile Change
            </ModalHeader>
            <ModalBody>
              <form className="flex flex-col gap-4">
                <Input
                control={control}
                name="email"
                label="Email"
                type="email"
                endContent={<MdOutlineEmail/>}
                />
              </form>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
