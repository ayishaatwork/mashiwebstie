"use client";

import { useEffect } from "react";
import styles from "./page.module.css";
import Link from "next/link";


function scrollAllParentsToTop(element: HTMLElement | null) {
  let el: HTMLElement | null = element;

  while (el) {
    if (el.scrollTop > 0) {
      el.scrollTop = 0;
    }
    el = el.parentElement;
  }

  // Also ensure document-level scroll is reset
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    scrollAllParentsToTop(document.querySelector("main"));
  }, []);

  return (
    <>
    <section className={styles.legalPage}>
      <div className={styles.legalGrid}>{children}</div>
    </section>{/* FOOTER — HOME ONLY */}
      <footer className="site-footer">
        <div className="footer-grid">
          <Link href="/">Home</Link>
          <Link href="/shipping-and-returns">Shipping and returns</Link>

          <Link href="/store">Store</Link>
          <Link href="/payment-information">Payment Information</Link>

          <Link href="/collective">Collective</Link>
          <Link href="/terms-and-conditions">Terms and Conditions</Link>

          <Link href="/contact">Contact us</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
        </div>

        <div className="footer-copyright">© 2025 Mashi, Inc.</div>
      </footer>
    </>>
  );
}



