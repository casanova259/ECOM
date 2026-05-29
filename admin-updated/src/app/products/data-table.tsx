"use client";

import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "@/components/TablePagination";
import { Sheet } from "@/components/ui/sheet";
import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Product } from "@/lib/supabase/types";
import { getColumns } from "./columns";
import EditProduct from "@/components/EditProduct";
import { useRouter } from "next/navigation";



interface DataTableProps<TData, TValue> {
  value:TValue,
  data: TData[];
}

export function DataTable<TData, TValue>({
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  // ── Edit sheet state ──────────────────────────────────────────────
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editSheetOpen, setEditSheetOpen] = useState(false);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditSheetOpen(true);
  };

  const router=useRouter();

  // ─────────────────────────────────────────────────────────────────

  // Build columns with the onEdit callback injected
  const columns = getColumns(handleEdit);

  const table = useReactTable({
    data: data as Product[],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
    },
  });



  return (
    <>
      {/* ── Edit Sheet ── */}
      <Sheet open={editSheetOpen} onOpenChange={setEditSheetOpen}>
        {editingProduct && (
          <EditProduct
            product={editingProduct}
            onSuccess={() => {
              setEditSheetOpen(false)

              router.refresh()
            }
            }
          />
        )}
      </Sheet>

      <div className="rounded-md border">
        {Object.keys(rowSelection).length > 0 && (
          <div className="flex justify-end">
            <button className="flex items-center gap-2 bg-red-500 text-white px-2 py-1 text-sm rounded-md m-4 cursor-pointer">
              <Trash2 className="w-4 h-4" />
              Delete Product(s)
            </button>
          </div>
        )}
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <DataTablePagination table={table} />
      </div>
    </>
  );
}