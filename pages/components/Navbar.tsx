import Link from 'next/link'
import { useState } from 'react'
import Button from './Button'
import { useRouter } from 'next/router'
import { HiMenuAlt2 } from "react-icons/hi"
import { GetServerSidePropsContext } from 'next';
import { useSession } from 'next-auth/react'
import { Profile } from '../account'

const links = [{
  label: { 
    es: "Inicio", 
    en: "Home" ,
    pl: "Start"
  },
  route: '/'
},]

const loginLinks = [{  
  label: { 
    es: "Login", 
    en: "Projects",
    pl: "Projekty"
  },
  route: '/login'
},{
  label: { 
    es: "My Account", 
    en: "Resume" ,
    pl: "O mnie"
  },
  route: '/account'
}]


type LanguageProps = {
  idioma: string,
  darkMode: string,
  setIdioma: React.Dispatch<React.SetStateAction<string>>;
  setDarkMode: React.Dispatch<React.SetStateAction<string>>;
  toggleSidebar: () => void;
  //session:GetServerSidePropsContext;
}

export default function Navbar ({ idioma, darkMode, setIdioma, setDarkMode, toggleSidebar } : LanguageProps) {

  const {data: session, status} = useSession();
  const LoginOrNot = () => {
    if (session) {
      return (
        <button>            
          <Button 
          target=''
          key={loginLinks[1].route} 
          label={loginLinks[1].label.es} 
          route={loginLinks[1].route}
          className= '' 
          />
        </button>
      )} else {
        return (
          <button>            
            <Button 
            target=''
            key={loginLinks[0].route} 
            label={loginLinks[0].label.es} 
            route={loginLinks[0].route}
            className= '' 
            />
          </button>
        )
      }
  }

  const cambiarIdioma = (nuevoIdioma: string) => {
    setIdioma(nuevoIdioma);
  }

  const toggleDarkMode = (toggleDark: string) => {
    if (darkMode == 'light') {
      setDarkMode('dark');
    } else {
      setDarkMode('light');
    }
    
  }

  const router = useRouter();

  const lightmode = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M256 160c-52.9 0-96 43.1-96 96s43.1 96 96 96 96-43.1 96-96-43.1-96-96-96zm246.4 80.5l-94.7-47.3 33.5-100.4c4.5-13.6-8.4-26.5-21.9-21.9l-100.4 33.5-47.4-94.8c-6.4-12.8-24.6-12.8-31 0l-47.3 94.7L92.7 70.8c-13.6-4.5-26.5 8.4-21.9 21.9l33.5 100.4-94.7 47.4c-12.8 6.4-12.8 24.6 0 31l94.7 47.3-33.5 100.5c-4.5 13.6 8.4 26.5 21.9 21.9l100.4-33.5 47.3 94.7c6.4 12.8 24.6 12.8 31 0l47.3-94.7 100.4 33.5c13.6 4.5 26.5-8.4 21.9-21.9l-33.5-100.4 94.7-47.3c13-6.5 13-24.7.2-31.1zm-155.9 106c-49.9 49.9-131.1 49.9-181 0-49.9-49.9-49.9-131.1 0-181 49.9-49.9 131.1-49.9 181 0 49.9 49.9 49.9 131.1 0 181z"></path></svg>
  const darkmode = <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M283.211 512c78.962 0 151.079-35.925 198.857-94.792 7.068-8.708-.639-21.43-11.562-19.35-124.203 23.654-238.262-71.576-238.262-196.954 0-72.222 38.662-138.635 101.498-174.394 9.686-5.512 7.25-20.197-3.756-22.23A258.156 258.156 0 0 0 283.211 0c-141.309 0-256 114.511-256 256 0 141.309 114.511 256 256 256z"></path></svg>
  
  const active_lang = 'bg-slate-600 hover:bg-slate-700 rounded px-2 py-1 font-semibold text-base'
  const unactive_lang = 'rounded px-2 py-1 font-semibold text-base'
  const active_light = 'bg-slate-200 rounded px-2 py-1 font-semibold text-base'
  const unactive_light = 'rounded px-2 py-1 font-semibold text-base'

  return (
    <header >
      <nav className={darkMode === "dark" ? 
      "flex justify-center pt-8 pb-5 bg-white transition duration-300" :
      "flex justify-center pt-8 pb-5 bg-white transition duration-300"
      }>
        <button type="button" className="toggle-btn" onClick={toggleSidebar}>
          <HiMenuAlt2 />
        </button>
        <div className="flex py-2 px-6">
          {links.map(({ label, route}) => (
          <button key={route} className={darkMode==='dark' ? 'px-3 nav-links' : 'px-3 text-black nav-links'}>
            <Button 
              target=''
              key={route} 
              label={idioma === "es" ? label.es : idioma === "en" ? label.en : label.pl} 
              route={route} 
              className={
                router.pathname === route && darkMode === 'dark' ? "py-2 px-4 rounded-md bg-blue-600 text-l font-semibold" : 
                router.pathname !== route && darkMode === 'dark' ? "py-2 px-4 rounded-md transition duration-300 hover:text-slate-300 text-l font-semibold":
                router.pathname === route && darkMode === 'light' ? "py-2 px-4 rounded-md bg-blue-100 text-l font-semibold" :
                'py-2 px-4 rounded-md transition duration-300 hover:text-slate-600 text-l font-semibold'
              }/>
          </button>
          ))}
          <LoginOrNot />
        </div>

        <button className="mx-1 text-white" onClick={() => cambiarIdioma('es')}>
          <div className={
            idioma === 'es' && darkMode=== 'dark' ? active_lang :
            idioma !== 'es' && darkMode=== 'dark' ? unactive_lang :
            idioma === 'es' && darkMode=== 'light' ? active_light :
            unactive_light
            }>
            <p className={darkMode==='dark' ? 'text-base' : 'text-base text-stone-800'}>ES</p></div> 
        </button>

        <button className="mx-1 text-white" onClick={() => cambiarIdioma('en')}>
          <div className={
            idioma === 'en' && darkMode=== 'dark' ? active_lang :
            idioma !== 'en' && darkMode=== 'dark' ? unactive_lang :
            idioma === 'en' && darkMode=== 'light' ? active_light :
            unactive_light
            }>
            <p className={darkMode==='dark' ? 'text-base' : 'text-base text-stone-800'}>EN</p></div> 
        </button>

        <button className="mx-1 text-white" onClick={() => cambiarIdioma('pl')}>
          <div className={
            idioma === 'pl' && darkMode=== 'dark' ? active_lang :
            idioma !== 'pl' && darkMode=== 'dark' ? unactive_lang :
            idioma === 'pl' && darkMode=== 'light' ? active_light :
            unactive_light
            }>
            <p className={darkMode==='dark' ? 'text-base' : 'text-base text-stone-800'}>PL</p></div> 
        </button>

        <button className="mx-2 text-white" onClick={() => toggleDarkMode(darkMode)}>
        <div className='bg-slate-600 hover:bg-slate-700 rounded px-2 py-2 text-sm'>{darkMode === "dark" ? darkmode : lightmode}</div>
        </button>
        <Profile />
      </nav>
    </header>
  )
}

 