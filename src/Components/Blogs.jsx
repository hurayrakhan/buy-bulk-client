import React from 'react';
import { Zoom } from 'react-awesome-reveal';

const blogPosts = [
    {
        id: 1,
        title: 'Reusing Electronics: Eco-Friendly Tips',
        image: 'https://i.ibb.co/tp0JPrj0/1586-CREDO-Tip-How-to-Recycle-Electronics-950x483-Mobile-Blog-Hero.webp',
        excerpt: 'Discover sustainable practices for extending the life of your electronic devices. Learn how to safely reuse, refurbish, and recycle gadgets to help reduce e-waste and protect the environment.',
        date: 'June 6, 2025',
        category: 'Electronics',
    },
    {
        id: 2,
        title: 'How to Source Bulk Products Effectively',
        image: 'https://i.ibb.co/PsyBMtkd/28699763.webp',
        excerpt: 'Learn the essential steps to find reliable wholesale suppliers, evaluate product quality, and build strong long-term B2B relationships. Avoid scams and reduce risks in bulk sourcing.',
        date: 'June 3, 2025',
        category: 'Wholesale',
    },
    {
        id: 3,
        title: 'Top Packaging Tips for Bulk Shipping',
        image: 'https://i.ibb.co/LTRDSvx/Pioneer-bulk-shipping-1024x768.jpg',
        excerpt: 'Efficient packaging is critical when shipping in bulk. Discover cost-saving packaging materials, palletizing techniques, and strategies to prevent damage during transit.',
        date: 'May 28, 2025',
        category: 'Logistics',
    },
];

const BlogInsights = () => {
    return (
        <section className="w-10/12 mx-auto my-12 px-4">
            <div className='w-full text-right border-r-6 border-r-[#FF3F33] py-4 mb-10'>
                <h2 className="text-3xl font-bold mx-4">Latest Blog Insights</h2>
            </div>
            <div className="space-y-5">
                {blogPosts.map((post, index) => (
                    <Zoom key={post.id} duration={1000} delay={index * 200} triggerOnce>
                        <div
                           
                            className={`flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''
                                } items-center gap-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden`}
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full md:w-1/2 h-64 object-cover transition-transform duration-300 hover:scale-105"
                            />
                            <div className="p-6 w-full md:w-1/2">
                                <div className="flex justify-between items-center text-xs text-gray-400 mb-2">
                                    <span>By Admin</span>
                                    <span>{post.date}</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3 hover:text-[#FF3F33] transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xs bg-[#FF3F33] text-white px-3 py-1 rounded-full">
                                        {post.category}
                                    </span>
                                    <button className="text-[#FF3F33] text-sm font-semibold hover:underline">
                                        Read More →
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Zoom>
                ))}
            </div>
        </section>
    );
};

export default BlogInsights;
