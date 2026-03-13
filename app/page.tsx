import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.main}>
      <div className={`container `}>
        <div className={styles.content}>
          <h1 className={styles.title}>Find your perfect rental car</h1>
          <p className={styles.text}>
            Reliable and budget-friendly rentals for any journey
          </p>
          <Link href="/catalog" className={styles.link}>
            View Catalog
          </Link>
        </div>
      </div>
    </div>
  );
}
