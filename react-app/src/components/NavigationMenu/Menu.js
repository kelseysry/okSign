
import { openNav, closeNav } from '../../store/navigation'
import { useSelector, useDispatch } from "react-redux";
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import './NavigationMenu.css'
import { useHistory } from 'react-router';

function Menu() {

  const dispatch = useDispatch()
  const history = useHistory();

  const sessionUser = useSelector((state) => state?.session.user);
  const open = useSelector((state) => state.navigation.shortNav);


  const handleOpenNav = (open) => {
    if(!open) {
      dispatch(openNav())
    } else {
      dispatch(closeNav())
    }
  }


let navBar;

navBar = (
    <>

      <div className="menu">
        <button className="menu-logo"
        onClick={() =>  history.push(`/`)}
        >
          <div className="ok-discover">ok</div>
          <div className="sign-discover">Sign</div>
        </button>
        <button className="" onClick={() => handleOpenNav(open)}>
          <i class="fas fa-bars fa-2x"></i>
        </button>
      </div>

      <div className="sidebar"  style={open ? { transform: 'translateX(-100%)' } : {}}>

        {open ? <NavigationMenu /> : null}
      </div>
    </>
  )

  return (
    <>
      {sessionUser ? navBar : null}
    </>
  )

}

export default Menu
