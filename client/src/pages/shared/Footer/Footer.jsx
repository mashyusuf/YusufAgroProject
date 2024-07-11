import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import logo from '../../../assets/Black and Green Flat Illustrated Organic Cosmetics Logo.gif';

const Footer = () => {
    return (
        <div className="bg-gray-900 text-white">
            <footer className="footer p-10 flex flex-wrap justify-between items-start space-y-8 md:space-y-0">
                <aside className="w-full md:w-1/4 mb-8 md:mb-0 flex flex-col items-center md:items-start text-center md:text-left">
                    <div className="bg-white p-2 rounded-full">
                        <img src={logo} alt="Yusuf Agro Logo" className="w-32 rounded-full" />
                    </div>
                    <p className="mt-4">
                        <span className="text-2xl font-bold text-yellow-500">YUSUF AGRO</span>
                        <br />
                        <span className="text-lg font-semibold text-gray-400">Reliable agri-tech since 2022</span>
                    </p>
                </aside>
                <nav className="w-full md:w-1/5 mb-8 md:mb-0">
                    <h6 className="footer-title text-xl font-bold text-yellow-500 mb-4">Services</h6>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Farm Management</a>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Soil Analysis</a>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Crop Monitoring</a>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Agri Consulting</a>
                </nav>
                <nav className="w-full md:w-1/5 mb-8 md:mb-0">
                    <h6 className="footer-title text-xl font-bold text-yellow-500 mb-4">Company</h6>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">About Us</a>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Contact</a>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Careers</a>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Newsroom</a>
                </nav>
                <nav className="w-full md:w-1/5 mb-8 md:mb-0">
                    <h6 className="footer-title text-xl font-bold text-yellow-500 mb-4">Legal</h6>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Terms of Service</a>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Privacy Policy</a>
                    <a className="link link-hover block mb-2 text-gray-300 hover:text-yellow-400">Cookie Policy</a>
                </nav>
                <div className="w-full md:w-1/5">
                    <h6 className="footer-title text-xl font-bold text-yellow-500 mb-4">Follow Us</h6>
                    <div className="flex space-x-4 justify-center md:justify-start">
                        <a href="#" className="text-2xl text-gray-300 hover:text-yellow-400"><FaFacebook /></a>
                        <a href="#" className="text-2xl text-gray-300 hover:text-yellow-400"><FaTwitter /></a>
                        <a href="#" className="text-2xl text-gray-300 hover:text-yellow-400"><FaInstagram /></a>
                        <a href="#" className="text-2xl text-gray-300 hover:text-yellow-400"><FaLinkedin /></a>
                    </div>
                </div>
            </footer>
            <footer className="footer footer-center bg-gray-800 text-gray-300 p-4">
                <aside>
                    <p>&copy; {new Date().getFullYear()} - All rights reserved by Yusuf Agro</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;
