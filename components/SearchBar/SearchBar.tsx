"use client";

import css from "./SearchBar.module.css";
import { useState, useEffect, useId } from "react";
import { getBrands } from "@/lib/api/api";
import { FormInfo } from "@/types/FormInfo";

interface SearchBarProps {
  onSubmit: (data: FormInfo) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const id = useId();
  const [brands, setBrands] = useState<string[]>([]);
  const price = ["30", "40", "50", "60", "70", "80"];

  const handleSubmit = (formData: FormData) => {
    const brand = formData.get("brand-select")?.toString() || "";
    const rentalPrice = formData.get("price-select")?.toString() || "";
    const minMileage = formData.get("mileage-from")?.toString() || "";
    const maxMileage = formData.get("mileage-to")?.toString() || "";

    onSubmit({ brand, rentalPrice, minMileage, maxMileage });
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
  // console.log("brands", brands);

  return (
    <form className="center" action={handleSubmit}>
      <label htmlFor="brand-select">Car brand</label>
      <select
        name="brand-select"
        id={`${id}-brand-select`}
        className={css.search}
      >
        <option value="">Choose a brand</option>
        {brands.map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <label htmlFor="price-select">Price/ 1 hour </label>
      <select
        name="price-select"
        id={`${id}-price-select`}
        className={css.search}
      >
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
          name="mileage-from"
          id={`${id}-mileage-from`}
          className={css.mill}
          type="number"
          placeholder="From"
          min="0"
          inputMode="numeric"
          pattern="[0-9]*"
        />
        <input
          name="mileage-to"
          id={`${id}-mileage-to`}
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
