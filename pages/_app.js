import 'tailwindcss/tailwind.css';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const { id } = router.query;

  

  return <Component {...pageProps} />;
}

export default MyApp;

