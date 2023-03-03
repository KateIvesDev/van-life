import React, { useEffect } from 'react'
import { useLocation, useNavigate, useActionData, useNavigation, Form} from 'react-router-dom'
import { auth, registerUser } from '../api/firebase'


export async function action( {request} ){
    const formData = await request.formData()
    const firstName = formData.get('firstName')
    const lastName = formData.get('lastName')
    const email = formData.get('email')
    const password = formData.get('password')
    
    try {
        const data = await registerUser(firstName, lastName, email, password )
        return data
    } catch(err){
        return {
            error: err.message
        }
    }
}

export default function Register(){

    const navigate = useNavigate()
    const data = useActionData()

    useEffect(() => {
        if(data){
            navigate('/host')
        }
    }, [data])

    return(
        <div>
          
            { data?.error && 
                <p>{data.error}</p>
            }
            <h1>Register for a Host account</h1>
            <Form action='/register' method='post'>
                <input
                    name="firstName"
                    type='firstName'
                    placeholder='First name'
                >
                </input>
                <input
                name="lastName"
                type='lastName'
                placeholder='Last name'
                >
            </input>
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
                
                <button>Register as a Host</button>
            </Form>
        </div>
    )

}