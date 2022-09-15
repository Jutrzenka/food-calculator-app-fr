import { useFetch } from './utils/hooks/useFetch'
import {Box} from "@chakra-ui/react";
import './App.css'
import {Route, Routes} from "react-router-dom";
import { HomeView } from './views/Home/HomeView';
import { RegisterView } from './views/Register/RegisterView';
import { AboutView } from './views/About/AboutView';

interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const App = () => {
  const {  } = useFetch<Post[]>('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "email": "kacperczaja1999@gmail.com",
      "password": "haslo123456789"
    })
  })
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
            <Route path="/login" element={<RegisterView />} />
            <Route path="/about" element={<AboutView />} />
          </Routes>
          </Box>
        </Box>
      </div>

  )
}