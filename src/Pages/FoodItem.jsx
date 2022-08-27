import { Container, Modal } from "@mui/material";
import { useState } from "react";
import FoodCategory from "../Components/FoodItem/FoodCategory";
import AddCategory from "../Components/Modals/AddCategory";
import AddFoodItem from "../Components/Modals/AddFoodItem";
import PageTitle from "../Components/PageTitle/PageTitle";
import { useQuery } from "@tanstack/react-query";
import myAxios from "../utils/myAxios";

const FoodItem = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openModalTwo, setOpenModalTwo] = useState(false);

  const handleModalOpen = (e) => {
    setOpenModal(true);
  };
  const handleModalClose = (e) => {
    setOpenModal(false);
  };
  const handleModalOpenTwo = (e) => {
    setOpenModalTwo(true);
  };
  const handleModalCloseTwo = (e) => {
    setOpenModalTwo(false);
  };

  const { data: categories = [], refetch: categoryRefetch } = useQuery(
    ["category"],
    async () => {
      const res = await myAxios("/category/");
      return res.data;
    }
  );

  const { data: foods = [], refetch: foodRefetch } = useQuery(
    ["food"],
    async () => {
      const res = await myAxios("/food/");
      return res.data;
    }
  );
  console.log(foods);
  return (
    <Container>
      <Modal open={openModal} onClose={handleModalClose}>
        <AddCategory
          categoryRefetch={categoryRefetch}
          handleModalClose={handleModalClose}
        />
      </Modal>
      <Modal open={openModalTwo} onClose={handleModalCloseTwo}>
        <AddFoodItem
          foodRefetch={foodRefetch}
          handleModalCloseTwo={handleModalCloseTwo}
          categories={categories}
        />
      </Modal>
      <PageTitle
        headingText="Food Item"
        pageName="food"
        buttonText="Add Categories"
        buttonTextTwo="Add Food Item"
        modalOpen={handleModalOpen}
        modalOpenTwo={handleModalOpenTwo}
      />
      <FoodCategory foods={foods} categories={categories} />
    </Container>
  );
};

export default FoodItem;
