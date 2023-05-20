import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import { StoreProvider } from '../../components/Store'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

export default function App({ Component, pageProps: { session, ...pageProps} }) {
  return(
    <SessionProvider session={session}>
      <StoreProvider>
        {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )}
        
      </StoreProvider>
    </SessionProvider>
  )
}

const Auth = ( { children, adminOnly }) => {
  const router = useRouter();
  const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
      router.push('/unauthorized?message=login required');
    },
  });
  if (status === 'loading') {
    return <div>Loading...</div>;
  }
  if (adminOnly && !session.user.isAdmin) {
    router.push('/unauthorized?message=admin login required');
  }

  return children;
}
