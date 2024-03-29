//import packages
import { useState } from 'react'
import axios from 'axios';
//contexts
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        setIsLoading(true)
        setError(null)

        await axios.post('https://hitlist-api.onrender.com/auth/signin', {
            email: email,
            password: password,
        }).then(response => {
            if (response.status === 200) {
                //console.log(response.data)
                //save the user to local storage
                localStorage.setItem('user', JSON.stringify(response.data))

                //update the auth context
                dispatch({ type: 'LOGIN', payload: response.data })

                //update loading state
                setIsLoading(false)
            }
        }).catch((err) => {
            //console.log(err.response.data)
            setIsLoading(false)
            setError(err.response.data.error)
        })

    }

    return { login, isLoading, error }
}