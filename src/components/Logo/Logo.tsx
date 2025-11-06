import Image from 'next/image';
import styles from './Logo.module.css';


export default function Logo() {
  return (
      <div className={styles.logo}>
        <Image src="/logo.svg" alt="Logo" width={30} height={30}/>
        <span className={styles.text}>NerdyPay</span>
      </div>
  );
}
