import React from "react";

import {
  ColumnDef,
  Table as TansStackTable,
  flexRender,
} from "@tanstack/react-table";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/Pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  containerClassName?: string;
  bodyRowClassName?: string;
  headerRowClassName?: string;
  table: TansStackTable<any>;
  columns: ColumnDef<any>[];
  pagination?: {
    activePage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
};

const DataTable = ({
  className,
  containerClassName,
  table,
  columns,
  bodyRowClassName,
  headerRowClassName,
}: Props) => {
  const pageCount = table.getPageCount();
  const state = table.getState();
  const currentPage = state.pagination.pageIndex;

  const renderPaginationItems = () => {
    const items: React.ReactNode[] = [];
    const maxVisiblePages = 5;
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    items.push(
      <PaginationItem key="first" onClick={() => table.setPageIndex(0)}>
        <PaginationLink
          className={`flex h-6 w-6 items-center justify-center rounded-md`}
          isActive={currentPage === 0}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    if (currentPage > halfVisible + 1) {
      items.push(<PaginationEllipsis key="ellipsis-1" />);
    }

    // Calculate range of middle pages
    let startPage = Math.max(1, currentPage - halfVisible);
    let endPage = Math.min(pageCount - 2, currentPage + halfVisible);

    // Adjust range if near start or end
    if (currentPage <= halfVisible) {
      endPage = Math.min(pageCount - 2, maxVisiblePages - 2);
    }
    if (currentPage >= pageCount - halfVisible - 1) {
      startPage = Math.max(1, pageCount - maxVisiblePages + 1);
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i} onClick={() => table.setPageIndex(i)}>
          <PaginationLink
            className={`flex h-6 w-6 items-center justify-center rounded-md`}
            isActive={currentPage === i}
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (currentPage < pageCount - halfVisible - 2) {
      items.push(<PaginationEllipsis key="ellipsis-2" />);
    }

    // Always show last page
    if (pageCount > 1) {
      items.push(
        <PaginationItem
          key="last"
          onClick={() => table.setPageIndex(pageCount - 1)}
        >
          <PaginationLink
            className={`flex h-6 w-6 items-center justify-center rounded-md`}
            isActive={currentPage === pageCount - 1}
          >
            {pageCount}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    return items;
  };

  return (
    <>
      <div className={containerClassName}>
        <Table
          className={cn(
            "scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100",
            className,
          )}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className={cn("border-b bg-accent", headerRowClassName)}
              >
                {headerGroup.headers.map((header) => {
                  const meta = header.column.columnDef.meta as
                    | { className?: string }
                    | undefined;
                  return (
                    <TableHead
                      key={header.id}
                      className={cn("px-0 text-center", meta?.className)}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={cn("", bodyRowClassName)}
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const meta = cell.column.columnDef.meta as
                      | {
                          className?: string;
                          getCellClassName?: (cell: any) => string;
                        }
                      | undefined;
                    return (
                      <TableCell
                        key={cell.id}
                        className={cn(
                          "border-b py-2 ",
                          meta?.className,
                          meta?.getCellClassName?.(cell),
                        )}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Không có dữ liệu
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {pageCount > 1 && (
        <Pagination className="mt-2 justify-end">
          <PaginationContent>{renderPaginationItems()}</PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default DataTable;
