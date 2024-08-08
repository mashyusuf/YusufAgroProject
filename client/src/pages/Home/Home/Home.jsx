import React from 'react';
import AboutUs from "../../aboutus/AboutUs";
import ContactUs from "../../contactUs/Contact";
import Content from "../../content/Content";
import Category from "../Category/Category";
import Banner from "../banner/Banner";
import PopularAnimal from "../banner/PoplarAnimal/PopularAnimal";
import  ReviewCards from "../../review/Reviwe"; // Adjust the import path

const Home = () => {
    return (
        <div>
            <Banner />
            <PopularAnimal />
            <Category />
            <Content />
           {/* Added ReviewCards here */}
            <ContactUs />
            <AboutUs />
            <ReviewCards />
        </div>
    );
};

export default Home;
