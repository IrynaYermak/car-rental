"use client";

import { useQuery, keepPreviousData } from "@tanstack/react-query";
// import { useState } from "react";
import { getCars } from "@/lib/api/api";
import Loader from "@/components/Loader/Loader";
import CarsList from "@/components/CarsList/CarsList";
import css from "./CatalogPage.module.css";

export default function CatalogClienPage() {
  // const [currentPage, setCurrentPage] = useState("1");
  const { data, isError, isLoading } = useQuery({
    queryKey: ["cars"],
    queryFn: () => getCars(),
    // enabled: true,
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });
  console.log("data", data);

  const cars = data?.cars || [];
  const isCarsExist = cars.length > 0;
  return (
    <>
      {isLoading && <Loader />}
      {/* {isError && <p>Something went wrong</p>} */}
      {!isLoading && !isError && !isCarsExist && <p>No cars on your request</p>}
      {isCarsExist && <CarsList cars={cars} />}
      <div className={`center ${css.loadMore}`}>
        <button className={css.btn}>Load more</button>
      </div>
    </>
  );
}
