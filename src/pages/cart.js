import React, { useContext } from 'react'
import { Store } from '../../components/Store'
import Layout from '../../components/Layout';
import Link from 'next/link';
import Image from 'next/image';
import { AiFillCloseCircle  } from 'react-icons/ai'
import styles from '@/styles/Cart.module.css'
import { useRouter } from 'next/router';

const CartPage = () => {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const { cart : { cartItems } } = state;

  const removeItem = (item) => {
    dispatch({
      type: 'REMOVE',
      payload: item
    });
  }

  const updateCart = ( item, q ) => {
    const quantity = Number(q);
    dispatch ({
      type: 'ADD',
      payload: {...item, quantity}
    }) 
  }

  return (
    <Layout title='cart'>
      {
        cartItems.length === 0 ? 
        (<div className={styles.message}>
          Your cart is EMPTY. <Link href='/'> Shopping now</Link>
        </div>) :
        (
          <>
            <h1 className={styles.title}> Your Cart </h1>
            <div className={styles.container}>
              <table className={styles.table}>
                <tr>
                  <th>Products</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
                {cartItems.map((item) => (
                  <tr className={styles.border} key={item.slug}>
                    <td className={styles.border}>
                      <div className={styles.productInfo}>
                        <Image
                          src={item.image[0]}
                          alt={item.name}
                          width={60}
                          height={60}
                        >
                        </Image>
                        <p>{item.name}</p>
                      </div>
                    </td>
                    <td className={styles.quantityInfo}>
                      <select 
                        value={item.quantity}
                        onChange={(e) => {
                          updateCart(item, e.target.value)
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                      
                    </td>
                    <td className={styles.quantityInfo}>
                      {item.price} VND
                    </td>
                    <td className={styles.remove}>
                      <AiFillCloseCircle onClick={() => removeItem(item)} className={styles.icon}/>
                    </td>
                  </tr>
                ))}
              </table>
            </div>
            <div className={styles.total}>
              Subtotal ({cartItems.reduce((i, j) => i + j.quantity, 0)}) :&nbsp;
              {cartItems.reduce((i, j) => i + j.quantity * j.price, 0)} VND
              <div className={styles.space}></div>
              <div onClick={() => router.push('login?re/shipping')} className={styles.checkOut}>
                Check Out
              </div>
            </div>
          </>
          
        )
      }
    </Layout>
  )
} 

export default CartPage;