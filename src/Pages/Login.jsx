import React, { use } from 'react';
import animation from '../../public/login-animation.json'
import Lottie from 'lottie-react';
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from 'react-router';
import 'animate.css';
import { Fade } from 'react-awesome-reveal';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';
import { Helmet } from 'react-helmet';


const Login = () => {

    const { signInWithGoogle, signInUser, setUser, } = use(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSignInWithEmail = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signInUser(email, password)
            .then(result => {
                const user = result.user;
                if (user) {
                    navigate(location.state || '/')
                        .then(() => {
                            Swal.fire({
                                title: "Login Successful!",
                                text: ` ${user.displayName || 'User'}!`,
                                icon: "success",
                                confirmButtonText: "Continue"
                            })
                            setUser(user)
                        })

                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            })
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle()
            .then(result => {
                const user = result.user;
                if (user) {
                    navigate(location.state || '/')
                        .then(() => {
                            Swal.fire({
                                title: "Login Successful!",
                                text: ` ${user.displayName || 'User'}!`,
                                icon: "success",
                                confirmButtonText: "Continue"
                            })
                            setUser(user)
                        })

                }
            })
            .catch(error => {
                Swal.fire({
                    title: "Login Failed",
                    text: error.message,
                    icon: "error",
                    confirmButtonText: "Retry"
                });
            })
    }

    return (
        <div className='min-h-screen flex justify-center items-center bg-red-100'>
            <Helmet>
                <title>Login | Buy&Bulk</title>
                <meta name="description" content="Login to Buy&Bulk to manage your products and orders." />
            </Helmet>

            <div className='animate__animated animate__fadeInLeft w-8/12 flex h-[calc(100vh-200px)] mx-auto rounded-2xl bg-white border border-[#FF3F33] shadow-2xl shadow-red-400'>
                <div className='w-1/2 px-6 pb-20 pt-10 bg-base-200 rounded-l-2xl'>
                    <Fade>
                        <div className='text-center mb-4'>
                            <h3 className='text-3xl pb-2 font-bold text-[#FF3F33]'>Welcome Back</h3>
                            <p className='text-sm  text-gray-400 '>Your gateway to smarter bulk buying and selling</p>
                        </div>
                    </Fade>

                    <Fade>
                        <form
                            onSubmit={handleSignInWithEmail}
                            className="fieldset my-auto">

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



                            <div><a className="link link-hover">Forgot password?</a></div>
                            <input type='submit' value='Login' className="btn bg-[#FF3F33] hover:bg-red-500 transition-transform transform hover:scale-103 text-white mt-4"></input>
                        </form>
                    </Fade>
                    <Fade>
                        <div className='text-center'>
                            <div className="flex items-center gap-4 my-6">
                                <div className="flex-1 h-px bg-gray-300"></div>
                                <span className="text-sm text-gray-600 font-medium">or sign in with</span>
                                <div className="flex-1 h-px bg-gray-300"></div>
                            </div>
                            <button onClick={handleSignInWithGoogle} className="btn w-full bg-white text-black border-[#FF3F33]">
                                <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                                Login with Google
                            </button>
                            <p className='text-sm pt-3 text-gray-500'>Don't have an account? <Link
                                className='text-[#FF3F33] font-semibold' to={'/register'}>Register</Link></p>
                        </div>
                    </Fade>


                </div>
                <Fade>
                    <div>
                        <Lottie animationData={animation} style={{ paddingLeft: '20px', paddingTop: '28px' }}></Lottie>
                    </div>
                </Fade>
            </div>

        </div>
    );
};

export default Login;