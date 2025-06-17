import React, { use, useEffect } from 'react';
import { useLoginUserMutation } from '../Apis/userApi.js';
import { set, useForm } from 'react-hook-form';
import { TextInput } from '../Componenets/TextInput.jsx';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../Store/userSlice.js';
import { useGetUserProfileQuery } from '../Apis/userApi.js';
const LoginForm = () => {
  const {
    register,           // connect inputs to the form
    handleSubmit,       // handle form submission
    formState: { errors } // validation errors
  } = useForm();
  // Mutation hook for logging in the user
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const { data: userProfile, isLoading: isUserProfileLoading, error: userProfileError } = useGetUserProfileQuery();
  const navigate = useNavigate();
  
  const dispatch = useDispatch();
  useEffect(()=>{
    if(userProfile){
      dispatch(setUserData(userProfile.data));
      navigate('/home');
    }
  })
   

  const onSubmit = async(data) => {
    const res= await loginUser(data).unwrap();
    if(res.statuscode){
        console.log("Login successful:jjjjjjjjjjjjjjjjjjjjjjjjjj", res.data);
        dispatch(setUserData(res.data));
        // If login is successful, navigate to the home page
        navigate('/home');
    }
    else{
      // If login fails, log the error
      console.error("Login failed:", res.message);
    }
  };


  
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Name Field */}
      <TextInput
        label="Name"
        {...register("username", { required: "Name is required" })}
        placeholder="Enter your name"
      />
      {errors.name && <p>{errors.name.message}</p>}

      {/* Email Field */}
      <TextInput
        label="Email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address"
          }
        })}
        placeholder="Enter your email"
      />
      {errors.email && <p>{errors.email.message}</p>}
      <TextInput
        label="Password"
        type="password"
        {...register("password", {
          required: "Password is required",
          minLength: {
            value: 2,
            message: "Password must be at least 6 characters"
          }
        })}
        placeholder="Enter your password"/>
      {errors.password && <p>{errors.password.message}</p>}

      {/* Submit Button */}
      <button type="submit" className="mt-4 w-full rounded-xl bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 transition-all duration-200">
          Login 
        </button>

    </form>
  );
 
 
};

export default LoginForm;
