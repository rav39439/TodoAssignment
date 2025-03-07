import {React,useState,useEffect}  from "react";
import { TextField, Button, Card, CardContent, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../../redux/Actioins";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const Login = (props) => {
  const dispatch = useDispatch();
  const [errormessage, seterrormessage] = useState("");
  const {
    register,
    watch,
    clearErrors,

    handleSubmit,
    formState: { errors, isValid },

  } = useForm({ mode: "onChange" })

  const name = watch("name");
  const password = watch("password");

  useEffect(() => {
    if (errors.message) {
      clearErrors("message"); // Clear error message when name or password changes
    }
  }, [name, password, clearErrors, errors]);
  
  // const handleChange = (e) => {
  //   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   if (!emailPattern.test(formData.email) || formData.email=="") {
  //     setEmailError("Invalid email format");
  //   } else {
  //     setEmailError("");
  //   }
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  //   if (formRef.current) {
  //     setIsValid(formRef.current.checkValidity());
  //   }
  // };
  const navigate=useNavigate()

  // const handleSubmit = (e) => {
  //   e.preventDefault();
    
  //   dispatch(login({email:formData.email,password:formData.password},navigate))
  //   if( props.currentMessage!==null){
  //     alert(props.currentMessage.data.message)
  //   }
    
  //   // Implement authentication logic here
  // };

  const onSubmit = (data) => {
    
      dispatch(login({email:data.email,password:data.password},navigate))
    if( props.currentMessage!==null){
      seterrormessage(props.currentMessage.data.message)
    }
    
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Card sx={{ maxWidth: 400, padding: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" textAlign="center" gutterBottom>
            Login
          </Typography>
<form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
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
        Login
      </Button>

      {
        errormessage!==''?<Typography color="error.main" sx={{ mt: 2, textAlign: "center" }}>
        {errormessage}
      </Typography>
        :''
      }
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