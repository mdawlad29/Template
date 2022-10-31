import { Box } from "@mui/material";
import React from "react";
import { useStateContext } from "../../../Contexts/ContextProvider";
import BGIcon from "../../../image/restaurant_icons.webp";
import Footer from "../Footer";
import Header from "../Header";
import ResponsiveMenu from "../ResponsiveBottomMenu";
const Layout = ({ children }) => {
  const { activeMenu } = useStateContext();
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${BGIcon})`,
          // height: "100%",
          // backgroundRepeat: "no-repeat",
          // backgroundSize: "cover",
          height: "100vh",
          // backgroundPosition: "center",
          // backgroundColor: "rgba(0, 0, 0, 0.9)",
          overflowY: "scroll",
        }}
      >
        {activeMenu ? <Header /> : null}
        <main>{children}</main>
        {activeMenu ? <Footer /> : <ResponsiveMenu />}
      </Box>
    </>
  );
};

export default Layout;
