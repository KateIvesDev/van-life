import React, { useEffect, useContext } from 'react'
import AuthContext from '../components/AuthContext'
import { Link, useLocation,  useNavigate, useActionData, Form } from 'react-router-dom'
import { loginUser } from '../api/firebase'


export async function action( {request} ){
    const formData = await request.formData()
    const email = formData.get('email')
    const password = formData.get('password')
    
    try {
        const data = await loginUser(email, password )
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
    //const navigation = useNavigation()
    const data = useActionData()
    
    const {user} = useContext(AuthContext)
   
    useEffect(() => {
        if(user){
            navigate('/host')
        }
    }, [user])
    
  
    return(
        <section className='login-wrapper'>
            { location.state?.message &&
                <p>{location.state.message}</p>
            }
            { data?.error && 
                <p>{data.error}</p>
            }
            <h1>Sign in to your account</h1>
            <Form action='/login' method='post' className='form-layout'>
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
                
                <button type='submit' className='main-btn '>Login</button>
                <p>Don&apos;t have an account? <Link to='/register'>Register as a Host today!</Link></p>
            </Form>
        </section>
    )
}