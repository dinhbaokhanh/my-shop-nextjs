import Link from 'next/link'
import React, {useContext} from 'react'
import styles from '@/styles/Home.module.css'
import { Store } from './Store'
import { Menu } from '@headlessui/react'
import {FiShoppingCart} from 'react-icons/fi'
import { useSession } from 'next-auth/react'
import { Dropdown } from './Dropdown'

const Header = () => {

    const { status, data: session } = useSession();

    const { state } = useContext(Store);
    const { cart } = state

    return (
        <>
            <nav className={styles.navbar}>
                
                <div className={styles.maxwidth}>

                    <div className='logo'>
                        <Link className={styles.logo} href='/'>
                            LOGO
                        </Link>
                    </div>

                    <ul className={styles.menu}>

                        <Link className={styles.a} href='/'>
                            <li>About</li>
                        </Link>

                        <Link className={styles.a} href='/products'>
                            <li>Products</li>
                        </Link>

                    </ul>

                    <ul className={styles.user}>

                        <Link className={styles.cart} href='/cart'>
                            <FiShoppingCart className={styles.cartIcon}/>
                            {cart.cartItems.length > 0 && (
                                <span className={styles.cartSpan}>
                                    {cart.cartItems.reduce((i, j) => i + j.quantity, 0)}
                                </span>
                            )}
                        </Link>

                        {status === 'loading' ? (
                            'Loading'
                        ) : session?.user ? (
                            <Menu as="div" className={styles.userMenu}>
                                <Menu.Button style={{color: "cyan"}}>
                                    {session.user.name}
                                </Menu.Button>
                                <Menu.Items className={styles.userItems}>
                                    <Menu.Item>
                                        <Dropdown 
                                        className={styles.dropdown}
                                        href="/profile">
                                            Profile
                                        </Dropdown>
                                        <Dropdown 
                                        className={styles.dropdown}
                                        href="/history">
                                            Order history
                                        </Dropdown>
                                        <Dropdown 
                                        className={styles.dropdown}
                                        href="/profile">
                                            Log out
                                        </Dropdown>
                                    </Menu.Item>
                                </Menu.Items>
                            </Menu>
                        ) : (
                            <Link className={styles.a} href='/login'>
                                Login
                            </Link>
                        )}

                    </ul>

                </div>

            </nav>       

            <div className={styles.line}></div>     
        </>

    )
}

export default Header