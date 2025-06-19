import React from 'react';
import { Fade } from 'react-awesome-reveal';


const newArrivalProducts = [
  {
    id: 1,
    name: 'Organic Basmati Rice',
    category: 'Groceries',
    price: 45.99,
    image: 'https://i.ibb.co/FqJJ5VHr/basmati-rice-K1701-rebrand-001.webp',
  },
  {
    id: 2,
    name: 'Adidas Gamecourt 2.0',
    category: 'Footwear',
    price: 29.99,
    image: 'https://i.ibb.co/Swf62s8v/Gamecourt-2-0-Tennis-Shoes-White-HQ8809-01-standard.jpgg',
  },
  {
    id: 3,
    name: 'Stainless Steel Kitchen Sets',
    category: 'Home & Kitchen',
    price: 119.0,
    image: 'https://i.ibb.co/67QdNQpB/H88169598a678443fb33129d61e265b84-R.jpg',
  },
  {
    id: 4,
    name: 'Bulk Winter Hoodies',
    category: 'Clothing & Apparel',
    price: 199.0,
    image: 'https://i.ibb.co/HM1KG0N/images-15.jpg',
  },
];

const NewArrivals = () => {
  return (
    <section className="my-12 px-4">
      <div className='w-10/12 mx-auto border-l-6 border-l-[#FF3F33] py-4 mb-10'>
        <h2 className="text-3xl font-bold mx-4">New Arrivals</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {newArrivalProducts.map((product) => (
          <Fade key={product.id} duration={1000} >
            <div
            className="group border transition-all duration-300 border-[#FF3F33] hover:shadow-lg hover:shadow-red-500 rounded-lg shadow p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded transition-transform duration-300 group-hover:scale-105"
            />
            <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-sm">Price: ${product.price.toFixed(2)}</p>
          </div>
          </Fade>
        ))}

      </div>
    </section>
  );
};

export default NewArrivals;
