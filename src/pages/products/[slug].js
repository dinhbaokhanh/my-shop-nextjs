import { useRouter } from "next/router";
import React, { useContext } from "react";
import Layout from "../../../components/Layout";
import db from "../api/db";;
import styles from '@/styles/Items.module.css'
import Image from "next/image";
import { Store } from "../../../components/Store";
import Product from "../../../models/Product";
import { toast } from "react-toastify";
import axios from "axios";

const ProductDetail = (props) => {
    const { product } = props;
    const router = useRouter();
    const { state, dispatch } = useContext(Store);
    if(!product){
        return <div> Product is NOT AVAILABLE</div>
    }

    const addToCart =  () => {

        const currentItem = state.cart.cartItems.find((item) => item.slug === product.slug);
        const quantity = currentItem ? currentItem.quantity + 1 : 1;
        const { data } = axios.get(`/api/products/${product._id}`);

        console.log(data);
        
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
                        src={product.image}
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
                        <button className={styles.buy} onClick={addToCart}>ADD TO CART</button>
                    </div>

                </div>

                

            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { params } = context;
    const { slug } = params;
  
    await db.connect();
    const product = await Product.findOne({ slug }).lean();
    await db.disconnect();
    return {
        props: {
            product: product ? db.convertDocToObj(product) : null,
        },
    };
}

export default ProductDetail;