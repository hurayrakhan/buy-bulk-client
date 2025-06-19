import React from "react";
import Marquee from "react-fast-marquee";

const TopBrands = () => {
  return (
    <section className="my-12 px-4">
      
      <Marquee speed={50} loop={0} autoFill pauseOnHover={true} gradient={true} gradientColor={[255, 255, 255]}>

        <div className="flex gap-16 items-center ml-16">

          <img src='https://i.ibb.co/V0JhvsMT/Adidas-logo-removebg-preview.png' alt="Brand Logo" className="h-16 hove6 transition" />
          <img src='https://i.ibb.co/xKTBB088/images-3-removebg-preview.png' alt="Brand Logo" className="h-16 hove6 transition" />
          <img src='https://i.ibb.co/mVZ45wMq/download-4-removebg-preview.png' alt="Brand Logo" className="h-16 hove6 transition" />
          <img src='https://i.ibb.co/MkN1b7HT/images-5-removebg-preview.png' alt="Brand Logo" className="h-16 hove6 transition" />
          <img src='https://i.ibb.co/FLtsvhz0/Font-Samsung-Logo-removebg-preview.png' className="h-16 grayscale-100 hover:grayscale-100 transition" />


        </div>
      </Marquee>
    </section>
  );
};

export default TopBrands;
