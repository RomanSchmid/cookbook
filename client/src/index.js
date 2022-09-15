import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import App from './App';
import Home from "./routes/Home";
import IngredientList from "./routes/IngredientList";
import RecipeListPage from "./routes/RecipeListPage";
import RecipeDetailPage from "./routes/RecipeDetailPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<Home />} />
          <Route path="recipeDetail" element={<RecipeDetailPage />} />
          <Route path="recipeList" element={<RecipeListPage />} />
          <Route path="ingredientList" element={<IngredientList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);