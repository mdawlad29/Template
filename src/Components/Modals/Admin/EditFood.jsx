import {
  Alert,
  AlertTitle,
  Autocomplete,
  Button,
  Chip,
  Grid,
  InputAdornment,
  Modal,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineClose } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import QueryLoader from "../../Loaders/QueryLoader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "#fff",
  border: "2px solid #fff",
  borderRadius: "5px",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const EditFood = ({
  allFoodData,
  editId,
  handleModalClose,
  isLoading,
  isError,
  customizeFood,
}) => {
  const { currentColor } = useStateContext();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [extra, setExtra] = useState();
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState({});
  // const [newprice, setNewPrice] = useState(0);
  const [Index, setIndex] = useState(0);

  const [customFood, setCustomFood] = useState([
    ...allFoodData?.data[0]?.customize_food,
  ]);
  const [variants, setVariants] = useState(0);
  const queryClient = useQueryClient();
  const onSubmit = async (data) => {
    const price = {};

    /* This is a function that is called when the form is submitted. It is used to update the data in
       the database. */
    data.item?.forEach((item) => {
      if (item.title.endsWith('"')) {
        const a = item?.title?.replace(/"/g, " inch");
        price[a] = item.price;
      } else if (variants > 1) {
        price[item.title] = item.price;
      } else {
        price["regular"] = item.price;
      }
    });

    /* This is a function that is called when the form is submitted. It is used to update the data in
           the database. */
    const payloadForm = new FormData();
    payloadForm.append("food_name", data?.foodName);
    payloadForm.append("price", `'${JSON.stringify(price)}'`);
    if (data?.image[0]) {
      payloadForm.append("image", data?.image[0]);
    }

    if (data?.package) {
      payloadForm.append("packaging", data?.package);
    }
    payloadForm.append("base_ingredient", data?.ingredient);
    if (extra) {
      payloadForm.append(
        "custom_food",
        JSON.stringify(extra?.map((a) => a?.id))
      );
    }

    /* This is a function that is called when the form is submitted. It is used to update the data in
   the database. */
    await toast.promise(
      myAxios.patch(`/food/${editId}/`, payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "updating Foods...",
        success: "Food Added",
        error: "Error Adding Foods!",
      }
    );
    queryClient.invalidateQueries("food");
    handleModalClose();
  };
  React.useEffect(() => {
    allFoodData?.data.map((data, index) => {
      console.log();
      // setVariants(data?.price ? Object.entries(data.price).length : null);
      setValue("foodName", data?.food_name);
      setValue("ingredient", data?.base_ingredient);
      setImage(data?.image);
      // setValue(
      //   "size",
      //   Object.entries(data?.price).map((key) => key[0])
      // );
      setPrice(data?.price);

      // setValue(
      //   ` item.${index + 1}.price`,
      //   data?.price && Object.entries(data?.price).map((key) => key[1])
      // );

      setValue("packaging", data?.packaging);
    });
  }, [editId]);
  return (
    <Modal open={Boolean(editId)} onClose={handleModalClose}>
      {isLoading ? (
        <QueryLoader />
      ) : isError ? (
        <Alert>
          <AlertTitle>Error !</AlertTitle>
        </Alert>
      ) : allFoodData ? (
        <Box
          sx={{
            ...style,
            width: { sm: 700, xs: 400 },
            height: 500,
            overflowY: "scroll",
          }}
        >
          <h2 className="text-3xl font-bold pb-3 text-center">
            Edit Food Item
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-5">
              {/* --FoodName-- */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="foodName"
                  label="Food Name"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  {...register("foodName")}
                  fullWidth
                />
              </Grid>
              {/* --size&price--*/}
              <Grid item xs={12}>
                <Button
                  sx={{ width: "100%", backgroundColor: `${currentColor}` }}
                  variant="contained"
                  onClick={() => setVariants((variants) => (variants += 1))}
                >
                  Add Size and Price
                </Button>
                {Object.entries(price).map((p, i) => {
                  return (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 2,
                        marginTop: 2,
                      }}
                    >
                      <TextField
                        label="Food Size"
                        type="text"
                        value={p[0]}
                        // required={variants > 1 ? true : false}
                        // {...register(`item.${index + 1}.title`)}
                        fullWidth
                      />
                      <TextField
                        // required
                        label="Food Price"
                        type="number"
                        // value={p[1]}
                        InputProps={{ inputProps: { min: 0 } }}
                        // {...register(`item.${index + 1}.price`)}
                        fullWidth
                      />
                      <AiOutlineClose
                        onClick={
                          () => {
                            if (Object.keys(price).length) {
                              for (const key in price) {
                                console.log(key);
                                if (key === p[0]) {
                                  console.log(key);
                                  delete price[key];
                                  break;
                                }
                              }
                            }
                          }
                          // Object.keys(price).map(
                          //   (key, index) => {
                          //     console.log(key);

                          //   }
                          //   // setPrice(key[0] === p[0] ? (p[0] = " ") : null)
                          // )
                        }
                        className={`text-5xl cursor-pointer text-red-700 `}
                      />
                    </Box>
                  );
                })}

                {new Array(variants).fill(null)?.map((item, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: 2,
                        marginTop: 2,
                      }}
                    >
                      <TextField
                        label="Food Size"
                        type="text"
                        // value={p[0]}
                        // required={variants > 1 ? true : false}
                        // {...register(`item.${index + 1}.title`)}
                        fullWidth
                      />
                      <TextField
                        // required
                        label="Food Price"
                        type="number"
                        // value={p[1]}
                        InputProps={{ inputProps: { min: 0 } }}
                        // {...register(`item.${index + 1}.price`)}
                        fullWidth
                      />
                      <AiOutlineClose
                        onClick={() =>
                          setVariants((variants) => (variants -= 1))
                        }
                        className={`text-5xl cursor-pointer text-red-700`}
                      />
                    </Box>
                  );
                })}
                {/* );
                })} */}
              </Grid>

              {/* --img-- */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="image"
                  type="file"
                  label="Food Image"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        {!Boolean(image) ? (
                          <FiUpload size={25} />
                        ) : (
                          <img
                            className="w-10 h-10 object-cover"
                            src={image}
                            alt=""
                          />
                        )}
                      </InputAdornment>
                    ),
                  }}
                  inputProps={{
                    accept: "image/*",
                  }}
                  {...register("image")}
                  sx={{
                    width: 1,
                    "& ::file-selector-button": {
                      display: "none",
                    },
                  }}
                />
              </Grid>
              {/* --ingredient-- */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="ingredient"
                  label="Base Ingredient"
                  type="text"
                  InputLabelProps={{ shrink: true }}
                  {...register("ingredient")}
                  fullWidth
                />
              </Grid>

              {/* --package-- */}
              <Grid item xs={12} md={6}>
                <TextField
                  id="package"
                  label="Packaging"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  InputLabelProps={{ shrink: true }}
                  {...register("packaging")}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Autocomplete
                  fullWidth
                  multiple
                  // loading={dataIsLoading}
                  id="fixed-tags-demo"
                  value={customFood}
                  options={customizeFood?.map((custom) => custom)}
                  getOptionLabel={(option) => option.ingredient_name}
                  onChange={(event, newValue) => setCustomFood(newValue)}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        label={option.ingredient_name}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Extra Ingredients"
                      variant="outlined"
                      placeholder="Favorites"
                      fullWidth
                    />
                  )}
                />
              </Grid>
              <div className="flex justify-end">
                <button
                  type="submit"
                  style={{ backgroundColor: currentColor }}
                  className="rounded drop-shadow-sm bg-primary mx-3 w-24 p-2 text-base font-semibold text-white outline-none"
                >
                  Update
                </button>
                <button
                  onClick={handleModalClose}
                  className="w-24 p-2 rounded-md font-semibold text-white bg-red-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </Box>
      ) : null}
    </Modal>
  );
};

export default EditFood;
