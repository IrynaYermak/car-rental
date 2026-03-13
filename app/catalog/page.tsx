import type { Metadata } from "next";
import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import CatalogClienPage from "./CatalogPage.client";

import { getCars } from "@/lib/api/api";
import css from "./page.module.css";

export const metadata: Metadata = {
  title: "Rental Car catalog",
  description: "Renting car list",
};

export default async function CatalogPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["cars"],
    queryFn: () => getCars({}),
    initialPageParam: "1",
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className={`container ${css.catalog}`}>
        <CatalogClienPage />
      </section>
    </HydrationBoundary>
  );
}
