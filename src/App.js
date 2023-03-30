import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/pages/Home';
import Contact from './components/pages/Contact';
import Company from './components/pages/Company';
import NewProject from './components/pages/NewProject';
import Projects from './components/pages/Projects';
import Project from './components/pages/Project';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer'

function App() {
  return (
    <BrowserRouter>
    
      <Navbar />
      
      <Container customClass='min-height'>
        <Routes>
          <Route path='/' element={<Home />}/>

          <Route path='/projetos' element={<Projects />}/>
            
          <Route path='/contato' element={<Contact />}/>
            
          <Route path='/empresa' element={<Company />}/>
            
          <Route path='/novoprojeto' element={<NewProject />}/>

          <Route path='/projeto/:id' element={<Project />}/>
        </Routes>
      </Container>
      <Footer />
    </BrowserRouter>   
  );
}

export default App;
