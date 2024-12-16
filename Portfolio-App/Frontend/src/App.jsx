import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import HomePage from './Modules/HomePage.jsx';
import Topics from './Modules/Topics.jsx'
import GalleryPage from './Modules/GalleryPage.jsx';
import OrderPage from './Modules/OrderPage.jsx';
import ContactPage from './Modules/ContactPage.jsx';
import Navigation from './Modules/Navigation.jsx';
import products from './data/products.js';
import GamesPage from './Modules/GamesPage.jsx';
import GameAdd from './Modules/GameAdd.jsx';
import GameEdit from './Modules/GameEdit.jsx'


function App() {
  const [game, setGame] = useState([]);

    return (
      <>
        <header>
          <h1>X'avier Tejada</h1>
      </header>
      <Router>
        <Navigation />
          <main>
              <section>
                  <Routes>
                      <Route path="/" element={<HomePage />}></Route>
                      <Route path="/topics" element={<Topics />}></Route>
                      <Route path="/gallery" element={<GalleryPage />}></Route>
                      <Route path="/order" element={<OrderPage product={products} />}></Route>
                      <Route path="/contact" element={<ContactPage />}></Route>
                      <Route path="/gamesPages" element={<GamesPage setGame={setGame}/>}></Route>
                      <Route path="/create" element={<GameAdd />}></Route>                      
                      <Route path="/edit" element={<GameEdit gameToEdit={game}/>}></Route>  
                  </Routes>
              </section>
          </main>
      </Router>
      <footer>
          <p>&copy; 2024 X'avier Tejada</p>
      </footer>
      </>
    )
}

export default App
