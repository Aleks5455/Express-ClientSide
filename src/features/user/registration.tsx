import React, { useState } from "react"
import { Input } from "../../components/input"
import {
  useLazyCurrentQuery,
  useLoginMutation,
  useRegisterMutation,
} from "../../app/services/userApi"
import { useNavigate } from "react-router-dom"
import { Button, Link } from "@nextui-org/react"
import { useForm } from "react-hook-form"
import { errorCheck } from "../../utils/errorCheck"
import { ErrorMessage } from "../../components/error-message"

type Register = {
  email: string
  name: string
  password: string
}

type Props = {
  setSelected: (value: string) => void
}

export const Register: React.FC<Props> = ({ setSelected }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Register>({
    mode: "onChange",
    reValidateMode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  })

  const [register, { isLoading }] = useRegisterMutation()
  const [error, setError] = useState("")

  const onSubmit = async (data: Register) => {
    try {
      await register(data).unwrap
      setSelected("login")
    } catch (error) {
      if (errorCheck(error)) {
        setError(error.data.error)
      }
    }
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        control={control}
        name="name"
        label="Name"
        type="text"
        required="Required field"
      />
      <Input
        control={control}
        name="email"
        label="Email"
        type="email"
        required="Required field"
      />
      <Input
        control={control}
        name="password"
        label="Password"
        type="password"
        required="Required field"
      />

      <ErrorMessage error={error} />

      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
          Sign In
        </Button>
      </div>

      <p className="text-center text-small">
        Alredy have an account?{" "}
        <Link
          size="sm"
          className="cursor-pointer"
          onPress={() => setSelected("sign-up")}
        >
          Login
        </Link>
      </p>
    </form>
  )
}
