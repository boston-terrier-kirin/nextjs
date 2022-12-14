import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from './Header';
import Showcase from './Showcase';
import Footer from './Footer';
import styles from '@/styles/Layout.module.css';

function Layout({ title, description, keywords, children }) {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>{children}</div>
      <Footer />
    </div>
  );
}

Layout.defaultProps = {
  title: 'DJ Events',
  description: 'Find the latest DJ and other musical events',
  keywords: 'music, dj, events',
};

export default Layout;
