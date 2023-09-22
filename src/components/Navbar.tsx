import React from "react";
import Link from "../../node_modules/next/link";
import styles from "./Navbar.module.css";
function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles["navbar-logo"]}>Logo</div>
      <ul className={styles["navbar-menu"]}>
        <li className={styles["navbar-item"]}>
          <Link href={"/"}>Beranda</Link>
        </li>
        <li className={styles["navbar-item"]}>
          <Link href={"/resto"}>Resto</Link>
        </li>
        <li className={styles["navbar-item"]}>
          <Link href={"/product"}>Product</Link>
        </li>
      </ul>
      <div className="">
        <button className={styles["login-button"]}>Login</button>
      </div>
    </nav>
  );
}

export default Navbar;
