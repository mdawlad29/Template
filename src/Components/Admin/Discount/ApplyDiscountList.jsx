import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useStateContext } from "../../../Contexts/ContextProvider";
import { MdModeEdit } from "react-icons/md";
import moment from "moment";
import DeleteDiscount from "../../Modals/Admin/DeleteDiscount";
import EditDiscount from "../../Modals/Admin/EditDiscount";
import { Box, Typography } from "@mui/material";
import EditApplyDiscount from "../../Modals/Admin/EditApplyDiscount";
import DeleteApplyDiscount from "../../Modals/Admin/DeleteApplyDiscount";

const ApplyDiscountList = ({
  applyDiscount,
  applyRefetch,
  categories,
  foods,
}) => {
  const { currentColor, currentMode } = useStateContext();
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 130,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box sx={{ height: 60, overflow: "scroll" }}>
            {row?.category?.map((data) => (
              <Typography key={data.id}>{data.name}</Typography>
            ))}
          </Box>
        );
      },
    },
    {
      field: "food",
      headerName: "Food",
      width: 230,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <Box sx={{ height: 60, overflow: "scroll" }}>
            {row?.food?.map((data) => (
              <Typography key={data.id}>{data.food_name}</Typography>
            ))}
          </Box>
        );
      },
    },
    {
      field: "is_active",
      headerName: "Active",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <div
            className={`${
              params?.value === true
                ? "bg-green-200 text-green-900"
                : "bg-yellow-200 text-yellow-700"
            } px-5 rounded-md font-medium   `}
          >
            <p>{params?.value === true ? "true" : "false"}</p>
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return (
          <div className="flex gap-5 items-center">
            <MdModeEdit
              onClick={() => setEditId(row?.id)}
              className="text-gray-600 dark:text-neutral text-xl cursor-pointer"
            />
            <RiDeleteBin6Line
              onClick={() => setDeleteId(row?.id)}
              className="text-red-400 dark:text-neutral text-xl cursor-pointer"
            />
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 510, width: "100%" }}>
      <DataGrid
        sx={{
          color: currentMode === "Dark" ? "#fff" : "#000",
          "& .MuiIconButton-root": {
            color: "unset !important",
          },
          "& .MuiTablePagination-toolbar": {
            color: currentMode === "Dark" ? "#fff" : "#000",
          },
          "& .MuiDataGrid-row:hover": {
            bgcolor: currentMode === "Dark" ? `${currentColor}10` : "",
          },
          "& .MuiDataGrid-selectedRowCount": {
            visibility: "hidden",
          },
          "& .MuiDataGrid-cell:focus-within": {
            outline: "none",
          },
          "& .MuiInput-root": {
            color: currentMode === "Dark" ? "#fff" : "#000",
          },
        }}
        rows={applyDiscount}
        applyRefetch={applyRefetch}
        columns={columns}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
            printOptions: {
              disableToolbarButton: true,
            },
            csvOptions: {
              disableToolbarButton: true,
            },
          },
        }}
        // checkboxSelection
        // disableSelectionOnClick
      />
      {Boolean(editId) && (
        <EditApplyDiscount
          editId={editId}
          handleClose={() => setEditId(null)}
          categories={categories}
          foods={foods}
        />
      )}
      {Boolean(deleteId) && (
        <DeleteApplyDiscount
          deleteId={deleteId}
          handleClose={() => setDeleteId(null)}
        />
      )}
    </div>
  );
};

export default ApplyDiscountList;