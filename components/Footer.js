import styles from '@/styles/Home.module.css'
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link className={styles.item} href='https://www.youtube.com/'>Connect with us on social media here</Link>
        <p className={styles.item}>&copy; 2023 My Site</p>
      </div>
    </footer>
  );
}
