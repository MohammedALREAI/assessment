// @mui
import { Theme, SxProps } from "@mui/material/styles";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: "1px",
  height: "1px",
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  clip: "rect(0 0 0 0)",
} as const;


type ColumnTable<T> = {
  id: keyof T | string;
  label: string;
  align?: "left" | "right" | "center";
  width?: number | string;
  minWidth?: number | string;
};

type Props<T> = {
  order?: "asc" | "desc";
  orderBy?: keyof T | string;
  headLabel: ColumnTable<T>[];
  onSort?: (id: keyof T | string) => void;
  sx?: SxProps<Theme>;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function TableHeadCustom<T extends Record<string, any>>({
  order,
  orderBy,
  headLabel,
  onSort,
  sx,
}: Props<T>) {
  return (
    <TableHead sx={sx}>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={String(headCell.id)}
            align={headCell.align || "left"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              width: headCell.width,
              minWidth: headCell.minWidth,
              color: (theme) => theme.palette.common.black,
            }}
          >
            {onSort ? (
              <TableSortLabel
                hideSortIcon
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={() => onSort(headCell.id)}
              >
                {headCell.label}

                {orderBy === headCell.id ? (
                  <Box sx={{ ...visuallyHidden }}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
