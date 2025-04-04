import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { signup } from "../../redux/Actions";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [status, setStatus] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },

  } = useForm({ mode: "onChange" })

  const dispatch = useDispatch();
  const navigate=useNavigate()

  const onSubmit = (data) => {
    console.log("Form Data:", data);
     dispatch(signup({username:data.username,email:data.email,password:data.password},navigate))
     setStatus('successfully Registered')
  };
  // const [emailError, setEmailError] = useState("");

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });

  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailPattern.test(formData.email) || formData.email=="") {
  //     setEmailError("Invalid email format");
  //   } else {
  //     setEmailError("");
  //   }
  // };
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   dispatch(signup({username:formData.username,email:formData.email,password:formData.password},navigate))
  //   alert("successfully Registered. Please login")
  //   // Implement user registration logic here
  // };



  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Username"
        fullWidth
        margin="normal"
        {...register("username", { required: "Username is required" })}
        error={!!errors.username}
        helperText={errors.username?.message}
      />

      <TextField
        label="Email"
        type="email"
        fullWidth
        margin="normal"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email address",
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        {...register("password", { required: "Password is required" })}
        error={!!errors.password}
        helperText={errors.password?.message}
      />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!isValid}
          >
            Register
          </Button>
          {
  status!==''?<Typography color="success.main" sx={{ mt: 2, textAlign: "center" }}>
  {status}
</Typography>:''
          }
        

            <Link to="/Login" style={{ display: "block", textAlign: "center", marginTop: "10px", textDecoration: "none", color: "blue" }}>
  Already have an account? Login here
</Link>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;