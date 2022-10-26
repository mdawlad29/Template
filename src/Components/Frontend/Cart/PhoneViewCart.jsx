import {
  Alert,
  Badge,
  Box,
  Button,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { useStateContext } from "../../../Contexts/ContextProvider";
import interceptor from "../../../utils/interceptors";
import CartItems from "./CartItems";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { staticAxios } from "../../../utils/myAxios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { setOrderInfo } from "../../../utils/localStorages";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ mt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const PhoneViewCart = () => {
  const { setOrderId, activeMenu } = useStateContext();
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [orderType, setOrderType] = useState(
    searchParams.get("table") ? "dine_in" : "takeaway"
  );
  const { cart, setCart } = useStateContext();
  const { register, handleSubmit, reset, control } = useForm();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleType = (e) => {
    setOrderType(
      e.target.innerText.toLowerCase() === "dine in"
        ? "dine_in"
        : e.target.innerText.toLowerCase()
    );
  };

  // const {
  //   data: { data: ingredients = [] },
  // } = useQuery([`/customize_food_category/${item.category}`], () =>
  //   staticAxios(`/customize_food_category/${item.category}`)
  // );
  // const { data: total = [] } = staticAxios("/viewcart/");
  // console.log(total);

  const orderConfirmMutation = useMutation(
    (payload) =>
      interceptor.post(
        `/order/?table=${
          searchParams.get("table") ? searchParams.get("table") : []
        }`,
        payload
      ),
    {
      onSuccess: ({ data }) => {
        setCart([]);
        reset();
        navigate("/ordersummary");
        setOrderId(data?.id);
        setOrderInfo(data?.id);
      },
    }
  );
  const onSubmit = async (data) => {
    const payload = {
      order_type: orderType,
      order_items: cart?.map((item) => {
        return {
          id: item.id,
          quantity: item.count,
          price: item.size,
          extra: item?.extra ? Object.keys(item?.extra) : [],
        };
      }),
      name: data?.name,
      email: data?.email,
      phone: data?.phoneNumber,
    };
    orderConfirmMutation.mutate(payload);
    console.log(payload);
  };

  const { data: cartCalculation } = useQuery(
    ["viewcart", cart],
    async () => {
      const { data } = await staticAxios.post("/viewcart/", {
        order_type: orderType,
        order_items: cart?.map((item) => {
          return {
            id: item.id,
            quantity: item.count,
            price: item.size,
            // extra: item?.extra ? Object.keys(item?.extra) : [],
            extra: item.extra ? Object.keys(item?.extra) : [],
          };
        }),
      });
      return data;
    },
    {
      enabled: Boolean(cart.length),
    }
  );

  return (
    <Box
      sx={{
        paddingX: 2,
        paddingY: 2,
        border: "1px solid #ccc",
        borderRadius: "5px",
        mt: { md: 0, sm: 7, xs: 0 },
      }}
    >
      {/* --cartInfo-- */}

      <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
        your food
      </Typography>

      <Box sx={{ height: "60vh", overflow: "scroll" }}>
        {cart?.map((item, index) => (
          <CartItems key={index} item={item} cart={cart} setCart={setCart} />
        ))}
      </Box>

      {/* --submitInfo-- */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ marginY: 2 }}>
          <Box className="space-y-4">
            <Box className="space-y-3">
              {/* --subTotal-- */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  Sub Total
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  {cartCalculation?.sub_total
                    ? cartCalculation?.sub_total
                    : "00"}{" "}
                  <span>৳</span>
                </Typography>
              </Box>
              {/* --package-- */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  Packaging
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  {cartCalculation?.packaging
                    ? cartCalculation?.packaging
                    : "00"}{" "}
                  <span>৳</span>
                </Typography>
              </Box>
              {/* --discount-- */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  Discount
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "14px" }}>
                  {cartCalculation?.discount_amount
                    ? -cartCalculation?.discount_amount
                    : "00"}{" "}
                  <span>৳</span>
                </Typography>
              </Box>
              <hr className="border-[#F0A70B]" />
              {/* --total-- */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  Total Amount
                </Typography>
                <Typography variant="h6" sx={{ fontSize: "16px" }}>
                  {cartCalculation?.total_amount
                    ? cartCalculation?.total_amount
                    : "00"}{" "}
                  <span>৳</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </form>
      {/* <Link to="/">
          <button className="flex items-center m-auto border border-gray-500 rounded-md px-2">
            <AiOutlineArrowLeft />
            Go back
          </button>
        </Link> */}
    </Box>
  );
};

export default PhoneViewCart;
