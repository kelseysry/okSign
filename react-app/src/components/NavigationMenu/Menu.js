
import { openNav } from '../../store/navigation'
import { useSelector, useDispatch } from "react-redux";
import NavigationMenu from '../NavigationMenu/NavigationMenu';
import './NavigationMenu.css'

function Menu() {

  const dispatch = useDispatch()

  const sessionUser = useSelector((state) => state?.session.user);
  const open = useSelector((state) => state.navigation.shortNav);


let navBar;
navBar = (
  <>
    <div className="menu">
      <button className="" onClick={() => dispatch(openNav())}>
        <i class="fas fa-bars fa-5x"></i>
      </button>
    </div>

    <div className="sidebar">

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
