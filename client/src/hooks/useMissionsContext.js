import { MissionsContext } from "../context/MissionContext"
import { useContext } from "react"

export const useMissionsContext = () => {
    const context = useContext(MissionsContext)

    if (!context) {
        throw Error('useMissionsContext must be used inside an AuthContextProvider')
    }
    return context
}