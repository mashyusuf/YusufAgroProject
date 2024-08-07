import ContactUs from "../../contactUs/Contact";
import Content from "../../content/Content";
import Category from "../Category/Category";
import Banner from "../banner/Banner";
import PopularAnimal from "../banner/PoplarAnimal/PopularAnimal";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <PopularAnimal></PopularAnimal>
           <Category></Category>
           <Content></Content>
           <ContactUs></ContactUs>
        </div>
    );
};

export default Home;