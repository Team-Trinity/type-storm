"use client";
import { DataTable } from "@/components/ui/data-table";
import { HighScores } from "@/constants/data";
import { columns } from "./users";

interface ProductsClientProps {
  data: HighScores[];
}

export const UserClient: React.FC<ProductsClientProps> = ({ data }) => {

  return (
    <>

      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};