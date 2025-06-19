import React from 'react';
import Banner from '../Components/Banner';
import Categories from '../Components/Categories';
import TrendingProducts from '../Components/TrendingProducts';
import TopBrands from '../Components/TopBrands';
import NewArrivals from '../Components/NewArrival';
import BlogInsights from '../Components/Blogs';
import CallToActionBanner from '../Components/CallToActionBanner';
import { Helmet } from 'react-helmet';



const HomePage = () => {
    return (
        <div>
            <Helmet>
                <title>Home | Buy&Bulk</title>
                <meta name="description" content="Welcome to Buy&Bulk, your one-stop shop for all your bulk buying needs. Explore our wide range of products and enjoy great deals!" /> 
            </Helmet>
            <Banner></Banner>
            <TopBrands></TopBrands>
            <Categories></Categories>
            <TrendingProducts></TrendingProducts>
            <NewArrivals></NewArrivals>
            <BlogInsights></BlogInsights>
            <CallToActionBanner></CallToActionBanner>
        </div>
    );
};

export default HomePage;