"use client";

import css from "./SearchBar.module.css";
import { useState, useEffect } from "react";
import { getBrands } from "@/lib/api/api";

export default function SearchBar() {
  const [brands, setBrands] = useState<string[]>([]);
  const price = ["30", "40", "50", "60", "70", "80"];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const form = event.currentTarget;
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const data = await getBrands();
        setBrands(data);
      } catch (error) {
        console.error("Some error", error);
      }
    };

    fetchBrands();
  }, []);
  console.log("brands", brands);

  return (
    <form className="center" onSubmit={handleSubmit}>
      <label htmlFor="brand-select">Car brand</label>
      <select id="brand-select" className={css.search}>
        <option value="">Choose a brand</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <label htmlFor="price-select">Price/ 1 hour </label>
      <select id="price-select" className={css.search}>
        <option value="">Choose a price</option>
        {price.map((el) => (
          <option key={el} value={el}>
            {el}
          </option>
        ))}
      </select>

      <label htmlFor="mileage">
        Сar mileage / km
        <input
          id="mileage-from"
          className={css.mill}
          type="number"
          placeholder="From"
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input
          id="mileage-to"
          className={css.mill}
          type="number"
          placeholder="To"
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"
        />
      </label>
      <button type="submit" className={css.btn}>
        Search
      </button>
    </form>
  );
}
