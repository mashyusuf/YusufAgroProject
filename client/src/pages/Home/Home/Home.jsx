import Category from "../Category/Category";
import Banner from "../banner/Banner";
import PopularAnimal from "../banner/PoplarAnimal/PopularAnimal";


const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <PopularAnimal></PopularAnimal>
           <Category></Category>
        </div>
    );
};

export default Home;