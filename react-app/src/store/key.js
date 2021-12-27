
const GET_KEY = "maps/GET_KEY";

const getKey = (key) => ({
    type: GET_KEY,
    key
})

export const getAllMarkers = () => async (dispatch) => {
    const response = await fetch(`/api/maps/key`);

    if (response.ok) {
      const data = await response.json();
      dispatch(getKey(data));
    }
  };

let initialState= null
export default function reducer(state=initialState, action) {
    switch(action.type) {
        case GET_KEY:
            return action.key
        default:
            return state;
    }
}
