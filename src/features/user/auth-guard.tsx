import React from "react"
import { useCurrentQuery } from "../../app/services/userApi"
import { Spinner } from "@nextui-org/react"

export const AuthGuard = ({ children }: { children: JSX.Element }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner className="absolute top-1/2 left-1/2" />
  }

  return children
}
