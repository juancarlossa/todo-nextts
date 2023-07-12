import React from "react"
import Link from 'next/link'
import { FaTimes } from "react-icons/fa"

type Props = {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }:Props){
  const links = [
  {
    id: 1,
    text: "home",
    url: "/",
  },
  {
    id: 2,
    text: "projects",
    url: "/projects",
  },
  {
    id: 3,
    text: "resume",
    url: "/resume",
  }
]
  return (
    <aside className={isOpen ? "sidebar show-sidebar" : "sidebar"}>
      <button className="close-btn" type="button" onClick={toggleSidebar}>
        <FaTimes />
      </button>
      <div className="side-container">
        <ul className={isOpen ? "sidebar-links" : ""}>
          {links.map(link => {
            return (
              <li key={link.id}>
                <Link href={link.url} onClick={toggleSidebar}>
                  {link.text}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </aside>
  )
}

