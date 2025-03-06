import React, { useState,useRef } from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../../redux/Actioins";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Login = (props) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const formRef = useRef(null);

  const handleChange = (e) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email) || formData.email=="") {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData)
    if (formRef.current) {
      setIsValid(formRef.current.checkValidity());
    }
  };
  const navigate=useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Login Data:", formData);
    dispatch(login({email:formData.email,password:formData.password},navigate))
    console.log(props.currentMessage)
    if( props.currentMessage!==null){
      alert(props.currentMessage.data.message)
    }
    
    // Implement authentication logic here
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Login
          </Typography>
          <form ref={formRef} onSubmit={handleSubmit}>
            <TextField
              label="Email"
              name="email"
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
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}
              disabled={emailError !== ""} // Disable when there's an error

            
            >
              Login
            </Button>

            <Link to="/Register" style={{ display: "block", textAlign: "center", marginTop: "10px", textDecoration: "none", color: "blue" }}>
   Sign up
</Link>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;