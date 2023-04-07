//import packages
import { useContext } from "react"
//contexts
import { MissionsContext } from "../context/MissionContext"


export const useMissionsContext = () => {
    const context = useContext(MissionsContext)

    if (!context) {
        throw Error('useMissionsContext must be used inside an AuthContextProvider')
    }
    return context
}