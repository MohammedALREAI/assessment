import Box from "@mui/material/Box";
import SideBar from "../sidebar/SideBar";
import { ProjectProvider } from "../../Context/Project";

const Layout = ({children}:{
  children: React.ReactNode
}) => {
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <ProjectProvider>
        <Box sx={{ height: "100%" }}>
          <SideBar />
        </Box>
        <Box
          sx={{
            width: "100%",
            height: "100vh",
          }}
        >
          <main
            style={{
              minHeight: "100%",
            }}
            className="flex-1 bg-[#EEF2F6] rounded-3xl mt-16 p-4 w-f "
          >
            {children}
          </main>
        </Box>
            </ProjectProvider>
      </Box>
    </>
  );
};

export default Layout;
