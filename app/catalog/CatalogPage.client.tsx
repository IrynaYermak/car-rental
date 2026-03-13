"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api/api";
import Loader from "@/components/Loader/Loader";
import CarsList from "@/components/CarsList/CarsList";
import css from "./CatalogPage.module.css";

export default function CatalogClienPage() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars"],
    queryFn: async ({ pageParam }) => {
      const data = await getCars({
        page: pageParam.toString(),
      });
      return data;
    },
    // enabled: true,
    initialPageParam: 1,
    getNextPageParam: (lastResponse) => {
      const currentPage = Number(lastResponse.page);
      const nextPage = currentPage + 1;
      // console.log("Page", currentPage);
      // console.log("Next page", nextPage);
      // console.log("Total pages", lastResponse.totalPages);
      return nextPage <= lastResponse.totalPages ? nextPage : undefined;
    },
    select: (data) => {
      const allCars = data.pages.flatMap((page) => page.cars);
      return { ...data, cars: allCars };
    },
    refetchOnMount: false,
  });
  console.log("data", data);

  const cars = data?.cars || [];
  const isCarsExist = cars.length > 0;

  return (
    <>
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
