import React, { useEffect } from 'react'
import { useLocation, useNavigate, Form, useActionData, useNavigation } from 'react-router-dom'
import { loginUser } from '../api'

export async function action( {request} ){
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    
    try {
        const data = await loginUser( {email, password} )
        localStorage.setItem('loggedin', true)
        return data
    } catch(err){
        return {
            error: err.message
        }
    }
}

export default function Login(){

    const location = useLocation()
    const navigate = useNavigate()
    const navigation = useNavigation()
    const data = useActionData()

    const from = location.state?.from || '/host'
    const {state: status} = navigation

    useEffect(() => {
        if(data?.token){
            navigate(from, { replace: true } )
        }
    }, [data, navigate])
   

    return(
        <div>
            { location.state?.message &&
                <p>{location.state.message}</p>
            }
            { data?.error && 
                <p>{data.error}</p>
            }
            <h1>Sign in to your account</h1>
            <Form action='/login' method='post'>
                <input
                    name="email"
                    type='email'
                    placeholder='Email address'
                >
                </input>
                <input
                    name="password"
                    type='password'
                    placeholder='Password'
                >
                </input>
                
                <button disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Logging in' : 'Log In'}</button>
            </Form>
        </div>
    )
}