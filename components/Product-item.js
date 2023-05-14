import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Products.module.css'
import Image from 'next/image';

const ProductItem = ({ product }) => {
    return (
        <div className={styles.card}>
            <Link href={`/products/${product.slug}`}>
                <Image 
                    src={product.image[0]}
                    alt={product.name}
                    width={230}
                    height={230}
                />
                <div className={styles.name}>{product.name}</div>
                <div className={styles.price}>{product.price} VND</div>
            </Link>
        </div>
    )
}

export default ProductItem