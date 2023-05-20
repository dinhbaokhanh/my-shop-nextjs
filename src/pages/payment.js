import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Checkout from '../../components/Checkout';
import Layout from '../../components/Layout';
import { Store } from '../../components/Store';
import styles from '@/styles/Payment.module.css'
import 'react-responsive-carousel/lib/styles/carousel.min.css';

export default function payment() {
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress, paymentMethod } = cart;

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();
        if (!selectedPaymentMethod) {
            return toast.error('Payment method is required');
        }
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });

        router.push('/placeorder');
    };

    useEffect(() => {
        setSelectedPaymentMethod(paymentMethod || '');
    }, [paymentMethod, router, shippingAddress.address]);

    return (
        <Layout title="Payment">
            <Checkout activeStep={2} />
            <form className={styles.form} onSubmit={submitHandler}>
                <h1 style={{ fontSize: "27px", margin: "25px"}}>Payment Method</h1>
                {['Online', 'Cash On Delivery'].map((payment) => (
                <div key={payment} className="mb-4">
                    <input
                    name="paymentMethod"
                    className={styles.option}
                    id={payment}
                    type="radio"
                    checked={selectedPaymentMethod === payment}
                    onChange={() => setSelectedPaymentMethod(payment)}
                    />

                    <label style={{padding: '8px'}} htmlFor={payment}>
                    {payment}
                    </label>
                </div>
                ))}
                <div className={styles.container}>
                    <button
                        onClick={() => router.push('/shipping')}
                        type="button"
                        className={styles.prev}
                    >
                    Back
                    </button>
                    <button className={styles.btn}>Next</button>
                </div>
            </form>
        </Layout>
    );
}

payment.auth = true;