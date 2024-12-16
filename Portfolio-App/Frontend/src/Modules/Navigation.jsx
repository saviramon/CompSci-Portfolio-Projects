import { Link } from 'react-router-dom';
function Navigation(){
    return (
        <>
        <nav> 
            <Link to="/">Home</Link>
            <Link to="/Topics">Topics</Link>
            <Link to="/order">Order</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/gamesPages">Games</Link>
        </nav>
        </>
    )
}
export default Navigation;