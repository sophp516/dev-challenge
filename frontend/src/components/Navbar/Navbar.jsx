import { NavLink } from 'react-router-dom';
import 'primeicons/primeicons.css';
import './Navbar.css';

const Navbar = () => {
    return (
        <div className="navbar">
            <NavLink to="/"><div className="foodwar">FoodWar</div></NavLink>
            <div className="navbar-big-list">
                <div className="navbar-list-container"><i className="pi pi-at"></i><span className="navbar-list">username</span></div>
                <div className="navbar-list-container"><i className="pi pi-book"></i><span className="navbar-list">my recipes</span></div>
                <div className="navbar-list-container"><i className="pi pi-heart"></i><span className="navbar-list">favorite recipes</span></div>
                <div className="navbar-button-container"><NavLink to="/post"><button className="post-button">post a recipe</button></NavLink></div>
            </div>
        </div>
    )
}
export default Navbar;
