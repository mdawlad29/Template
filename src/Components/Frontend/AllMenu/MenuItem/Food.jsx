import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { useStateContext } from "../../../../Contexts/ContextProvider";
import AddToCartModal from "../../../Modals/Frontend/AddToCartModal";

const Food = ({ category }) => {
  const [foodItem, setFoodItem] = useState({});
  const [foodIndex, setFoodIndex] = useState(null);
  const [open, setOpen] = useState(false);
  const { screenSize } = useStateContext();
  const handleItemAndToggle = (foodItem, index) => {
    setOpen(true);
    setFoodIndex(index);
    setFoodItem(foodItem);
  };
  return (
    <Box sx={{ mb: 10 }}>
      {/* --food-- */}
      <Box>
        <Grid container>
          {category?.foodItems_category?.map((item, index) => {
            return (
              <Grid key={index} item sm={6} md={6}>
                <Box onClick={() => handleItemAndToggle(item, index)}>
                  <Box
                    sx={{
                      minHeight: { xs: 350, sm: "auto", md: "auto" },
                      bgcolor: "#FAFAEE",
                    }}
                    className=" border-2 shadow-md  rounded-lg   cursor-pointer relative"
                  >
                    <Grid
                      container
                      sx={{
                        "&.MuiGrid-root": {
                          padding: 0,
                        },
                      }}
                    >
                      {/* image section */}
                      <Grid item xs={12} sm={5} md={5} sx={{ p: 0, m: 0 }}>
                        <Box className=" sm:m-0 sm:w-32 sm:h-32 w-full h-44   relative p-0 m-0">
                          <img
                            className=" object-cover w-full h-full  rounded-md p-0 "
                            src={item?.image}
                            onError={({ currentTarget }) => {
                              currentTarget.onerror = null; // prevents looping
                              currentTarget.src =
                                "https://i.ibb.co/XbJNdft/defaultfood.png";
                            }}
                            alt=""
                          />
                          <IoMdAdd className="absolute text-xl font-bold bottom-1 right-1 bg-white text-gray-900 rounded-md p-1" />
                        </Box>
                      </Grid>
                      {/* details section */}
                      <Grid item xs={12} sm={7} md={7}>
                        <Box>
                          <Box className="md:flex justify-between">
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: 500,
                              }}
                            >
                              {item.food_name.substr(0, 20) +
                                `${item.food_name.length > 20 ? ".." : ""}`}
                            </Typography>
                          </Box>
                          <Typography
                            component="span"
                            sx={{
                              fontSize: 12,
                              fontWeight: 500,
                              mb: 4,
                            }}
                          >
                            {screenSize >= 1280
                              ? item.base_ingredient.substr(0, 100) +
                                `${
                                  item.base_ingredient.length > 100 ? ".." : ""
                                } `
                              : item.base_ingredient.substr(0, 70) +
                                `${
                                  item.base_ingredient.length > 70 ? ".." : ""
                                } `}
                          </Typography>
                          {/* --size-- */}

                          <Box>
                            {Boolean(item?.discount_price) ? (
                              Object.entries(item?.discount_price).map(
                                (key, index) => (
                                  <Box
                                    key={index}
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    {index === 0 && (
                                      <Box className="mt-2 absolute flex  items-center bottom-3">
                                        <Typography
                                          component="span"
                                          sx={{
                                            fontSize: {
                                              md: "16px",
                                            },
                                            pr: 1,
                                          }}
                                        >
                                          {`from TK `}
                                        </Typography>

                                        <Typography
                                          component="span"
                                          sx={{
                                            fontSize: {
                                              sm: "13px",
                                            },
                                            textDecoration: "line-through",
                                          }}
                                        >
                                          {item?.price[key[0]]}
                                        </Typography>
                                        <Typography
                                          component="span"
                                          sx={{
                                            fontWeight: 500,
                                            fontSize: {
                                              sm: "18px",
                                            },
                                            mr: 1,
                                          }}
                                        >
                                          {key[1]}
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                )
                              )
                            ) : Boolean(item?.price) ? (
                              Object.entries(item?.price).map((key, index) => {
                                return (
                                  <Box
                                    key={index}
                                    className="flex items-center"
                                  >
                                    {Boolean(index === 0) && (
                                      <Box className=" mt-2 absolute flex  items-center bottom-3">
                                        <Typography
                                          component="span"
                                          sx={{
                                            fontSize: "16px",

                                            pr: 1,
                                          }}
                                        >
                                          {`from TK `}
                                        </Typography>

                                        <Typography
                                          component="span"
                                          sx={{
                                            fontWeight: 500,
                                            fontSize: {
                                              sm: "18px",
                                            },
                                            mr: 1,
                                          }}
                                        >
                                          {key[1]}
                                        </Typography>
                                      </Box>
                                    )}
                                  </Box>
                                );
                              })
                            ) : (
                              <div></div>
                            )}
                          </Box>
                          {/* --size End-- */}
                        </Box>
                      </Grid>
                    </Grid>
                    {/* </div> */}
                  </Box>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Box>
      {/* --popularFood-- */}
      {/* <PopularFoodTabs /> */}

      {open && (
        <AddToCartModal
          open={open}
          index={foodIndex}
          item={foodItem}
          // onClose={onClose}
          setOpen={() => setOpen(false)}
        />
      )}
    </Box>
  );
};

export default Food;
