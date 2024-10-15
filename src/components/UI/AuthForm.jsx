import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup'; 
import { LoadingSpinner } from "../UI/LoadingSpinner";
import { LockIcon, Mail, User } from 'lucide-react';
import { AuthContext } from "../../store/auth-context";

const AuthForm = ({ signupMode, toggleHandler }) => {
const { login, signup } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      name: signupMode? Yup.string().required('Name is required').matches(/^[A-Za-z ]+$/, 'Name must only contain letters'): Yup.string(),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    }),
    onSubmit: async (values) => {
        setLoading(true);
        try {
          signupMode? signup(values.name, values.email): login('', values.email); 
          navigate("/");
          console.log(values)
        } 
        catch (err) {
          console.log(err);
        } 
        finally {
          setLoading(false);
        }
      }
  });

  const handleToggle = () => {
    toggleHandler();
    formik.resetForm();
  };

  const getButtonContent = () => {
    if(loading) return <LoadingSpinner size={6} />;
    return signupMode ? 'Sign Up' : 'Login';
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-lg mt-6 p-6 bg-gradient-to-br from-green-50 to-green-100 shadow-2xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-800">{signupMode ? 'Sign Up' : 'Login'}</h2>
      <p className="mt-2 text-center text-green-700">
        {signupMode ? (
          <span>
            Already have an account?{' '}
            <Link to="/login" className="text-green-600 hover:text-green-800 font-semibold" onClick={handleToggle}>
              Login
            </Link>
          </span>
        ) : (
          <span>
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:text-green-800 font-semibold" onClick={handleToggle}>
              Sign Up
            </Link>
          </span>
        )}
      </p>

      {formik.errors && formik.touched && (
        <div className="text-red-500 text-center m-4">
          {Object.keys(formik.errors).map((key, index) => (
            formik.touched[key] && <p key={index}>{formik.errors[key]}</p>
          ))}
        </div>
      )}

      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        {signupMode && (
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-green-700 mb-1">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
              <input name="name" type="text" placeholder="Enter your name" autoComplete="off" className="w-full pl-12 pr-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
            </div>
          </div>
        )}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-green-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <input name="email" type="email" placeholder="Email" autoComplete="off" className="w-full pl-12 pr-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-green-700 mb-1">Password</label>
          <div className="relative">
            <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-500" />
            <input name="password" type="password" placeholder="Password" autoComplete="off" className="w-full pl-12 pr-4 py-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} />
          </div>
        </div>
        {!signupMode && (
          <Link to="/" className="block text-sm font-semibold text-green-600 hover:text-green-800 text-center">
            Forgot Password?
          </Link>
        )}
        <button className="w-full py-3 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300 flex items-center justify-center" type="submit" disabled={loading}>
          {getButtonContent()}
        </button>
      </form>

      {signupMode && (
        <p className="mt-6 text-sm text-green-700 text-center">
          By Signing In, I accept the DailyDelish&apos;s{' '}
          <Link to="/" className="font-semibold text-green-600 hover:text-green-800">
            Terms & Conditions & Privacy Policy
          </Link>
        </p>
      )}
    </div>
  );
};

export default AuthForm;
