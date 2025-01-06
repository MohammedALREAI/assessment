import { createTheme } from '@mui/material/styles';
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

export const cache =  createCache({
    key: "mui",
    stylisPlugins:[prefixer],
  });



export const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', 
    },
  },
  components: {
 
 
    MuiTableRow: {
      styleOverrides: {
        root: {
          "&.Mui-selected:hover": {
            opacity: "0.8",
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderBottom: `1px dashed #60a5fa`,
        },
      },
    },

    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#dbeafe",
          border: "none",

          color: "#fff",
        },
      },
    },    
  },
});