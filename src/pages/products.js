import Layout from '../../components/Layout.js';
import React from 'react';
import styles from '@/styles/Products.module.css'
import data from './api/data.js';
import ProductItem from '../../components/Product-item.js';

export default function Products() {
  return (
    <Layout title='Products'>
      <div className={styles.container}>
        {data.products.map((product) => (
          <ProductItem product={product} key={product.slug}>
          </ProductItem>
        ))}
      </div>
    </Layout>
  )
}