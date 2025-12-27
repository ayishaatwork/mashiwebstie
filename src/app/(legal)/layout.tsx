import styles from "./page.module.css";

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.legalPage}>
      <div className={styles.legalGrid}>{children}</div>
    </main>
  );
}
