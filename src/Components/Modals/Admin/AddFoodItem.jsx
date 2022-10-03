import { Box } from "@mui/system";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useStateContext } from "../../../Contexts/ContextProvider";
import myAxios from "../../../utils/myAxios";
import { GrClose } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";

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

const AddFoodItem = ({ handleModalCloseTwo, categories, foodRefetch }) => {
  const { currentColor, currentMode } = useStateContext();
  const [variants, setVariants] = useState(1);
  const [category, setCategory] = useState(0);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const price = {};

    data.item?.forEach((item) => {
      price[item.title] = item.price;
    });

    const payloadForm = {
      food_name: data?.foodName,
      food_detail: data?.detail,
      price: `'${JSON.stringify(price)}'`,
      image: data?.image[0],
      base_ingredient: data?.ingredient,
      review: data?.review,
      taste: data?.taste,
      packaging: data?.package,
      category: category,
    };

    const response = await toast.promise(
      myAxios.post("/food/", payloadForm, {
        headers: {
          "content-type": "multipart/form-data",
        },
      }),
      {
        pending: "Adding Foods...",
        success: "Food Added",
        error: "Error Adding Foods!",
      }
    );
    queryClient.invalidateQueries("foods");
    handleModalCloseTwo();
    foodRefetch();
  };

  return (
    <Box sx={{ ...style, width: 600, height: 500, overflowY: "scroll" }}>
      <h2 className="text-3xl font-bold pb-3 text-center">Add Food Item</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-5">
          {/* --FoodName-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="foodName"
              label="Food Name"
              type="text"
              // value={foodName}
              // onChange={(newValue) => {
              //   setFoodName(newValue);
              // }}
              error={Boolean(errors.foodName)}
              helperText={errors.foodName && "This food name is required *"}
              {...register("foodName", { required: true })}
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
                    {...register(`item.${index + 1}.title`)}
                    fullWidth
                  />
                  <TextField
                    label="Food Price"
                    type="number"
                    required
                    {...register(`item.${index + 1}.price`)}
                    fullWidth
                  />
                  {/* <Button
                    variant="contained"
                    sx={{ height: 52, color: "#fff" }}
                  >
                  </Button> */}
                  <AiOutlineClose
                    onClick={() => setVariants((variants) => (variants -= 1))}
                    className="text-5xl cursor-pointer text-red-700"
                  />
                </Box>
              );
            })}
          </Grid>
          {/* --img-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="image"
              type="file"
              label="Food Image"
              required
              InputLabelProps={{
                shrink: true,
              }}
              error={Boolean(errors.image)}
              helperText={errors.image && "Food image is required *"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <FiUpload size={25} />
                  </InputAdornment>
                ),
              }}
              inputProps={{
                accept: "image/*",
              }}
              {...register("image", { required: true })}
              sx={{
                width: 1,
                "& ::file-selector-button": {
                  display: "none",
                },
              }}
            />
          </Grid>
          {/* --ingredient-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="ingredient"
              label="Base Ingredient"
              type="text"
              // value={ingredient}
              // onChange={(value) => setIngredient(value)}
              error={Boolean(errors.ingredient)}
              helperText={errors.ingredient && "This ingredient is required *"}
              {...register("ingredient", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --package-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <TextField
              id="package"
              label="Packaging"
              type="number"
              // value={package2}
              // onChange={(value) => setPackage2(value)}
              error={Boolean(errors.package)}
              helperText={errors.package && "This package is required *"}
              {...register("package", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --category-- */}
          <Grid
            sx={{
              "& .MuiInputBase-root": {
                color: `${currentMode === "Light" ? "#000" : "#fff"}`,
                borderColor: `${currentMode === "Light" ? "#000" : "#fff"}`,
              },
            }}
            item
            xs={12}
            md={6}
          >
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Categories</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Categories"
                onChange={(e) => setCategory(e.target.value)}
                error={Boolean(errors.category)}
                helperText={errors.category && "This categories is required *"}
              >
                {categories?.map((category, index) => (
                  <MenuItem key={index} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <div className="flex justify-end">
            <button
              type="submit"
              style={{ backgroundColor: currentColor }}
              className="rounded drop-shadow-sm bg-primary mx-3 w-24 p-2 text-base font-semibold text-white outline-none"
            >
              Create
            </button>
            <button
              onClick={handleModalCloseTwo}
              className="w-24 p-2 rounded-md font-semibold text-white bg-red-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </Box>
  );
};

export default AddFoodItem;
