import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TableHeadCustom, TableSkeleton } from "./index";
import { ColumnTable } from "../../types";



export interface DataTableProps<T> {
  data: T[];
  columns: ColumnTable<T>[];
  loading?: boolean;
  defaultDense?: boolean;
  defaultOrderBy?: string;
  defaultOrder?: "asc" | "desc";
}

export default function DummyTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  defaultDense = false,
  defaultOrderBy = "name",
  defaultOrder = "asc",
}: DataTableProps<T>) {
  const [tableData, setTableData] = useState<T[]>(data);
  const [dense, setDense] = useState(defaultDense);
  const [orderBy, setOrderBy] = useState(defaultOrderBy);
  const [order, setOrder] = useState<"asc" | "desc">(defaultOrder);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    setTableData(data);
  }, [data]);

  const hasData = tableData.length > 0;

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <TableContainer>
        <Table
          size={dense ? "small" : "medium"}
          sx={{
            minWidth: isSmallScreen ? 600 : 960,
            width: "100%",
            margin: "auto",
          }}
        >
          {/* Table Header */}
          <TableHeadCustom
            order={order}
            orderBy={orderBy}
            headLabel={columns}
            onSort={(field) => {
              setOrderBy(String(field));
              setOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
            }}
          />

          {/* Table Body */}
          <TableBody>
            {loading ? (
              [...Array(5)].map((_, index) => (
                <TableSkeleton key={index} sx={{ height: 4 }} />
              ))
            ) : hasData ? (
              tableData.map((row, index) => (
                <TableRow key={row.id || index}>
                  {columns.map((column) => (
                    <TableCell
                      key={String(column.id || column.name)}
                      align={column.align || "left"}
                      style={{ width: column.width }}
                    >
                      {column.render
                        ? column.render(row, index)
                        : row[column.name] || "-"}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  sx={{ textAlign: "center", py: 3 }}
                >
                  <Typography variant="body2" color="textSecondary">
                    No data available
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
