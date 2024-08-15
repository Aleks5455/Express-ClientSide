import { useEffect } from "react"
import { Header } from "../header"
import { Container } from "../container"
import { NavBar } from "../nav-bar"
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { selectIsAuthenticated } from "../../features/user/userSlice"
import { useAppSelector } from "../../app/hooks"
import { Profile } from "../profile"

export const Layout = () => {
  const location = useLocation()
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const navigate = useNavigate()
  
  const isUserPage = location.pathname.includes("/users/")

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth")
    }
  }, [])
  return (
    <>
      <Header />
      <Container>
        <div className="p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4 w-[450px]">
          <Outlet />
        </div>
        <div className="p-4 lg">
          <div className="flex flex-col gap-5">
            {!isUserPage && <Profile />}
          </div>
        </div>
      </Container>
    </>
  )
}
