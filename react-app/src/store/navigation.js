const OPEN_NAV = 'navigation/openNav';
const CLOSE_NAV = 'navigation/closeNav';

export const openNav = () => ({
  type: OPEN_NAV,
});

export const closeNav = () => ({
  type: CLOSE_NAV,
});


  export default function NavigationMenuReducer (state = {shortNav: false }, action) {
    switch (action.type) {

      case OPEN_NAV:
        return {
          ...state,
          shortNav: true,
        };
      case CLOSE_NAV:
        return {
          ...state,
          shortNav: false,
        };

      default:
        return state;
    }
  }
