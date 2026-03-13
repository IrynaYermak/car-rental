import styles from "./page.module.css";
// import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function Home() {
  return (
    <div className={styles.page}>
      <div className={`container ${styles.main}`}></div>
    </div>
  );
}
