//import packages
import { createContext, useReducer } from "react";

export const MissionsContext = createContext()

export const missionsReducer = (state, action) => {
    switch (action.type) {
        case 'SET_MISSIONS':
            return {
                missions: action.payload
            }
        case 'CREATE_MISSION':
            return {
                missions: [action.payload, ...state.missions]
            }
        case 'DELETE_MISSION':
            return {
                missions: state.missions.filter((mission) => mission['_id'] != action.payload['_id'])
            }
        case 'EDIT_MISSION':
            return { missions: state.missions.map((mission) => mission['_id'] === action.payload['_id'] ? action.payload : mission) }
        default: {
            return state
        }
    }
}

export const MissionsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(missionsReducer, { missions: null })

    return (
        <MissionsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MissionsContext.Provider>
    )
}