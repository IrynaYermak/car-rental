"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getOneCar } from "@/lib/api/api";
import Loader from "@/components/Loader/Loader";
import BookForm from "@/components/BookForm/BookForm";
import css from "./CarDeteil.module.css";
import Image from "next/image";
import { Car } from "@/types/Car";

export default function CarDeteil() {
  const { id } = useParams<{ id: string }>();

  const capitalize = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const {
    data: car,
    isLoading,
    isError,
  } = useQuery<Car>({
    queryKey: ["car", id],
    // queryFn: async () => {
    //   const data = await getOneCar(id);
    //   return data;
    queryFn: () => getOneCar(id),

    enabled: Boolean(id),
    refetchOnMount: false,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !car) {
    return <p className="center">Something went wrong</p>;
  }

  const {
    accessories,
    address,
    brand,
    description,
    fuelConsumption,
    functionalities,
    img,
    model,
    // rentalCompany,
    rentalConditions,
    rentalPrice,
    year,
    engineSize,
  } = car;

  const city = address.split(",")[1];
  const country = address.split(",")[2];
  const idView = car.id.slice(-4);
  const mileage = car.mileage.toLocaleString("uk-UA");
  const type = capitalize(car.type || "");

  return (
    <div className={css.carDeteil}>
      <div className={css.orderSide}>
        <div className={css.imgWrapper}>
          <Image
            src={img}
            width={640}
            height={512}
            alt={brand}
            loading="eager"
            className={css.img}
          />
        </div>
        <BookForm />
      </div>
      <div className={css.infoSide}>
        <div className={css.block}>
          <h2 className={css.title}>
            {`${brand} 
            ${model}`}
            ,{year} <span className={css.idView}>Id:{idView}</span>
          </h2>
          <p className={css.text}>
            <svg className={css.icon}>
              <use href="/icons.svg#icon-location" />
            </svg>
            {city}, {country}{" "}
            <span className={css.mill}>Mileage: {mileage} km</span>
          </p>
          <p className={css.rentalPrice}>${rentalPrice}</p>
          <p className={css.text}>{description}</p>
        </div>
        <div className={css.deteils}>
          <div className={css.block}>
            <h3 className={css.blockTitle}>Rental Conditions: </h3>
            <ul className={css.list}>
              {rentalConditions.map((condition: string, index: number) => (
                <li key={index} className={css.listItem}>
                  <svg className={css.icon}>
                    <use href="/icons.svg#icon-check-circle" />
                  </svg>
                  {condition}
                </li>
              ))}
            </ul>
          </div>
          <div className={css.block}>
            <h3 className={css.blockTitle}>Car Specifications: </h3>
            <ul className={css.list}>
              <li className={css.listItem}>
                <svg className={css.icon}>
                  <use href="/icons.svg#icon-calendar" />
                </svg>
                Year:{year}
              </li>
              <li className={css.listItem}>
                <svg className={css.icon}>
                  <use href="/icons.svg#icon-car" />
                </svg>
                Type: {type}
              </li>
              <li className={css.listItem}>
                <svg className={css.icon}>
                  <use href="/icons.svg#icon-fuel-pump" />
                </svg>
                Fuel Consumption: {fuelConsumption}
              </li>
              <li className={css.listItem}>
                <svg className={css.icon}>
                  <use href="/icons.svg#icon-gear" />
                </svg>
                Engine Size: {engineSize}
              </li>
            </ul>
          </div>
          <div className={css.block}>
            <h3 className={css.blockTitle}>Accessories and functionalities:</h3>
            <ul className={css.list}>
              {accessories.map((condition: string, index: number) => (
                <li key={index} className={css.listItem}>
                  <svg className={css.icon}>
                    <use href="/icons.svg#icon-check-circle" />
                  </svg>
                  {condition}
                </li>
              ))}
              {functionalities.map((condition: string, index: number) => (
                <li key={index} className={css.listItem}>
                  <svg className={css.icon}>
                    <use href="/icons.svg#icon-check-circle" />
                  </svg>
                  {condition}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
