import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header>
      <div className={`container ${css.header}`}>
        <Link href="/" className={css.logoLink}>
          <svg className={css.logo}>
            <use href="/icons.svg#icon-rental-car" />
          </svg>
        </Link>

        <nav aria-label="Main navigation">
          <ul className={css.navList}>
            <li className={css.navItem}>
              <Link href="/" className={css.navLink}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/catalog" className={css.navLink}>
                Catalog
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
