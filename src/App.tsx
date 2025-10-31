import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}> 
          <Route index element={<Home />} />
          <Route path="projects" element={<Projects />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
