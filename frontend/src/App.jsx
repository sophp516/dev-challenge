import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Feed from './pages/Feed/Feed';
import Post from './pages/Post/Post';
import './App.css';

function App() {
  const [recipeList, setRecipeList] = useState([
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
]);

  const addRecipe = (newRecipe) => {
    const updatedRecipeList = [...recipeList, newRecipe];
    setRecipeList(updatedRecipeList);
  }

  return (
    <Router>
      <div className="main">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Feed recipeList={recipeList}/>} />
          <Route path="/post" element={<Post addRecipe={addRecipe}/>} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
