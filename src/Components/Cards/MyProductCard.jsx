import React from 'react';

const MyProductCard = ({setEditingProduct, setDeletingProduct, product}) => {
    return (
        <div
              key={product.id}
              className="group border transition-all duration-300 border-[#FF3F33] hover:shadow-lg hover:shadow-red-500 rounded-lg shadow p-4"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded transition-transform duration-300 group-hover:scale-105"
              />
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.category}</p>
              <p className="text-sm">Price: ${product.price}</p>
              <p className="text-sm">Stock: {product.stock}</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setEditingProduct(product)}
                  className="bg-[#FF3F33] text-white px-4 py-1 rounded hover:opacity-90"
                >
                  Edit
                </button>
                <button
                  onClick={() => setDeletingProduct(product)}
                  className="border border-red-500 text-red-500 px-4 py-1 rounded hover:bg-red-100"
                >
                  Delete
                </button>
              </div>
            </div>
    );
};

export default MyProductCard;