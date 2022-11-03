import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { Box, Button, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import React, { useRef } from "react";
import { BsCheckCircle } from "react-icons/bs";
import { useReactToPrint } from "react-to-print";
import Footer from "../../Components/Frontend/Footer";
import Header from "../../Components/Frontend/Header";
import { useStateContext } from "../../Contexts/ContextProvider";
import { baseURL } from "../../utils/myAxios";

const OrderSummary = () => {
  const { orderId } = useStateContext();
  const componentRef = useRef();
  const [orderSummary, setOrderSummary] = React.useState([]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  useQuery(["orderSummary"], async () => {
    // const res = await staticAxios(`/order_summery/${orderId}/`);
    fetch(`${baseURL}/order_summery/${orderId}/`)
      .then((res) => res.json())
      .then((data) => setOrderSummary(data));
    /* Returning the data from the response. */
    // console.log(res);
    // console.log(res.data);
    // return res.data;
  });
  console.log(orderSummary);
  return (
    <Box
      ref={componentRef}
      sx={{
        width: 1,
        "@media print": {
          padding: 4,
          "@page": {
            size: "A4",
          },
        },
      }}
    >
      {/* {activeMenu ? <Header /> : <ResponsiveBottomMenu />} */}
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 7,
          "@media print": {
            p: 5,
          },
        }}
      >
        <Button
          size="small"
          variant="outlined"
          onClick={handlePrint}
          className="space-x-2"
          sx={{
            display: "flex",
            mt: 5,
            color: "primary.main",

            "@media print": {
              display: "none",
            },
            marginX: { md: 8, xs: 4 },
          }}
        >
          <Typography
            sx={{
              fontSize: 13,
            }}
          >
            Print
          </Typography>
          <CloudDownloadIcon />
        </Button>
      </Box>
      <Box sx={{ marginX: { md: 8, xs: 4 } }}>
        <BsCheckCircle className="text-3xl text-green-600 m-auto" />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="h6">We've received your order</Typography>
          <Typography variant="h6">
            Order ID: # {orderSummary.order_id}
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: { xs: "wrap", gap: 10 },
          }}
        >
          {/* --leftDelivery-- */}
          <Box>
            <Typography variant="h6" className="text-xl font-semibold">
              Order Details
            </Typography>
            <Box>
              <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                {orderSummary.name && `Name: ${orderSummary?.name}`}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                Phone: {orderSummary.phone}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                Order Type: {orderSummary.order_type}
              </Typography>
            </Box>
          </Box>
          {/* --rightOrder-- */}
          <Box>
            <Typography variant="h6" className="text-xl font-semibold">
              Delivery Details
            </Typography>
            <Box>
              <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                {orderSummary.name && `Name: ${orderSummary?.name}`}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                Phone: {orderSummary.phone}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                Order Type: {orderSummary.order_type}
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* --orderSummary-- */}
        <Box>
          <Typography variant="h6">Order Summary</Typography>
          <div class="bg-gray-100">
            <div class="bg-white shadow-sm overflow-auto">
              <table class="w-full overflow-scroll">
                <thead>
                  <tr class="bg-gray-200 text-gray-600 uppercase text-sm">
                    <th class="px-2 py-3">Item</th>
                    <th class="px-2 py-3">Quantity</th>
                    <th class="px-2 py-3">Extra Ingredient</th>
                    <th class="px-2 py-3">Size</th>
                    <th class="px-2 py-3">Amount</th>
                    <th class="px-2 py-3">Total Amount</th>
                  </tr>
                </thead>
                <tbody class="text-gray-600 text-sm">
                  {orderSummary.order_items?.map((data) => (
                    <tr
                      key={data.id}
                      class="border-b border-gray-200 hover:bg-gray-100"
                    >
                      <td class="py-3 text-center">{data.food_name}</td>
                      <td class="py-3 text-center">{data.quantity}</td>
                      <td class="py-3 text-center">
                        <div className="flex justify-evenly items-center h-12 overflow-scroll">
                          <div>
                            {data?.extra?.map((ingredient, index) => (
                              <h2 key={index}>{ingredient?.name}</h2>
                            ))}
                          </div>
                          <div>
                            {data?.extra?.map((ingredient, index) => (
                              <h2 key={index}>{ingredient?.price}</h2>
                            ))}
                          </div>
                        </div>
                      </td>
                      <td class="py-3 text-center">{data.price}</td>
                      <td class="py-3 text-center">{data.food_price} TK</td>
                      <td class="py-3 text-center">{data.food_amount} TK</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Box sx={{ display: "flex", justifyContent: "flex-end", marginY: 5 }}>
            <Box>
              <Box className="grid grid-cols-3 gap-8">
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  Packaging
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  :
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  Tk {orderSummary.packaging ? orderSummary.packaging : "00"}
                </Typography>
              </Box>
              <Box className="grid grid-cols-3 gap-8 ">
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  Total
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  :
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  Tk {orderSummary.sub_total ? orderSummary.sub_total : "00"}
                </Typography>
              </Box>
              <Box className="grid grid-cols-3 gap-8">
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  Discount
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  :
                </Typography>
                <Typography variant="body1" sx={{ fontSize: { xs: 14 } }}>
                  Tk {orderSummary.discount ? orderSummary.discount : "00"}
                </Typography>
              </Box>
              <hr />
              <Box className="grid grid-cols-3 gap-8">
                <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                  Total Amount
                </Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                  :
                </Typography>
                <Typography variant="h6" sx={{ fontSize: { xs: 14 } }}>
                  TK{" "}
                  {orderSummary.total_amount ? orderSummary.total_amount : "00"}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* <Link to="/">
        <Button
          sx={{
            display: { md: "none" },
            fontSize: "12px",
          }}
        >
          <AiOutlineArrowLeft />
          Go back
        </Button>
      </Link> */}
      <Footer />
    </Box>
  );
};

export default OrderSummary;
