import {Box} from "@chakra-ui/react";
import './App.css'
import {Route, Routes} from "react-router-dom";
import { HomeView } from './views/Home/HomeView';
import { LoginView } from './views/Login/LoginView';
import { AboutView } from './views/About/AboutView';
import { RegisterView } from './views/Register/RegisterView';
import {VerifyAccountView} from "./views/VeriffyAccount/VerifyAccountView";
import {RecipeView} from "./views/Recipe/RecipeView";
import {ProductView} from "./views/Product/ProductView";
import {OneRecipeView} from "./views/OneRecipe/OneRecipeView";

export const App = () => {
  return (
      <div className="App">
        <Box
            w='100%'
            minH='100vh'
            bg='main.100'
            bgImage='url("/images/background.jpg")'
            bgPosition='center'
            bgRepeat='no-repeat'
        >
          <Box
              w='100%'
              minH='100vh'
              bg='blackAlpha.300'
              backdropFilter='blur(20px)'
          >
              <Routes>
                  <Route path="/" element={<HomeView />} />
                  <Route path="/login" element={<LoginView />} />
                  <Route path="/register" element={<RegisterView />} />
                  <Route path="/verify/:email/:registerCode" element={<VerifyAccountView />} />
                  <Route path="/about" element={<AboutView />} />
                  <Route path="/app/recipes" element={<RecipeView />} />
                  <Route path="/app/recipes/:id" element={<OneRecipeView />} />
                  <Route path="/app/products" element={<ProductView />} />
              </Routes>
          </Box>
        </Box>
      </div>

  )
}