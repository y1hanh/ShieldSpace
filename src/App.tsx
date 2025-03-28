import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar } from './nav/Navbar'
import { Home, Game, Resource } from './components/pages'

function App() {

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/resource" element={<Resource />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
