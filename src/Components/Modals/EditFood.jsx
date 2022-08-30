import { Box } from "@mui/system";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { useStateContext } from "../../Contexts/ContextProvider";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { Button, Grid, InputAdornment, Modal } from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import myAxios from "../../utils/myAxios";

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

const EditFood = ({ editId, handleModalClose, foodRefetch }) => {
  console.log(editId);
  const { currentColor, currentMode } = useStateContext();
  const [variants, setVariants] = useState(1);
  const { register, handleSubmit, setValue } = useForm();
  const queryClient = useQueryClient();

  const onSubmit = async (data) => {
    const price = {};

    data.item?.forEach((item) => {
      price[item.title] = item.price;
    });

    console.log(price);

    const payloadForm = {
      food_name: data?.foodName,
      food_detail: data?.detail,
      price: JSON.stringify(price),
      image: data?.image[0],
      base_ingredient: data?.ingredient,
      taste: data?.taste,
      packaging: data?.package,
    };

    console.log(payloadForm);

    const response = await toast.promise(
      myAxios.patch(`/food/${editId}/`, payloadForm, {
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
    handleModalClose();
  };

  const { data } = useQuery([`food`], () => myAxios(`/food/${editId}`), {
    onSuccess: ({ data: foodData = [] }) => {
      console.log(foodData);
      foodData.map((data) => {
        setValue("foodName", data?.food_name);
        setValue("ingredient", data?.base_ingredient);
        setValue("detail", data?.food_detail);
        setValue("taste", data?.taste);
        setValue("package", data?.packaging);
      });
    },
  });
  console.log(data);
  return (
    <Modal open={Boolean(editId)} onClose={handleModalClose}>
      <Box sx={{ ...style, width: 600, height: 500, overflowY: "scroll" }}>
        <h2 className="text-3xl font-bold pb-3 text-center">Edit Food Item</h2>
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
              {new Array(variants).fill(null).map((item, index) => {
                return (
                  <Box
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
                      {...register(`item.${index + 1}.price`)}
                      fullWidth
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
                InputLabelProps={{ shrink: true }}
                {...register("ingredient")}
                fullWidth
              />
            </Grid>
            {/* --detail-- */}
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
                id="detail"
                label="Details"
                type="text"
                InputLabelProps={{ shrink: true }}
                {...register("detail")}
                fullWidth
              />
            </Grid>
            {/* --test-- */}
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
                id="taste"
                label="Taste"
                type="text"
                InputLabelProps={{ shrink: true }}
                {...register("taste")}
                fullWidth
              />
            </Grid>
            {/* --review-- */}
            {/* <Grid
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
                id="review"
                label="review"
                type="number"
                InputLabelProps={{ shrink: true }}
                {...register("review")}
                fullWidth
              />
            </Grid> */}
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
                InputLabelProps={{ shrink: true }}
                {...register("package")}
                fullWidth
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
    </Modal>
  );
};

export default EditFood;