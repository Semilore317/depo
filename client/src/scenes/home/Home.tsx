import ShoppingList from './ShoppingList';
import Subscribe from './Subscribe';
import TopCarousel from './TopCarousel';

const Home = () => {
    return (
        <div className='home'>
            <TopCarousel />
            <ShoppingList />
            <Subscribe />
        </div>
    )
}

export default Home;