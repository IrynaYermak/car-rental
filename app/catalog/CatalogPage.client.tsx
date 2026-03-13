"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api/api";
import SearchBar from "@/components/SearchBar/SearchBar";
import Loader from "@/components/Loader/Loader";
import CarsList from "@/components/CarsList/CarsList";
import css from "./CatalogPage.module.css";
import { FormInfo } from "@/types/FormInfo";
import { useState } from "react";

export default function CatalogClienPage() {
  const [filterData, setFilterData] = useState<FormInfo | null>(null);

  const handleFilter = (data: FormInfo) => {
    setFilterData(data);
  };

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", filterData],
    queryFn: async ({ pageParam }) => {
      const data = await getCars({
        page: pageParam.toString(),
        ...filterData,
      });
      return data;
    },
    // enabled: true,
    initialPageParam: 1,
    getNextPageParam: (lastResponse) => {
      const currentPage = Number(lastResponse.page);
      const nextPage = currentPage + 1;
      return nextPage <= lastResponse.totalPages ? nextPage : undefined;
    },
    select: (data) => {
      const allCars = data.pages.flatMap((page) => page.cars);
      return { ...data, cars: allCars };
    },
    refetchOnMount: false,
  });

  const cars = data?.cars || [];
  const isCarsExist = cars.length > 0;

  return (
    <>
      <SearchBar onSubmit={handleFilter} />
      {isLoading && <Loader />}
      {error && <p className="center">Something went wrong</p>}
      {!isLoading && !error && !isCarsExist && <p>No cars on your request</p>}
      {isCarsExist && <CarsList cars={cars} />}
      {hasNextPage && (
        <div className={`center ${css.loadMore}`}>
          <button
            className={css.btn}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetching}
          >
            {isFetchingNextPage ? "Loading more..." : "Load More"}
          </button>
        </div>
      )}
    </>
  );
}
