import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getOneCar } from "@/lib/api/api";
import CarDeteil from "./CarDeteil.client";

interface CatalogItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function CatalogItemPage({
  params,
}: CatalogItemPageProps) {
  const queryClient = new QueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["car", id],
    queryFn: async () => {
      const data = await getOneCar(id);
      console.log("CAR:", data);
      return data;
    },
  });

  return (
    <div className="container">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CarDeteil />
      </HydrationBoundary>
    </div>
  );
}
