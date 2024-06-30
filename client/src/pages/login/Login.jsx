import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { TbFidgetSpinner } from 'react-icons/tb'
import { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import toast from 'react-hot-toast'
import loginImg from '../../assets/login.gif'
import logo from '../../assets/Black and Green Flat Illustrated Organic Cosmetics Logo.gif'
const Login = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location?.state || '/'
  const { signInWithGoogle, signIn, loading, setLoading, resetPassword } =
    useAuth()
  const [email, setEmail] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const email = form.email.value
    const password = form.password.value

    try {
      setLoading(true)
      // 1. sign in user
      await signIn(email, password)
      navigate(from)
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
  }

  const handleResetPassword = async () => {
    if (!email) return toast.error('Please write your email first!')
    try {
      await resetPassword(email)
      toast.success('Request Success! Check your email for further process...')
      setLoading(false)
    } catch (err) {
      console.log(err)
      toast.error(err.message)
      setLoading(false)
    }
    console.log(email)
  }

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()

      navigate(from)
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <div>
      <img src={loginImg} className='w-full h-60 ' alt="" />
      <div className='flex justify-center items-center  min-h-screen bg-gradient-to-r from-blue-200 via-blue-300 to-blue-400'>
      <div className='flex flex-col max-w-md p-6 rounded-lg mt-10 shadow-lg bg-white text-gray-900 '>
        <div className='mb-2 text-center '>
          <h1 className='my-3 text-4xl font-bold text-blue-600'>Log In</h1>
          <h1 className='font-bold text-slate-400 mb-4'>Well Come To Our YUSUF AGRO</h1>
        </div>
        <div className='max-w-7xl mx-auto'>
        <img src={logo} className='w-20 rounded-xl ' alt="" />
        </div>
        
        <form
          onSubmit={handleSubmit}
          className='space-y-6 ng-untouched ng-pristine ng-valid  '
        >
          <div className='space-y-4'>
            <div>
              <label htmlFor='email' className='block mb-2 text-sm text-gray-600'>
                Email address
              </label>
              <input
                type='email'
                name='email'
                onBlur={e => setEmail(e.target.value)}
                id='email'
                required
                placeholder='Enter Your Email Here'
                className='w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900'
                data-temp-mail-org='0'
              />
            </div>
            <div>
              <div className='flex justify-between'>
                <label htmlFor='password' className='text-sm mb-2 text-gray-600'>
                  Password
                </label>
              </div>
              <input
                type='password'
                name='password'
                autoComplete='current-password'
                id='password'
                required
                placeholder='*******'
                className='w-full px-4 py-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900'
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type='submit'
              className='bg-blue-500 w-full rounded-md py-3 text-white font-semibold hover:bg-blue-600 transition-all'
            >
              {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Sign In'
              )}
            </button>
          </div>
        </form>
        <div className='space-y-1'>
          <button
            onClick={handleResetPassword}
            className='text-xs hover:underline hover:text-blue-500 text-gray-400'
          >
            Forgot password?
          </button>
        </div>
        <div className='flex items-center pt-4 space-x-1'>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
          <p className='px-3 text-sm text-gray-500'>
            Login with social accounts
          </p>
          <div className='flex-1 h-px sm:w-16 bg-gray-300'></div>
        </div>

        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className='disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition-all'
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>

        <p className='px-6 text-sm text-center text-gray-500'>
          Don&apos;t have an account yet?{' '}
          <Link
            to='/signup'
            className='hover:underline hover:text-blue-500 text-blue-600 font-semibold'
          >
            Sign up
          </Link>
          .
        </p>
      </div>
    </div>
    </div>
  )
}

export default Login
