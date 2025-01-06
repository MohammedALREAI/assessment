export type ColumnTable<T> = {
    id: keyof T | string;
    label: string;
    name: string;
    render?: (row: T, index?: number) => React.ReactNode;
    align?: "left" | "right" | "center";  
    width?: number | string;
  
  };
  