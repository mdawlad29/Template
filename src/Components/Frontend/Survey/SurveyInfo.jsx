import {
  Autocomplete,
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import myAxios from "../../../utils/myAxios";

const SurveyInfo = () => {
  const [taste, setTaste] = useState(null);
  const [environment, setEnvironment] = useState(null);
  const [cleanliness, setCleanliness] = useState(null);
  const [service, setService] = useState(null);
  const [singer, setSinger] = useState(null);
  const [overall, setOverall] = useState(null);
  const [visit, setVisit] = useState(null);
  const [source, setSource] = useState();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const payload = {
      order_id: data?.orderId,
      phone_number: data?.phoneNumber,
      email: data?.email,
      taste: Number(taste),
      environment: Number(environment),
      cleanliness: Number(cleanliness),
      service: Number(service),
      singer: Number(singer),
      overall: Number(overall),
      first_visit: Boolean(visit),
      source: source,
      used: Boolean(data?.message),
    };

    const response = await myAxios.post("/survey/", payload);
    if (response.status === 201) {
      reset();
      setTaste(null);
      setEnvironment(null);
      setCleanliness(null);
      setService(null);
      setSinger(null);
      setOverall(null);
      setVisit(null);
      setSource(null);
    }
  };

  return (
    <Box>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="lg:max-w-4xl lg:m-auto mx-4 py-20"
      >
        <Box className="space-y-3">
          <Typography sx={{ textTransform: "capitalize" }} variant="h5">
            one minute survey
          </Typography>
          {/* --order ID-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="orderId"
              label="Order ID"
              type="number"
              error={Boolean(errors.orderId)}
              helperText={errors.orderId && "This order ID is required *"}
              {...register("orderId", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --phone-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="phoneNumber"
              label="Type your phone number"
              type="number"
              error={Boolean(errors.phoneNumber)}
              helperText={
                errors.phoneNumber && "This phone number is required *"
              }
              {...register("phoneNumber", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --email-- */}
          <Grid item xs={12} md={6}>
            <TextField
              id="email"
              label="Email"
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email && "This email is required *"}
              {...register("email", { required: true })}
              fullWidth
            />
          </Grid>
          {/* --taste-- */}
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Taste*
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={taste}
                onChange={(e) => setTaste(e.target.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Poor"
                  value={0}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Ok"
                  value={1}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Average"
                  value={2}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Good"
                  value={3}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Better"
                  value={4}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Best"
                  value={5}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* --environment-- */}
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Environment*
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Poor"
                  value={0}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Ok"
                  value={1}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Average"
                  value={2}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Good"
                  value={3}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Better"
                  value={4}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Best"
                  value={5}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* --cleanliness-- */}
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Cleanliness*
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={cleanliness}
                onChange={(e) => setCleanliness(e.target.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Poor"
                  value={0}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Ok"
                  value={1}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Average"
                  value={2}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Good"
                  value={3}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Better"
                  value={4}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Best"
                  value={5}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* --service-- */}
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Service*
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={service}
                onChange={(e) => setService(e.target.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Poor"
                  value={0}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Ok"
                  value={1}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Average"
                  value={2}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Good"
                  value={3}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Better"
                  value={4}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Best"
                  value={5}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* --singer-- */}
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Singer*
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={singer}
                onChange={(e) => setSinger(e.target.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Poor"
                  value={0}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Ok"
                  value={1}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Average"
                  value={2}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Good"
                  value={3}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Better"
                  value={4}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Best"
                  value={5}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* --overAll-- */}
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                Overall*
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={overall}
                onChange={(e) => setOverall(e.target.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Poor"
                  value={0}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Ok"
                  value={1}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Average"
                  value={2}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Good"
                  value={3}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Better"
                  value={4}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Best"
                  value={5}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* --visit-- */}
          <Grid item xs={12} md={6}>
            <FormControl>
              <FormLabel id="demo-controlled-radio-buttons-group">
                First Visit*
              </FormLabel>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                value={visit}
                onChange={(e) => setVisit(e.target.value)}
              >
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="Yes"
                  value={true}
                />
                <FormControlLabel
                  control={
                    <Radio
                      style={{
                        color: "#FFC446",
                      }}
                    />
                  }
                  label="No"
                  value={false}
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          {/* --question-- */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={data}
              getOptionLabel={(option) => option?.label}
              onChange={(_, newValue) => setSource(newValue.value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Where did you here about us?"
                  fullWidth
                />
              )}
            />
          </Grid>
          <Typography variant="h6">Opinion/Suggestion</Typography>
          {/* --message-- */}
          <Grid item xs={12} md={6}>
            <TextareaAutosize
              aria-label="minimum height"
              minRows={10}
              placeholder="Write your opinion/suggestion"
              style={{
                width: "100%",
                border: "1px solid #ccc",
                borderRadius: "5px",
                padding: "12px",
              }}
              {...register("message")}
            />
          </Grid>
          <Button
            type="submit"
            variant="outlined"
            sx={{
              ":hover": {
                borderColor: "#FFC446",
              },
              width: "100%",
              height: { md: 35, xs: 50 },
              backgroundColor: "#FFC446",
              borderColor: "#FFC446",
              color: "#000",
              borderRadius: "20px",
              fontSize: { xs: 17, md: 14 },
            }}
          >
            submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SurveyInfo;
const data = [
  { label: "Social Media", value: "social_media" },
  { label: "Website", value: "website" },
  { label: "Search Engine", value: "search_engine" },
  { label: "Friend or Family", value: "friend_or_family" },
  { label: "Other", value: "other" },
];
