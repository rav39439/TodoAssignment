import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { signup } from "../../redux/Actioins";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [emailError, setEmailError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email) || formData.email=="") {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup({username:formData.username,email:formData.email,password:formData.password},navigate))
    alert("successfully Registered. Please login")
    // Implement user registration logic here
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Register
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Username"
              name="username"
              fullWidth
              margin="normal"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              fullWidth
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              required
              error={!!emailError} // Shows error state
      helperText={emailError} // Displays error message
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              fullWidth
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}    disabled={emailError !== ""} // Disable when there's an error
            >
              Register
            </Button>

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