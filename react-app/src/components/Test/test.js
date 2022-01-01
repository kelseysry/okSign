
import { closeNav, openNav } from '../../store/navigation'
import './test.css'
import { useSelector, useDispatch } from "react-redux";
import NavigationMenu from '../NavigationMenu/NavigationMenu';




function Test() {

  const dispatch = useDispatch()

  const open = useSelector((state) => state.navigation.shortNav);


  return (
    <>


    <div className="menu">

  <button className="" onClick={() => dispatch(openNav())}>
    <i class="fas fa-bars fa-5x"></i>
  </button>

        <button className="arrow-button" onClick={() => dispatch(closeNav())}>
        <i className="fas fa-arrow-right"></i>
        </button>


    </div>

  {/* {open?  <NavigationMenu /> : null} */}

  <div
        className="sidebar"

        >
        <div className="sidebar-header">
        <button className="arrow-button" onClick={() => dispatch(closeNav())}>
        <i className="fas fa-arrow-right"></i>
        </button>
        </div>
        {open ? <NavigationMenu /> : null}

      </div>
    </>

  )

}

export default Test
