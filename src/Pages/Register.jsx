import React, { use } from 'react';
import animation from '../../public/login-animation.json'
import Lottie from 'lottie-react';
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdAddPhotoAlternate } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router';
import 'animate.css';
import { Helmet } from 'react-helmet';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';


const Register = () => {
    const { updateUserInfo, createUser, setUser } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const displayName = form.name.value;
        const photoURL = form.photoURL.value;

        const userInfo = {
            displayName,
            photoURL
        }

        createUser(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    updateUserInfo(userInfo).then(() => {
                        setUser({ ...user, displayName: displayName, photoURL: photoURL });
                        
                    }).catch((error) => {
                        (error.message)
                    });
                    navigate(location.state || '/')
                        .then(() => {
                            setUser(user)
                            Swal.fire({
                                title: "Registered Successful!",
                                text: ` ${displayName || 'User'}!`,
                                icon: "success",
                                confirmButtonText: "Continue"
                            })
                        })
                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Register Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            })

    }
    return (
        <div className='min-h-screen flex justify-center items-center bg-red-100'>
            <Helmet>
                <title>Register | Buy&Bulk</title>
                <meta name="description" content="Create an account on Buy&Bulk to access exclusive bulk buying and selling opportunities." />
            </Helmet>
            <div className='animate__animated animate__fadeInRight w-8/12 flex flex-row-reverse h-full my-5 lg:h-[calc(100vh-200px)] mx-auto rounded-2xl bg-white border border-[#FF3F33] shadow-2xl shadow-red-400'>
                <div className='w-full lg:w-1/2 px-6 pb-20 pt-10 bg-base-200 rounded-2xl lg:rounded-r-2xl'>
                    <div className='text-center mb-4'>
                        <h3 className='text-3xl pb-2 font-bold text-[#FF3F33]'>Let’s Get You Started</h3>
                        <p className='text-sm  text-gray-400 '>Sign up and access endless bulk opportunities.</p>
                    </div>

                    <form
                        onSubmit={handleRegister}
                        className="fieldset my-auto">

                        <div className="relative group mb-2">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-[#FF3F33] transition-colors duration-200">
                                <FaUser size={20} />

                            </span>
                            <input
                                type="text"
                                name="name"
                                required
                                placeholder="Your Name"
                                className="w-full pl-10 py-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-red-300 placeholder:text-gray-500"
                            />
                        </div>
                        <div className="relative group mb-2">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-[#FF3F33] transition-colors duration-200">
                                <IoMail size={20} />
                            </span>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Email"
                                className="w-full pl-10 py-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-red-300 placeholder:text-gray-500"
                            />
                        </div>
                        <div className="relative group mb-2">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-[#FF3F33] transition-colors duration-200">
                                <MdAddPhotoAlternate size={20} />
                            </span>
                            <input
                                type="url"
                                name="photoURL"
                                required
                                placeholder="Photo URL"
                                className="w-full pl-10 py-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-red-300 placeholder:text-gray-500"
                            />
                        </div>
                        <div className="relative group mb-2">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 group-focus-within:text-[#FF3F33] transition-colors duration-200">
                                <RiLockPasswordFill size={20} />

                            </span>
                            <input
                                type="password"
                                name="password"
                                required
                                placeholder="Password"
                                className="w-full pl-10 py-3 text-lg rounded-md border border-gray-300 focus:outline-none focus:border-[#FF3F33] focus:ring-2 focus:ring-red-300 placeholder:text-gray-500"
                            />
                        </div>

                        <input type='submit' value='Register' className="btn bg-[#FF3F33] hover:bg-red-500 transition-transform transform hover:scale-103 text-white mt-4"></input>
                    </form>
                    <div className='text-center'>
                        <p className='text-sm pt-3 text-gray-500'>Already have an account? <Link className='text-[#FF3F33] font-semibold' to={'/login'}>Login</Link></p>
                    </div>

                </div>
                <div className='hidden lg:block'>
                    <Lottie animationData={animation} style={{ paddingRight: '40px', paddingTop: '28px' }}></Lottie>
                </div>
            </div>
        </div>
    );
};

export default Register;