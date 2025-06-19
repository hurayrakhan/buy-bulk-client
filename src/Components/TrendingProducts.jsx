import React from 'react';
import { Fade } from 'react-awesome-reveal';

const trendingProducts = [
  {
    id: 1,
    name: 'Wireless Earbuds (Denon)',
    description: 'High-quality Bluetooth 5.3 earbuds ideal for resale.',
    price: 349.99,
    image: 'https://i.ibb.co/cXw1Y29t/Hero-Banner-Mobile-Denon-Noise-Cancelling-Earbuds-White.webp',
  },
  {
    id: 2,
    name: 'Portable Power Bank',
    description: 'Bulk set of compact chargers for travel and emergencies.',
    price: 499.99,
    image: 'https://i.ibb.co/ycKt2t7Q/images-16.jpg',
  },
  {
    id: 3,
    name: 'LED Ring Light (18-inch)',
    description: 'Perfect for content creators and online sellers.',
    price: 259.00,
    image: 'https://i.ibb.co/Z6tH88pf/realistic-selfie-led-ring-light-blogging-equipment-studio-background-647138-16.jpg',
  },
  {
    id: 4,
    name: 'Smart Watches Bundle',
    description: 'Trendy smartwatches with fitness tracking.',
    price: 899.00,
    image: 'https://i.ibb.co/yn1yb6DF/images-17.jpg',
  },
];

const TrendingProducts = () => {
  return (
    <section className="my-12 px-4">
      <div className='w-10/12 mx-auto text-right border-r-6 border-r-[#FF3F33] py-4 mb-10'>
        <h2 className="text-3xl font-bold mx-4">Trending Products</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {trendingProducts.map((product) => (
          <Fade key={product.id} duration={1000} >
            <div
            className="bg-base-200 rounded-xl shadow hover:shadow-md hover:shadow-red-500 transition p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />
            <h3 className="font-semibold text-lg">{product.name}</h3>
            <p className="text-gray-500 text-sm">{product.description}</p>
            <span className="text-[#FF3F33] font-bold mt-2 block">${product.price.toFixed(2)}</span>
          </div>
          </Fade>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts;
