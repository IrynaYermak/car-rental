import css from "./SearchBar.module.css";

export default function SearchBar() {
  return (
    <div className="center">
      <label htmlFor="brand">
        Car brand
        <input
          id="brand"
          className={css.search}
          type="select"
          placeholder="Choose a brand"
        />
      </label>
      <label htmlFor="price">
        Price/ 1 hour
        <input
          id="price"
          className={css.search}
          type="number"
          placeholder="Choose a price"
        />
      </label>
      <label htmlFor="mileage">
        Сar mileage / km
        <input
          id="mileage"
          className={css.mill}
          type="numper"
          placeholder="From"
        />
        <input id="mileage" className={css.mill} type="nu" placeholder="To" />
      </label>
      <button className={css.btn}>Search</button>
    </div>
  );
}
