import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.css';

import App from './App';
import HomePage from "./routes/HomePage";
import IngredientListPage from "./routes/IngredientListPage";
import RecipeListPage from "./routes/RecipeListPage";
import RecipeDetailPage from "./routes/RecipeDetailPage";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="home" element={<HomePage />} />
          <Route path="recipeDetail" element={<RecipeDetailPage />} />
          <Route path="recipeList" element={<RecipeListPage />} />
          <Route path="ingredientList" element={<IngredientListPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);