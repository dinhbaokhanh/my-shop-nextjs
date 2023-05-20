import Link from 'next/link'
import React, {useContext} from 'react'
import styles from '@/styles/Home.module.css'
import { Store } from './Store'
import { Menu } from '@headlessui/react'
import {FiShoppingCart} from 'react-icons/fi'
import { signOut, useSession } from 'next-auth/react'
import { Dropdown } from './Dropdown'

const Header = (props) => {
    const { status, data: session } = useSession();
    const { state, dispatch } = useContext(Store);
    const { cart } = state;

    const logoutClick = () => {
        dispatch({ type: 'RESET'})
        signOut({ callbackUrl: '/login'})
    }

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
                                <Menu as="div" className={styles.menu}>
                                    <Menu.Button className={styles.menuButton}>
                                        {session.user.name}
                                    </Menu.Button>
                                    <Menu.Items className={styles.menuItems}>
                                        <Menu.Item>
                                            <Dropdown className={styles.dropdownItem} href='/profile'>
                                                Profile
                                            </Dropdown>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Dropdown className={styles.dropdownItem} href='/history'>
                                                Order History
                                            </Dropdown>
                                        </Menu.Item>
                                        <Menu.Item>
                                            <Dropdown onClick={logoutClick} className={styles.dropdownItem} href='#'>
                                                Logout
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