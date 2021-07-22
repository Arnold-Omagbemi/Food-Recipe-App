import React, { useEffect, useState } from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "025cb957";
  const APP_KEY = "25a0d6589c66e2985985ffa8a62494ca";
  
  
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
   getRecipes();
  }, [query]);

  const getRecipes = async () =>{
    const response = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
      );
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  };

  const updateSearch = e => {
    setSearch(e.target.value);
  };

  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <div className="App">
      <div className="the-bar">
      <form onSubmit={getSearch} className="search-form">
         <input className="search-bar" type="text" value={search} onChange={updateSearch} />
         <button className="search-button" type="submit">
           search
         </button>
      </form>
      </div>
      <div className="recipes">
      {recipes.map(recipe => (
       <Recipe 
       key={recipe.recipe.label}
       title={recipe.recipe.label}
       calories={recipe.recipe.calories}
       image={recipe.recipe.image}
       ingredients={recipe.recipe.ingredients}
       />
      ))}
      </div>
    </div>
  );
};

export default App;
