import React from 'react'
import { useForm } from 'react-hook-form'
import { TextInput } from '../Componenets/TextInput.jsx'
import { useRegisterUserMutation } from '../Apis/userApi.js';
import { useDispatch } from 'react-redux';
import { setUserData } from '../Store/userSlice.js';
import { useNavigate } from 'react-router-dom';
function Signup() {
    const {
        register,           // connect inputs to the form
        handleSubmit,       // handle form submission
        formState: { errors } // validation errors
    } = useForm();
    // Mutation hook for registering the user
    const [registerUser, { isLoading, isError, error }] = useRegisterUserMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handle=async(data)=>{
       const res= registerUser(data).unwrap()
         if(res.statuscode){
          dispatch(setUserData(res.data));
          // If registration is successful, navigate to the home page
          navigate('/home');
         }
         else{
          // If registration fails, log the error
          console.error("Registration failed:", res.message);
         }
    }
  return (
    <form onSubmit={handleSubmit(handle)}>
       <TextInput
        label="Name"   
        {...register("username", { required: "Name is required" })} 
        placeholder="Enter your name"
      />
        {errors.name && <p>{errors.name.message}</p>}
    
        {/* Email Field */} 
        <TextInput label='Email'
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
            value: 6,
            message: "Password must be at least 6 characters long"
          }
        })}
        placeholder="Enter your password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <TextInput  label="fullname"
        {...register("fullname", { required: "Full name is required" })}    
        placeholder="Enter your full name"
        />   
        {errors.fullname && <p>{errors.fullname.message}</p>}

        <TextInput type="file"
        label="coverimage"
        {...register("coverimage", { required: "Cover image is required" })}
        placeholder="Upload your cover image"
        />
        {errors.coverimage && <p>{errors.coverimage.message}</p>}

        <TextInput type="file"
        label="avatar"
        {...register("avatar", { required: "Avatar is required" })} 
        placeholder="Upload your avatar"
        />
        {errors.avatar && <p>{errors.avatar.message}</p>}
        <button type="submit" className="mt-4 w-full rounded-xl bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-600 transition-all duration-200">
          Sign Up 
        </button>


    </form>
  )
}

export default Signup
