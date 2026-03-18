import { Car } from "@/types/Car";
import Image from "next/image";
import css from "./Card.module.css";
import Link from "next/link";
import { useCarStore } from "@/lib/store/store";

interface CardProps {
  //   key: string;
  car: Car;
}

export default function Card({ car }: CardProps) {
  const favoriteCars = useCarStore((state) => state.favoriteCars);
  const setFavoriteCars = useCarStore((state) => state.setFavoriteCars);
  const isFavoriteCar = favoriteCars.includes(car.id);

  const {
    id,
    img,
    brand,
    model,
    year,
    type,
    rentalCompany,
    address,
    rentalPrice,
  } = car;
  const city = address.split(",")[1];
  const country = address.split(",")[2];
  const mileage = car.mileage.toLocaleString("uk-UA");

  return (
    <li key={id} className={css.card}>
      <Image
        className={css.photo}
        src={img}
        width={268}
        height={276}
        alt={brand}
        loading="eager"
      />
      <button
        className={css.like}
        type="button"
        onClick={() => setFavoriteCars(car.id)}
      >
        <svg className={css.hart} width="16" height="16" viewBox="0 0 24 24">
          <use
            href={
              isFavoriteCar
                ? "/icons.svg#icon-full-hart"
                : "/icons.svg#icon-hart"
            }
          />
        </svg>
      </button>

      <div className={css.info}>
        <div className={css.carInfo}>
          <p className={css.brandInfo}>
            {brand} <span className={css.accent}>{model}</span>, {year}
          </p>
          <p>${rentalPrice}</p>
        </div>
        <div className={css.group}>
          <div className={css.location}>
            <p className={css.text}>{city}</p>
            <p className={css.text}>{country}</p>
            <p className={css.text}>{rentalCompany}</p>
          </div>
          <div className={css.details}>
            <p className={css.text}>{type}</p>
            <p> {mileage} km</p>
          </div>
        </div>
      </div>

      <Link href={`/catalog/${id}`} className={css.btn}>
        Read more
      </Link>
    </li>
  );
}
