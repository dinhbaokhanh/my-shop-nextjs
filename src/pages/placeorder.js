import axios from 'axios';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Checkout from '../../components/Checkout';
import Layout from '../../components/Layout';
import { getError } from './api/error';
import { Store } from '../../components/Store';
import styles from '@/styles/Placeorder.module.css';

export default function PlaceOrderScreen() {
    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { cartItems, shippingAddress, paymentMethod } = cart;

    const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

    const itemsPrice = round2(
        cartItems.reduce((a, c) => a + c.quantity * c.price)
    );

    const shippingPrice = itemsPrice > 200 ? 0 : 15;
    const totalPrice = itemsPrice + shippingPrice;

    const router = useRouter();
    useEffect(() => {
        if (!paymentMethod) {
        router.push('/payment');
        }
    }, [paymentMethod, router]);

    const [loading, setLoading] = useState(false);

    const placeOrderHandler = async () => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/orders', {
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                totalPrice,
            });
            setLoading(false);
            dispatch({ type: 'CLEAR' });
            // router.push(`/order/${data._id}`);
            router.push('/')
        } catch (err) {
            setLoading(false);
            toast.error(getError(err));
        }
    };

    return (
        <Layout title="Place Order">
            <Checkout activeStep={3} />
            <h1 style={{ fontSize: "27px", margin: "25px"}}>Place Order</h1>
            {cartItems.length === 0 ? (
                <div>
                Cart is empty. <Link href="/">Go shopping</Link>
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        <div className={styles.card}>
                            <h2 className={styles.title}>Shipping Address</h2>
                            <div>
                                {shippingAddress.fullName}, {shippingAddress.address},{' '}
                                {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                                {shippingAddress.country}
                            </div>
                            <div>
                                <Link className={styles.edit} href="/shipping">Change</Link>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <h2 className={styles.title}>Payment Method</h2>
                            <div>{paymentMethod}</div>
                            <div>
                                <Link className={styles.edit} href="/payment">Edit</Link>
                            </div>
                        </div>

                        <div className={styles.cont}>
                            <h2 lassName={styles.title}>Order Items</h2>
                            <table style={{minWidth: "100%"}}>
                                <thead style={{borderBottom: '1px solid'}}>
                                    <tr>
                                        <th className={styles.th}>Item</th>
                                        <th className={styles.rth}>Quantity</th>
                                        <th className={styles.rth}>Price</th>
                                        <th className={styles.rth}>Subtotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {cartItems.map((item) => (
                                    <tr key={item._id} style={{borderBottom: '1px solid'}}>
                                    <td>
                                        <Link href={`/product/${item.slug}`} style={{display: "flex", alignItems: "center"}}>

                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            width={50}
                                            height={50}
                                            style={{
                                            maxWidth: "100%",
                                            height: "auto"
                                            }}></Image>
                                        {item.name}

                                        </Link>
                                    </td>
                                    <td className={styles.rth}>{item.quantity}</td>
                                    <td className={styles.rth}>{item.price} VND</td>
                                    <td className={styles.rth}>
                                        {item.quantity * item.price} VND
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <div>
                                <Link href="/cart" className={styles.edit}>Edit</Link>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={styles.card}>
                            <h2 className={styles.title}>Order Summary</h2>
                            <ul>
                                <li>
                                    <div className={styles.item}>
                                        <div>Items</div>
                                        <div>{itemsPrice} VND</div>
                                    </div>
                                </li>

                                <li>
                                    <div className={styles.item}>
                                        <div>Shipping</div>
                                        <div>{shippingPrice}000 VND</div>
                                    </div>
                                </li>
                                <li>
                                    <div className={styles.item}>
                                        <div>Total</div>
                                        <div>{totalPrice} VND</div>
                                    </div>
                                </li>
                                <li>
                                    <button
                                    disabled={loading}
                                    onClick={placeOrderHandler}
                                    className={styles.btn}
                                    >
                                        {loading ? 'Loading...' : 'Place Order'}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

PlaceOrderScreen.auth = true;