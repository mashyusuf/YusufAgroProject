import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { TbFidgetSpinner } from 'react-icons/tb';
import { FaLock } from 'react-icons/fa';
import { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import toast from 'react-hot-toast';
import loginImg from '../../assets/login.gif';
import logo from '../../assets/Black and Green Flat Illustrated Organic Cosmetics Logo.gif';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state || '/';
  const { signInWithGoogle, signIn, loading, setLoading, resetPassword } = useAuth();
  const [email, setEmail] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      setLoading(true);
      await signIn(email, password);
      navigate(from);
      toast.success('Login Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) return toast.error('Please write your email first!');
    try {
      await resetPassword(email);
      toast.success('Request Success! Check your email for further process...');
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error(err.message);
      setLoading(false);
    }
    console.log(email);
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate(from);
      toast.success('Login Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl w-full'>
        <div className='relative flex flex-col justify-center items-center bg-gradient-to-br from-yellow-400 to-yellow-600 text-white p-8'>
          <img src={logo} className='w-24 mb-4' alt="Logo" />
          <h1 className='text-3xl font-bold mb-4'>Welcome Back</h1>
          <p className='text-lg mb-6'>Manage your shop efficiently with our platform</p>
         
        </div>
        <div className='p-8'>
          <h1 className='text-4xl font-bold text-gray-800 mb-6'>Log In</h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div>
              <label htmlFor='email' className='block text-lg font-semibold text-gray-700'>
                Email Address
              </label>
              <input
                type='email'
                name='email'
                onBlur={e => setEmail(e.target.value)}
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-100 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <label htmlFor='password' className='block text-lg font-semibold text-gray-700'>
                Password
              </label>
              <div className='relative'>
                <input
                  type='password'
                  name='password'
                  autoComplete='current-password'
                  id='password'
                  required
                  placeholder='Enter Your Password'
                  className='w-full px-4 py-3 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-gray-100 text-gray-900'
                />
                <FaLock className='absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500' size={20} />
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                type='submit'
                className='bg-yellow-500 w-full rounded-md py-3 text-white font-bold hover:bg-yellow-600 transition-all flex items-center justify-center'
              >
                {loading ? <TbFidgetSpinner className='animate-spin mr-2' /> : 'Sign In'}
              </button>
            </div>
          </form>
          <div className='text-center py-4'>
            <button
              onClick={handleResetPassword}
              className='text-xs hover:underline hover:text-yellow-600 text-gray-600'
            >
              Forgot password?
            </button>
          </div>
          <div className='flex items-center justify-center py-4 space-x-2'>
            <div className='flex-1 h-px bg-gray-300'></div>
            <p className='text-sm text-gray-500'>Or sign in with</p>
            <div className='flex-1 h-px bg-gray-300'></div>
          </div>
          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className='disabled:cursor-not-allowed w-full flex justify-center items-center space-x-2 border p-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-all'
          >
            <FcGoogle size={32} />
            <p className='font-semibold'>Continue with Google</p>
          </button>
          <p className='text-sm text-center text-gray-500 mt-4'>
            Don't have an account yet?{' '}
            <Link to='/signup' className='hover:underline hover:text-yellow-600 text-yellow-700 font-semibold'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
