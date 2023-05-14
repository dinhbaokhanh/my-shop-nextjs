import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../../components/Layout";
import data from "../api/data";
import styles from '@/styles/Items.module.css'
import Image from "next/image";
import { Store } from "../../../components/Store";

const ProductDetail = () => {
    const { query } = useRouter();
    const router = useRouter();
    const { slug } = query;
    const { state, dispatch } = useContext(Store);
    const product = data.products.find((item) => item.slug === slug);
    if(!product){
        return <div> Product is NOT AVAILABLE</div>
    }

    const addToCart = () => {

        const currentItem = state.cart.cartItems.find((item) => item.slug === product.slug);
        const quantity = currentItem ? currentItem.quantity + 1 : 1;

        if(product.countInStock < quantity){
            alert('Out of stock');
            return;
        }

        dispatch({
            type: 'ADD',
            payload: {
                ...product,
                quantity
            }
        });

        router.push('/cart')
    };

    return (
        <Layout title={product.name}>
            <div className={styles.product}>

                <div className={styles.image}>
                    <Image
                        src={product.image[1]}
                        width={600}
                        height={600}
                        alt={product.name}
                    />
                </div>

                <div className={styles.info}>
                    <div className={styles.title}>
                        {product.name}
                    </div>

                    <div className={styles.status}>
                        Rating : {product.rating} of {product.NumReviews} reviews
                    </div>

                    <div className={styles.bar}></div>

                    <p className={styles.des}>{product.description}</p>
                    <p className={styles.para}>〈Set Details〉</p>
                    <p className={styles.des}>{product.setDetails}</p>
                    <p className={styles.para}>〈Content〉</p>
                    <p className={styles.des}>{product.content}</p>

                    <label className={styles.button}>
                        <div className={styles.setName}> Buy this set </div>
                        <div className={styles.setInfo}>
                            <div className={styles.setPrice}>{product.price} VND</div>
                            <div className={styles.stock}>{product.countInStock} left </div>
                        </div>
                    </label>

                    <div>
                        <button class={styles.buy} onClick={addToCart}>ADD TO CART</button>
                    </div>

                </div>

                

            </div>
        </Layout>
    )
}

export default ProductDetail