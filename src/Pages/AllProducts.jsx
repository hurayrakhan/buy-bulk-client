import React, { Suspense } from 'react';
import AllProductsTabs from '../Components/AllProducts/AllProductsTabs';
import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router';
import Loading from '../Components/Loading';

const AllProducts = () => {
    const productsData = useLoaderData();

    return (
        <div className='w-10/12 mx-auto my-10 '>
            <Helmet>
                <title>All Products | Buy&Bulk</title>
                <meta name="description" content="Explore all products available on Buy&Bulk." />
            </Helmet>

            
            <Suspense fallback={<Loading></Loading>}>
                <AllProductsTabs productsData={productsData}></AllProductsTabs>
            </Suspense>
            
        </div>
    );
};

export default AllProducts;