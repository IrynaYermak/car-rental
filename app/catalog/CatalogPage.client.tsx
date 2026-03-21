"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api/api";
import SearchBar from "@/components/SearchBar/SearchBar";
import Loader from "@/components/Loader/Loader";
import CarsList from "@/components/CarsList/CarsList";
import css from "./CatalogPage.module.css";
import { FilterFormInfo } from "@/types/FormInfo";
// // import { useState } from "react";
import { useCarStore } from "@/lib/store/store";

export default function CatalogClienPage() {
  // const [filterData, setFilterData] = useState<FilterFormInfo | null>(null);

  const filter = useCarStore((state) => state.filter);

  const handleFilter = (filter: FilterFormInfo) => {
    useCarStore.getState().setFilter(filter);
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
    queryKey: ["cars", filter],
    queryFn: async ({ pageParam }) => {
      const data = await getCars({
        page: pageParam.toString(),
        ...filter,
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
      <SearchBar filter={filter} onSubmit={handleFilter} />
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
