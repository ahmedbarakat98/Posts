import  {  useState } from "react";
import {
  Navbar as Nav,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link as LinkHero,
  Button,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import photo from '../assets/bm.jpg'

export const AcmeLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};



export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const nav = useNavigate()
  const {isLoggedIn , setIsLoggedIn , setUserData} = useContext(AuthContext);

  
  function setLogout(){
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserData(null);
    nav('/login');
  }
  

  return (
    <Nav onMenuOpenChange={setIsMenuOpen}>
      {isLoggedIn && <NavbarContent>
        <NavbarBrand >
          <Link className="text-inherit flex cursor-pointer" to='/profile'>
          <div className="size-8 bg-amber-800 rounded-full me-4 overflow-hidden flex justify-center items-center">
            <img className="w-full " src={photo} alt="Pic" />
          </div>
          <h3 className="hidden md:flex">Profile Page</h3></Link>
        </NavbarBrand>
      </NavbarContent>}

      <NavbarContent >
        <NavbarBrand className={isLoggedIn? " flex justify-center items-center" : "flex justify-start"}>
          <AcmeLogo />
          <Link className="font-bold text-inherit cursor-pointer " to='/'>Post Link</Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="end">
        {isLoggedIn ? 
        <>
        <NavbarItem  >
          <Button color="primary" variant="bordered" onPress={() => setLogout()}>
            Logout
          </Button>
        </NavbarItem>
        </>
        :
        <NavbarItem>
          <Button as={Link} color="primary" href="/" variant="bordered">
            Home
          </Button>
        </NavbarItem>}
      </NavbarContent>
    </Nav>
  );
}


