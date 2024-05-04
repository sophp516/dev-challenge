import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useAuthContext } from './context/AuthContext.jsx';
import Home from './pages/Home/Home';
import Feed from './pages/Feed/Feed';
import Post from './pages/Post/Post';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Leaderboard from './pages/Leaderboard/Leaderboard.jsx';
import useGetFavorites from './hooks/useGetFavorites.js';
import './App.css';
import { useQuery } from 'react-query';


const fetchCategoryName = async () => {
  const res = await fetch('/api/recipe/getcategoryname');
  const data = await res.json();
  if (data.error) {
      throw new Error(data.error);
  }
  return data;
};

function App() {
  /* const [recipeList, setRecipeList] = useState([
    {
        recipeName: 'rabbit food',
        description: '',
        imagesrc: '../src/assets/sample.jpg',
        ingredient: ['lettuce', 'tomato', 'sauce', 'berry'],
        date: 'March 14, 2024',
        author: 'sophie',
        recipeMain: ["prepare veggies", "cut veggies", "eat"],
        ranking: 'A',
    },
    {
        recipeName: 'ramen',
        description: 'delicious',
        imagesrc: '',
        ingredient: ['noodle', 'msg', 'spice'],
        date: 'May 16, 2024',
        author: 'brian',
        recipeMain: ['idk', 'instant ramen'],
        ranking: 'F'
    }
]); */
  
  const {authUser} = useAuthContext();
  const {favorites} = useGetFavorites();
  
  /* const resetCategories = async () => {
    try {
        const response = await fetch('https://api.api-ninjas.com/v1/randomword')
        const data = await response.json();

        await postCategory(data);
        await Category.deleteMany({});
        console.log('Category collection reset successfully.');
    } catch (error) {
        console.error('Error resetting Category collection:', error.message);
    }
  }; */

  // cron.schedule('0 0 * * *', resetCategories);

  const { data: categoryName } = useQuery('categoryName', fetchCategoryName);


  return (
  
    <Router>
      <div className="main">
        <Routes>
          <Route path="/home" element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path="/" element={authUser ? <Feed favorites={favorites?.favoriteRecipe} categoryName={categoryName?.categoryDaily} /> : <Navigate to={"/login"} />} />
          <Route path="/post" element={authUser ? <Post/> : <Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/leaderboard" element={<Leaderboard categoryName={categoryName?.categoryDaily} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
