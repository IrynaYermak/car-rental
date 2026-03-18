"use client";

import css from "./SearchBar.module.css";
import { useState, useEffect, useId } from "react";
import { getBrands } from "@/lib/api/api";
import { FormInfo } from "@/types/FormInfo";
import Select from "react-select";
import { selectStyles } from "./reactSelectStyles";

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
  const optionsBrand = brands.map((brand) => ({ value: brand, label: brand }));
  const optionsPrice = price.map((el) => ({ value: el, label: el }));

  // console.log("brands", brands);

  return (
    <div className="container">
      <form className={`center ${css.form}`} action={handleSubmit}>
        <label htmlFor="brand-select" className={css.group}>
          Car brand
          <Select
            styles={selectStyles}
            placeholder="Choose a brand"
            options={optionsBrand}
            name="brand-select"
            id={`${id}-brand-select`}
            // className={css.search}
            classNamePrefix="react-select"
          />
        </label>
        <label htmlFor="price-select" className={css.group}>
          Price/ 1 hour
          <Select
            styles={selectStyles}
            options={optionsPrice}
            name="price-select"
            id={`${id}-price-select`}
            // className={css.search}
            placeholder="Choose a price"
            classNamePrefix="react-select"
          />
        </label>
        <label htmlFor="mileage" className={css.group}>
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
    </div>
  );
}
