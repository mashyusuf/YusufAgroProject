import { Link, useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { AiFillLock, AiOutlineMail, AiOutlineUser, AiOutlineFileImage } from 'react-icons/ai';
import { GiFarmer, GiWheat } from 'react-icons/gi';
import useAuth from '../../hooks/useAuth';
import axios from 'axios';
import toast from 'react-hot-toast';
import { TbFidgetSpinner } from 'react-icons/tb';
import umm from '../../assets/umm.jpg';

const SignUp = () => {
  const navigate = useNavigate();
  const {
    createUser,
    signInWithGoogle,
    updateUserProfile,
    loading,
    setLoading,
  } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const image = form.image.files[0];
    const formData = new FormData();
    formData.append('image', image);

    try {
      setLoading(true);
      // 1. Upload image and get image url
      const { data } = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        formData
      );
      console.log(data.data.display_url);

      // 2. User Registration
      const result = await createUser(email, password);
      console.log(result);

      // 3. Save username and photo in firebase
      await updateUserProfile(name, data.data.display_url);
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  // handle google signin
  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      await signInWithGoogle();
      navigate('/');
      toast.success('Signup Successful');
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-200 flex flex-col justify-center items-center px-4 py-6 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-10 p-8 rounded-lg shadow-lg bg-white mt-10 w-full max-w-4xl">
        <div className="flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-green-800">Sign Up</h1>
            <Link to={'/'}><p className="text-xl font-bold text-gray-700">Welcome to Yusuf's Agro</p></Link>
            <p className="text-lg text-gray-600">Join us in growing a greener future!</p>
            <GiFarmer className="text-green-600 mx-auto mt-4" size={48} />
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="name" className="block mb-2 text-lg font-bold text-gray-700">
                  Name
                </label>
                <div className="flex items-center">
                  <AiOutlineUser className="absolute left-2 text-gray-500" size={24} />
                  <input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Enter Your Name Here"
                    className="w-full pl-10 px-4 py-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900 text-lg font-bold"
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="image" className="block mb-2 text-lg font-bold text-gray-700">
                  Select Image
                </label>
                <div className="flex items-center">
                  <AiOutlineFileImage className="absolute left-2 text-gray-500" size={24} />
                  <input
                    required
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    className="w-full pl-10 px-4 py-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900 text-lg font-bold"
                  />
                </div>
              </div>
              <div className="relative">
                <label htmlFor="email" className="block mb-2 text-lg font-bold text-gray-700">
                  Email address
                </label>
                <div className="flex items-center">
                  <AiOutlineMail className="absolute left-2 text-gray-500" size={24} />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Enter Your Email Here"
                    className="w-full pl-10 px-4 py-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900 text-lg font-bold"
                  />
                </div>
              </div>
              <div className="relative">
                <div className="flex justify-between">
                  <label htmlFor="password" className="text-lg font-bold text-gray-700">
                    Password
                  </label>
                </div>
                <div className="flex items-center">
                  <AiFillLock className="absolute left-2 text-gray-500" size={24} />
                  <input
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    id="password"
                    required
                    placeholder="*******"
                    className="w-full pl-10 px-4 py-3 border rounded-md border-gray-300 focus:ring-2 focus:ring-green-500 bg-gray-50 text-gray-900 text-lg font-bold"
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                disabled={loading}
                type="submit"
                className="w-full px-4 py-3 text-white bg-gradient-to-r from-green-500 to-blue-500 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-offset-1 hover:from-green-600 hover:to-blue-600 transition duration-300"
              >
                {loading ? <TbFidgetSpinner className="animate-spin m-auto" size={24} /> : 'Continue'}
              </button>
            </div>
          </form>
          <div className="flex items-center pt-6 space-x-2">
            <div className="flex-1 h-px bg-gray-300"></div>
            <p className="px-3 text-lg text-gray-600">Signup with social accounts</p>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>
          <button
            disabled={loading}
            onClick={handleGoogleSignIn}
            className="disabled:cursor-not-allowed flex justify-center items-center space-x-2 border m-3 p-3 border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 transition duration-300"
          >
            <FcGoogle size={32} />
            <p className="text-lg font-bold text-gray-700">Continue with Google</p>
          </button>
          <p className="px-6 text-lg text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="hover:underline text-green-700 font-bold">
              Login
            </Link>
            .
          </p>
        </div>
        <div className="flex justify-center items-center">
          <img src={umm} className="w-full h-auto rounded-lg object-cover" alt="Signup" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
