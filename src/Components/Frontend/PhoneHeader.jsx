import { Alert, Badge, Box, Typography } from "@mui/material";
import React from "react";
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import cookImg from "../../image/Cook.svg";
import { useStateContext } from "../../Contexts/ContextProvider";
import CustomDrawer from "../Shared/CustomDrawer";
import { Link, useSearchParams } from "react-router-dom";

const PhoneHeader = () => {
  const { cart, activeMenu } = useStateContext();
  const [searchParams] = useSearchParams();
  return (
    <Box className="bg-[#F0A70B] px-10 md:py-6 py-3  flex justify-between items-center md:gap-0 gap-5 md:items-center fixed bottom-0 left-0 right-0 z-10 rounded-tr-xl rounded-tl-xl">
      <Box className="flex justify-between items-center w-full">
        {searchParams.get("table") ? (
          <Badge
            className="cursor-pointer"
            badgeContent={cart.length}
            color="primary"
          >
            <AiOutlineShoppingCart className="inline md:w-16 md:h-16 w-8 h-8 text-neutral " />
          </Badge>
        ) : (
          <Link to="/viewcart">
            <Badge
              className="cursor-pointer"
              badgeContent={cart.length}
              color="primary"
            >
              <AiOutlineShoppingCart className="inline md:w-16 md:h-16 w-8 h-8 text-neutral " />
            </Badge>
          </Link>
        )}
        {activeMenu ? null : cart?.length ? (
          <CustomDrawer />
        ) : (
          <Box className="md:w-28 md:h-28 w-20 h-20 border-8 border-neutral rounded-full md:-mt-14 -mt-8 bg-neutral">
            <Box
              className={`w-full h-full ${
                cart.length ? "border-1 border-red-400" : "border-1"
              } rounded-full md:p-2 p-1`}
            >
              <img
                className="md:w-16 md:h-16 w-10 h-10 mx-auto "
                style={{ color: "blue" }}
                src={cookImg}
                alt=""
              />
              <Typography
                sx={{
                  fontSize: { sm: 14, xs: 8 },
                  fontWeight: 500,
                  pl: 0.9,
                  color: "#F0A70B",
                }}
              >
                Order Now
              </Typography>
            </Box>
          </Box>
        )}

        <Link to="/">
          <AiOutlineHome className="inline md:w-20 md:h-20 w-8 h-8 text-neutral" />
        </Link>
      </Box>
    </Box>
  );
};

export default PhoneHeader;
