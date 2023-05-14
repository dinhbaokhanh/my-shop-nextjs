import React, { useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import Layout from '../../components/Layout'
import styles from '@/styles/Login.module.css'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { getError } from './api/error'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

const LoginPage = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const { redirect } = router.query;
    useEffect(() => {
        if(session?.user){
            router.push(redirect || '/');
        }
    }, [router, session, redirect])

    const { handleSubmit, register, formState : { errors }} = useForm();
    const submitClick = async ({ email, password}) => {
        try {
            const result = await signIn('credentials', {
                redirect: false,
                email,
                password,
            });
            if (result.error) {
                toast.error(result.error);
            }
        } catch (err) {
            toast.error(getError(err));
        }
    }

    return (
        <Layout title='Login'>
            <form className={styles.form} onSubmit={handleSubmit(submitClick)}>
                <h1 className={styles.title}>
                    Log In
                </h1>
                
                <div className={styles.container}>
                    <input 
                    type='email'
                    {...register('email', {
                        required: 'Please enter your email',
                        pattern: {
                            value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                            message: "Please enter valid email",
                        }
                    })} 
                    placeholder='Email' 
                    className={styles.input} 
                    id='email' 
                    autoFocus></input>
                    {errors.email && <div style={{color: 'red'}}>{errors.email.message}</div>}
                </div>
                <div className={styles.container}>
                    <input 
                    type='password' 
                    {...register('password', {
                        required: 'Please enter password',
                        minLength: {
                            value: 8,
                            message: 'password needs at least 8 characters'
                        }
                    })}
                    placeholder='Password' 
                    className={styles.input} 
                    id='password' 
                    autoFocus></input>
                    {errors.password && <div style={{color: 'red'}}>{errors.password.message}</div>}
                </div>
                <div className={styles.container}>
                    <button className={styles.button}>Login</button>
                </div>

                <p className={styles.p}>Dont't have an account ? &nbsp;
                    <Link href="register"> Register </Link> here
                </p>    
            </form>
        </Layout>
    )
}

export default LoginPage