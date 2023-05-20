import React, { useContext, useEffect} from 'react';
import Checkout from '../../components/Checkout';
import Layout from '../../components/Layout';
import styles from '@/styles/Checkout.module.css'
import { useRouter } from 'next/router';
import { Store } from '../../components/Store';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';

const shipping = () => {
    const {
        handleSubmit,
        register,
        formState: { errors },
        setValue,
    } = useForm();

    const { state, dispatch } = useContext(Store);
    const { cart } = state;
    const { shippingAddress } = cart;
    const router = useRouter();

    useEffect(() => {
        setValue('fullName', shippingAddress.fullName);
        setValue('address', shippingAddress.address);
        setValue('city', shippingAddress.city);
        setValue('postalCode', shippingAddress.postalCode);
        setValue('country', shippingAddress.country);
    }, [setValue, shippingAddress]);

    const submitHandler = ({ fullName, address, city, postalCode, country }, e) => {
        e.preventDefault();
        dispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country },
        });

        router.push('/payment');

        Cookies.set(
            'cart',
            JSON.stringify({
                ...cart,
                shippingAddress: {
                    fullName,
                    address,
                    city,
                    postalCode,
                    country,
              },
            })
        );

        
    };

    return (
        <Layout title="Shipping">
            <Checkout activeStep={1}/>
            <form className={styles.form} onSubmit={handleSubmit(submitHandler)}>
                <h1 style={{margin: '24px', fontSize: '25px'}}>
                    Shipping Address
                </h1>
            </form>

            <div style={{ marginBottom: '24px'}}>
                <label htmlFor="fullName">Full Name</label>
                <input
                    className={styles.input}
                    style={{ width: '100%'}}
                    id="fullName"
                    autoFocus
                    {...register('fullName', {
                    required: 'Please enter full name',
                    })}
                />
                {errors.fullName && (
                    <div className="text-red-500">{errors.fullName.message}</div>
                )}
            </div>

            <div style={{ marginBottom: '24px'}}>
                <label htmlFor="address">Address</label>
                <input
                    className={styles.input}
                    style={{ width: '100%'}}
                    id="address"
                    {...register('address', {
                    required: 'Please enter address',
                    minLength: { value: 3, message: 'Address is more than 2 chars' },
                    })}
                />
                {errors.address && (
                    <div style={{color: 'red'}}>{errors.address.message}</div>
                )}
            </div>

            <div style={{ marginBottom: '24px'}}>
                <label htmlFor="city">City</label>
                <input
                    className={styles.input}
                    style={{ width: '100%'}}
                    id="city"
                    {...register('city', {
                    required: 'Please enter city',
                    })}
                />
                {errors.city && (
                    <div style={{color: 'red'}}>{errors.city.message}</div>
                )}
            </div>

            <div style={{ marginBottom: '24px'}}>
                <label htmlFor="postalCode">Postal Code</label>
                <input
                    className={styles.input}
                    style={{ width: '100%'}}
                    id="postalCode"
                    {...register('postalCode', {
                    required: 'Please enter postal code',
                    })}
                />
                {errors.postalCode && (
                    <div style={{color: 'red'}}>{errors.postalCode.message}</div>
                )}
            </div>

            <div style={{ marginBottom: '24px'}}>
                <label htmlFor="country">Country</label>
                <input
                    className={styles.input}
                    style={{ width: '100%'}}
                    id="country"
                    {...register('country', {
                    required: 'Please enter country',
                    })}
                />
                {errors.country && (
                    <div style={{color: 'red'}}>{errors.country.message}</div>
                )}
            </div>

            <div className={styles.btn}>
                Next
            </div>
        
        </Layout>
    )
}

export default shipping;

shipping.auth = true;