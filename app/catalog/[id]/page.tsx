// import {} from "@tanstack/react-query";

interface CatalogItemPageProps {
  params: Promise<{ id: string }>;
}

export default async function CatalogItemPage({
  params,
}: CatalogItemPageProps) {
  const { id } = await params;

  return (
    <div className="container">
      <h1>CatalogItemPage</h1>
      <p>Car id: {id}</p>
    </div>
  );
}
