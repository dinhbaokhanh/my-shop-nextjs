import Link from 'next/link';
import React from 'react'
import styles from '@/styles/Home.module.css'

export const Dropdown = (props) => {
    let { href, children, ...rest} = props;
    return (
        <Link className={styles.dropdownItem} href={href}>
            <div {...rest}>
                {children}
            </div>
        </Link>
    )
}