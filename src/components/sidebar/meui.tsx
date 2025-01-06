import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import DotIcon from "@mui/icons-material/FiberManualRecord"; // Replace with your dot icon
import { ListItemIconStyle } from "./SideBar.styles";

// Define types for menu items
interface MenuItem {
  name: string;
  url?: string;
  icon?: React.ReactNode;
  child?: MenuItem[];
}

interface SidebarMenuProps {
  menu: MenuItem[];
  isActive: (url: string) => boolean;
  handleMenuClick: (menuKey:number, url?: string) => void;
  openMenus: Record<string | number, boolean>;
}



export const SidebarMenu: React.FC<SidebarMenuProps> = ({
  menu,
  isActive,
  handleMenuClick,
  openMenus,
}) => {
  return (
    <List>
      {menu?.map((menuItem, index) => {
        const hasChildren = menuItem?.child?.length > 0;
        const isMenuItemActive:boolean =
          isActive(menuItem.url || "") ||
          menuItem.child?.some((child) => isActive(child.url || ""));

        return (
          <React.Fragment key={index}>
            {/* Top-level Menu Item */}
            <ListItem
              onClick={() => handleMenuClick(index, menuItem.url)}
              sx={{
                bgcolor: isMenuItemActive
                  ? "rgba(220, 237, 255, 1)"
                  : "transparent",
                color: isMenuItemActive ? "#3774B2" : "#505050",
                borderRadius: "10px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
                paddingBlock: isMenuItemActive ? 2 : 3,
                
                "&:hover": {
                  bgcolor: "rgba(220, 237, 255, 0.8)",
                  color: "#3774B2",
                },

                ...(isMenuItemActive && {
                  transform: "scale(1.02)", // Slight scale animation
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }),
              }}
            >
              <ListItemIconStyle
              isMenuItemActive={isMenuItemActive || false}

              >{menuItem.icon || 
                <DotIcon
               />}</ListItemIconStyle>
              {menuItem.url ? (
                <Link
                  to={menuItem.url}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItemText primary={menuItem.name} />
                </Link>
              ) : (
                <ListItemText primary={menuItem.name} />
              )}
              {hasChildren && (openMenus[index] ? <ExpandLess /> : <ExpandMore />)}
            </ListItem>

            {/* Submenu */}
            {hasChildren && (
              <Collapse in={openMenus[index]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menuItem.child.map((childItem, childIndex) => {
                    const childHasChildren = childItem.child?.length > 0;
                    const isChildActive = isActive(childItem.url || "") || childItem.child?.some((child) => isActive(child.url || ""));

                    return (
                      <React.Fragment key={`${index}-${childIndex}`}>
                        <ListItem
                          onClick={() =>
                            handleMenuClick(`${index}-${childIndex}`, childItem.url)
                          }
                          sx={{
                            bgcolor: isChildActive
                              ? "rgba(220, 237, 255, 1)"
                              : "transparent",
                            color: isChildActive ? "#3774B2" : "#505050",
                            borderRadius: "10px",
                            cursor: "pointer",
                            my: isChildActive ? 2 : 1,
                            transition: "all 0.3s ease-in-out",
                            
                            "&:hover": {
                              bgcolor: "rgba(220, 237, 255, 0.8)",
                              color: "#3774B2",
                            },
                          }}
                        >
                          
                          <ListItemIconStyle
                          isMenuItemActive={isChildActive ||false}

                          >
                            {childItem.icon || <DotIcon/>}</ListItemIconStyle>
                          {childItem.url ? (
                            <Link
                              to={childItem.url}
                              style={{ textDecoration: "none", color: "inherit" }}
                            >
                              <ListItemText primary={childItem.name} />
                            </Link>
                          ) : (
                            <ListItemText primary={childItem.name} />
                          )}
                          {childHasChildren &&
                            (openMenus[`${index}-${childIndex}`] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            ))}
                        </ListItem>

                        {/* Sub-Submenu */}
                        {childHasChildren && (
                          <Collapse
                            in={openMenus[`${index}-${childIndex}`]}
                            timeout="auto"
                            unmountOnExit
                          >
                            <List component="div" disablePadding>
                              {childItem?.child?.map((subChildItem, subChildIndex) => (
                                <ListItem
                                  key={`${index}-${childIndex}-${subChildIndex}`}
                                  sx={{
                                    bgcolor: isActive(subChildItem.url || "")
                                      ? "rgba(220, 237, 255, 1)"
                                      : "transparent",
                                    color: isActive(subChildItem.url || "")
                                      ? "#3774B2"
                                      : "#505050",
                                    borderRadius: "10px",
                                    cursor: "pointer",
                                    pl: 6, // Further indentation
                                    transition: "all 0.3s ease-in-out",
                                    
                                    "&:hover": {
                                      bgcolor: "rgba(220, 237, 255, 0.8)",
                                      color: "#3774B2",
                                    },
                                  }}
                                >
                                  <ListItemIconStyle
                                    isMenuItemActive={isActive(subChildItem.url || "") || false}
                                  >
                                    {subChildItem.icon || <DotIcon/>}
                                  </ListItemIconStyle>
                                  <Link
                                    to={subChildItem.url || ""}
                                    style={{ textDecoration: "none", color: "inherit" }}
                                  >
                                    <ListItemText primary={subChildItem.name} />
                                  </Link>
                                </ListItem>
                              ))}
                            </List>
                          </Collapse>
                        )}
                      </React.Fragment>
                    );
                  })}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        );
      })}
    </List> 
  );
};
