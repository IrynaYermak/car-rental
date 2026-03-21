"use client";

import css from "./SearchBar.module.css";
import { useState, useEffect, useId } from "react";
import { getBrands } from "@/lib/api/api";
import { FilterFormInfo } from "@/types/FormInfo";
// import Select from "react-select";
import { selectStyles } from "./reactSelectStyles";
import dynamic from "next/dynamic";
// import { useCarStore } from "@/lib/store/satore";
const Select = dynamic(() => import("react-select"), { ssr: false });

interface SearchBarProps {
  filter: FilterFormInfo;
  onSubmit: (data: FilterFormInfo) => void;
}

type SelectOption = {
  value: string;
  label: string;
};

export default function SearchBar({ filter, onSubmit }: SearchBarProps) {
  const id = useId();
  const [brands, setBrands] = useState<string[]>([]);
  const price = ["30", "40", "50", "60", "70", "80"];
  const [formData, setFormData] = useState(filter);

  useEffect(() => {
    setFormData(filter);
  }, [filter]);

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

  const updateField = (key: keyof FilterFormInfo, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const optionsBrand: SelectOption[] = brands.map((brand) => ({
    value: brand,
    label: brand,
  }));
  const optionsPrice: SelectOption[] = price.map((el) => ({
    value: el,
    label: el,
  }));

  return (
    <div className="container">
      <form
        className={`center ${css.form}`}
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}
      >
        <label htmlFor="brand-select" className={css.group}>
          Car brand
          <Select
            styles={selectStyles}
            placeholder="Choose a brand"
            options={optionsBrand}
            name="brand-select"
            id={`${id}-brand-select`}
            classNamePrefix="react-select"
            value={
              formData.brand
                ? { value: formData.brand, label: formData.brand }
                : null
            }
            onChange={(option) =>
              updateField("brand", (option as SelectOption | null)?.value ?? "")
            }
            isClearable
          />
        </label>
        <label htmlFor="price-select" className={css.group}>
          Price/ 1 hour
          <Select
            styles={selectStyles}
            options={optionsPrice}
            name="price-select"
            id={`${id}-price-select`}
            placeholder="Choose a price"
            classNamePrefix="react-select"
            value={
              formData.rentalPrice
                ? { value: formData.rentalPrice, label: formData.rentalPrice }
                : null
            }
            onChange={(option) =>
              updateField(
                "rentalPrice",
                (option as SelectOption | null)?.value || ""
              )
            }
            isClearable
          />
        </label>
        <label htmlFor="mileage" className={css.group}>
          Сar mileage / km
          <div className={css.mileageWrapper}>
            <input
              name="mileage-from"
              id={`${id}-mileage-from`}
              className={`${css.mill} ${css.millFrom}`}
              type="number"
              placeholder="From"
              min="0"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.minMileage}
              onChange={(e) => updateField("minMileage", e.target.value)}
            />
            <input
              name="mileage-to"
              id={`${id}-mileage-to`}
              className={`${css.mill} ${css.millTo}`}
              type="number"
              placeholder="To"
              min="0"
              inputMode="numeric"
              pattern="[0-9]*"
              value={formData.maxMileage}
              onChange={(e) => updateField("maxMileage", e.target.value)}
            />
          </div>
        </label>
        <button type="submit" className={css.btn}>
          Search
        </button>
      </form>
    </div>
  );
}
