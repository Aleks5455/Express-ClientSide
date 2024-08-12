import { useContext } from "react"
import { ThemeContext } from "../theme-provider"
import {
  Button,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react"
import { HiSun } from "react-icons/hi"
import { FiMoon } from "react-icons/fi"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { logout, selectIsAuthenticated } from "../../features/user/userSlice"
import { useNavigate } from "react-router-dom"
import { CiLogout } from "react-icons/ci"

export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    localStorage.removeItem("token")
    navigate("/auth")
  }

  return (
    <div>
      <Navbar>
        <NavbarBrand>
          <p className="font-bold text-inherit">
            Aleks5455 World's Best Social Network
          </p>
        </NavbarBrand>
        <NavbarContent justify="end">
          <NavbarItem
            className="lg:flex text-3xl cursor-pointer"
            onClick={() => toggleTheme()}
          >
            {theme === "light" ? <FiMoon /> : <HiSun />}
          </NavbarItem>
          <NavbarItem>
            {isAuthenticated && (
              <Button
                color="default"
                variant="flat"
                className="gap-2"
                onClick={handleLogout}
              >
                <CiLogout />
                <span>Log Out</span>
              </Button>
            )}
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  )
}
