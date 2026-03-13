import { Car } from "@/types/Car";
import Card from "../Card/Card";
import css from "./CarsList.module.css";

interface CarsListProps {
  cars: Car[];
}

export default function CarsList({ cars }: CarsListProps) {
  return (
    <ul className={css.list}>
      {cars.map((car) => (
        <Card key={car.id} car={car} />
      ))}
    </ul>
  );
}
