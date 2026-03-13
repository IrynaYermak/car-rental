import axios from "axios";
import { Car } from "@/types/Car";

export const api = axios.create({
  baseURL: process.env.NEXT_SERVER_API_URL,
});

// interface GetCarsParams {
//   page?: string;
//   brand?: string;
//   rentalPrice?: string;
//   minMileage?: string;
//   maxMileage?: string;
//   limit?: string;
// }

interface GetCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}

export const getCars = async () => {
  const { data } = await api.get<GetCarsResponse>("/cars");
  console.log("cars", data);
  return data;
};

export const getOneCar = async (id: string) => {
  const { data } = await api.get<Car>(`/cars/${id}`);
  return data;
};
