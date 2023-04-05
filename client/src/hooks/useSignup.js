import { useState } from 'react'
//axios
import axios from 'axios';
//context
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const signup = async (userName, email, password, confirmPassword) => {
        setIsLoading(true)
        setError(null)


        await axios.post('/signup', {
            userName: userName,
            email: email,
            password: password,
            confirmPassword: confirmPassword
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

    return { signup, isLoading, error }
}