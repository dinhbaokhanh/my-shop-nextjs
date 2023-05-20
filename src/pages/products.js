import Layout from '../../components/Layout.js';
import React from 'react';
import styles from '@/styles/Products.module.css'
import ProductItem from '../../components/Product-item.js';
import Product from '../../models/Product.js';
import db from './api/db.js';

export default function Products({ products }) {
  return (
    <Layout title='Products'>
      <div className={styles.container}>
        {products.map((product) => (
          <ProductItem product={product} key={product.slug}>
          </ProductItem>
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}