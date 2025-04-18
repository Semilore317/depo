import ShoppingList from './ShoppingList';
import TopCarousel from './TopCarousel';

const Home = () => {
    return (
        <div className='home'>
            <TopCarousel />
            <ShoppingList />
        </div>
    )
}

export default Home;