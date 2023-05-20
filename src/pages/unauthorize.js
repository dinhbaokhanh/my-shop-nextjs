import { useRouter } from 'next/router';
import React from 'react';
import Layout from '../components/Layout';

export default function Unauthorized() {

  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <h1>Access Denied</h1>
      {message && <div style={{color: "red"}}>{message}</div>}
    </Layout>
  );
}