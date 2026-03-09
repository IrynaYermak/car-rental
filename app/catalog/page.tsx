import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rental Car catalog",
  description: "Renting car list",
};

export default function CatalogPage() {
  return (
    <div className="container">
      <h1>CatalogPage</h1>
    </div>
  );
}
