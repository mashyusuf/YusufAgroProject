import { Link, useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import useAuth from '../../hooks/useAuth'
import axios from 'axios'
import toast from 'react-hot-toast'
import { TbFidgetSpinner } from 'react-icons/tb'
import signupImg from '../../assets/signup.gif'
const SignUp = () => {
  const navigate = useNavigate()
  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth()

  const handleSubmit = async e => {
    e.preventDefault()
    const form = e.target
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value
    const image = form.image.files[0]
    const formData = new FormData()
    formData.append('image', image)

    try {
      setLoading(true)
      // 1. Upload image and get image url
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData
      )
      console.log(data.data.display_url)

      //2. User Registration
      const result = await createUser(email, password)
      console.log(result)

      // 3. Save username and photo in firebase
      await updateUserProfile(name, data.data.display_url)
      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()

      navigate('/')
      toast.success('Signup Successful')
    } catch (err) {
      console.log(err)
      toast.error(err.message)
    }
  }

  return (
    <div >
      <img src={signupImg} className='w-full h-60' alt="" />
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-r  from-green-400 to-blue-200">
      <div className="flex flex-col max-w-md p-8 rounded-lg shadow-lg bg-white mt-10 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold text-purple-700">Sign Up</h1>
          <p className="text-sm text-gray-600">Welcome to StayVista</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Your Name Here"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-500 bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="image" className="block mb-2 text-sm font-medium text-gray-700">Select Image</label>
              <input
                required
                type="file"
                id="image"
                name="image"
                accept="image/*"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-500 bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-500 bg-gray-50 text-gray-900"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
              </div>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                id="password"
                required
                placeholder="*******"
                className="w-full px-4 py-2 border rounded-md border-gray-300 focus:ring-2 focus:ring-purple-500 bg-gray-50 text-gray-900"
              />
            </div>
          </div>
          <div>
            <button
              disabled={loading}
              type="submit"
              className="w-full px-4 py-2 text-white bg-gradient-to-r from-green-500 to-blue-200 rounded-md shadow-md  focus:outline-none focus:ring-2  focus:ring-offset-1"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
          <p className="px-3 text-sm text-gray-600">Signup with social accounts</p>
          <div className="flex-1 h-px sm:w-16 bg-gray-300"></div>
        </div>
        <button
          disabled={loading}
          onClick={handleGoogleSignIn}
          className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-2 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100"
        >
          <FcGoogle size={32} />
          <p>Continue with Google</p>
        </button>
        <p className="px-6 text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="hover:underline text-purple-600 font-bold"
          >
            Login
          </Link>
          .
        </p>
      </div>
    </div>
    </div>
  )
}

export default SignUp
