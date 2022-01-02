import { motion } from 'framer-motion';
import React, { useCallback, useState } from 'react';
import { LogOut, User } from 'react-feather';
import { useNavigate } from 'react-router';
import tw, { styled } from 'twin.macro';
import avatarDefault from '../../../assets/avatar_default.png';
import DarkMode from '../../../ModeScreen/DarkMode';
import './style.css'

const RightNavBar = tw.div`flex items-center ml-auto`
const UserContainer = styled.div`
  ${[`height:78px;`, tw`hidden items-center cursor-pointer sm:flex relative `]}
`
const Avatar = tw.img`h-12 w-12 rounded-full hover:bg-blue-300 object-cover ml-3`
const NameUser = styled.div`
    ${`max-width:11.5rem;`}
    ${tw`text-lg font-bold mx-4 truncate`}
`
const Span = tw.span`ml-3`
const Dropdown = styled(motion.div)(() => [
  tw`h-auto w-48 border-t border-blue-400 shadow-md mt-4 absolute flex flex-col`,
])
const DropdownItem = tw.div`w-full flex p-2 cursor-pointer my-1 text-lg font-medium border-b transform transition-all duration-75 hover:(text-blue-400 text-xl)`

const NavUser = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [avatar, setAvatar] = useState(null);
  const history = useNavigate()
  let userName, logout
  const UserOptions = [
    { id: 'profile', name: "Infomation", link: "/user-profile", display: true, icon: <User /> },
    // { id: 'change_password', name: "Đổi mật khẩu", link: "/change-password", display: (idp === "local") ? true : false, icon: <Key /> },
    { id: 'logout', name: "Logout", link: "", display: true, icon: <LogOut /> }
  ];

  const handleMouseMove = useCallback((isOpen) => {
    setIsOpen(isOpen)
  }, [])

  const handleItemClick = ({ id, link }) => {
    if (id === 'logout')
      logout && logout()
    else
      link && history(link);
  }

  return (
    <RightNavBar>
      <UserContainer className="group" onMouseMove={() => handleMouseMove(true)} onMouseLeave={() => handleMouseMove(false)}>
        <Avatar src={avatar ? avatar : avatarDefault} alt="avatar" />
        <NameUser>{userName || "User"}</NameUser>
        <Dropdown
          className="bg-memu-bar"
          variants={{
            current: {
              opacity: 1,
              y: 83,
              display: "",
            },
            hidden: {
              opacity: 0,
              y: 135,
              display: "none",
            },
          }}
          transition={{ duration: 0.2 }}
          initial={'hidden'}
          animate={isOpen ? 'current' : 'hidden'}
        >
          {UserOptions.map(({ id, link, name, display, icon }) =>
            display && <DropdownItem
              key={id}
              onClick={() => handleItemClick({ id, link })}>
              {icon}
              <Span>{name}</Span>
            </DropdownItem>
          )}
        </Dropdown>
      </UserContainer>&nbsp;&nbsp;
      <DarkMode />
    </RightNavBar>
  )
}
export default NavUser
