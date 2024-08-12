import React from "react"
import { NavButton } from "../nav-button"
import { BsPostcardHeart } from "react-icons/bs"
import { FiUsers } from "react-icons/fi"
import { FaUsers } from "react-icons/fa"

export const NavBar = () => {
  return (
    <nav>
      <ul className="flex flex-col gap-5">
        <li>
          <NavButton href="/" icon={<BsPostcardHeart />}>
            Posts
          </NavButton>
        </li>
        <li>
          <NavButton href="following" icon={<FiUsers />}>
            Followings
          </NavButton>
        </li>
        <li>
          <NavButton href="followers" icon={<FaUsers />}>
            Followers
          </NavButton>
        </li>
      </ul>
    </nav>
  )
}
