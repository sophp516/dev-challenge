import { NavLink } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';
import 'primeicons/primeicons.css';
import './Navbar.css';

const Navbar = () => {

    const { logout } = useLogout();

    const handleClick = async () => {
        await logout();
    }
    return (
        <div className="navbar">
            <NavLink to="/"><div className="foodwar">FoodWars</div></NavLink>
            <div className="navbar-big-list">
                <div className="navbar-list-container"><i className="pi pi-at"></i><span className="navbar-list"><NavLink to="/home">{JSON.parse(localStorage.getItem('foodwars')).username}</NavLink></span></div>
                <div className="navbar-list-container"><i className="pi pi-book"></i><span className="navbar-list"><NavLink to="/leaderboard">leaderboard</NavLink></span></div>
                <div className="navbar-list-container"><i className="pi pi-heart"></i><span className="navbar-list">saved recipes</span></div>
                <div className="navbar-button-container"><NavLink to="/post"><button className="post-button">post a recipe</button></NavLink></div>
                <div className="navbar-logout-container"><p onClick={handleClick}>logout</p></div>
            </div>
        </div>
    )
}
export default Navbar;
