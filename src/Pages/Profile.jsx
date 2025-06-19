import React, { useContext, useState } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { updateProfile, updateEmail, updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        displayName: user?.displayName || '',
        photoURL: user?.photoURL || '',
        email: user?.email || '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.displayName !== user.displayName || formData.photoURL !== user.photoURL) {
                await updateProfile(user, {
                    displayName: formData.displayName,
                    photoURL: formData.photoURL,
                });
            }

            if (formData.email && formData.email !== user.email) {
                await updateEmail(user, formData.email);
            }

            if (formData.password) {
                await updatePassword(user, formData.password);
            }

            toast.success('Profile updated successfully!');
            setIsModalOpen(false);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (

        <div className="min-h-[calc(100vh-80px)] shadow-md bg-red-100 p-6 flex flex-col items-center justify-center gap-4">
            <Helmet>
                <title>Profiles | Buy&Bulk</title>
                <meta name="description" content="Manage your profile." />
            </Helmet>
            <img
                src={user?.photoURL || 'https://via.placeholder.com/100'}
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-[#FF3F33]"
            />
            <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-800">{user?.displayName || 'No Name'}</h2>
                <p className="text-gray-500">{user?.email}</p>
            </div>
            <button
                onClick={() => setIsModalOpen(true)}
                className="mt-4 bg-[#FF3F33] hover:bg-[#e6372a] text-white px-4 py-2 rounded-md transition"
            >
                Edit Profile
            </button>


            {/* Modal */}
            {
                isModalOpen && (
                    <div className="fixed inset-0 bg-red-100 bg-opacity-40 flex justify-center items-center z-50">
                        <div className="bg-base-100 border border-[#FF3F33] shadow-2xl shadow-red-400 rounded-lg w-full max-w-md p-6 relative ">
                            <h3 className="text-lg font-semibold text-[#FF3F33] mb-4">Edit Profile</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="text"
                                    name="displayName"
                                    value={formData.displayName}
                                    onChange={handleChange}
                                    placeholder="Full Name"
                                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none  focus:border-2 focus:border-[#FF3F33] placeholder:text-gray-500"
                                />
                                <input
                                    type="text"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    placeholder="Photo URL"
                                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-2 focus:border-[#FF3F33] placeholder:text-gray-500"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Email"
                                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-2 focus:border-[#FF3F33] placeholder:text-gray-500"
                                />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="New Password"
                                    className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:border-2 focus:border-[#FF3F33] placeholder:text-gray-500"
                                />
                                <div className="flex justify-between items-center pt-2">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="text-sm text-gray-500 hover:text-red-500"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-[#FF3F33] text-white px-4 py-2 rounded-md hover:bg-[#e6372a]"
                                    >
                                        Save Changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>



    );
};

export default Profile;
