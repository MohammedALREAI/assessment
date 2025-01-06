import {
  Box,

} from "@mui/material";
import  { useMemo, useState } from "react";
import {  useLocation, useNavigate } from "react-router-dom";
import { CustomSideBar } from "./SideBar.styles";
import { SidebarMenu } from "./meui";
import PeopleIcon from '@mui/icons-material/People';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useMediaQuery } from "@mui/system";
import { useProjectContext } from "../../Context/Project";



type MenuItem = {
  name: string; 
  icon?: JSX.Element; 
  url?: string; 
  child?: MenuItem[]; 
};

const SideBar = () => {

  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  const location = useLocation();
  const navigate = useNavigate();
      const {state,dispatch}=useProjectContext()
      console.log("state?.projects",state?.projects)
    

      const menu: MenuItem[] = useMemo(()=>[
        {
          name: "Favorite Projects",
          icon: <PeopleIcon />,
          child: state?.projects?.map((project) => ({
            name: project.name,
            url: `/project/${project.id}`,
          })),
        },
      ],[state?.projects])

  const handleMenuClick = (index:number, url?: string) => {
    if (url) {
      navigate(url);
    } else {
      setOpenMenus((prevOpenMenus) => ({
        ...prevOpenMenus,
        [index]: !prevOpenMenus[index],
      }));
    }
  };

  const isActive = (url: string) => location.pathname === url 
  const isSmallScreen = useMediaQuery("(max-width: 600px)");
  const  drawerWidth=useMemo(()=>isSmallScreen?200:300,[isSmallScreen])

  return (
    <Box sx={{ display: "flex" }}>

      <CustomSideBar
        drawerWidth={drawerWidth}
        variant="permanent"
        anchor="left"
      >
       
        <div className="flex-1 mx-2 flex flex-col my-32">
        <SidebarMenu
          menu={menu}
          isActive={isActive}
          handleMenuClick={handleMenuClick}
          openMenus={openMenus}
        />

</div> 

</CustomSideBar>
    </Box>
  );
};

export default SideBar;




