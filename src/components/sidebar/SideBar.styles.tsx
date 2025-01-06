import { styled } from "@mui/material/styles";
import { Drawer, ListItemIcon } from "@mui/material";

interface CustomButtonProps {
  drawerWidth?: number;
}

export const CustomSideBar = styled(Drawer)<CustomButtonProps>(
  ({ drawerWidth }) => ({
    width: drawerWidth ? `${drawerWidth}px` : "200px",

    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: drawerWidth ? `${drawerWidth}px` : "200px",
      boxSizing: "border-box",
      border: "none",
    },
  })
);


export const ListItemIconStyle = styled(ListItemIcon)<{isMenuItemActive:boolean}>(
  ({ isMenuItemActive }) => ({
  minWidth: "1.4rem",

  // svg 
  "& svg": {
    width:isMenuItemActive? "1rem": "0.9rem",
    height: isMenuItemActive? "1rem": "0.9rem",
    color: isMenuItemActive ? "#3774B2" : "#505050",
    paddingLeft:isMenuItemActive ? "0.5rem" : "0rem",


  },
  }))

