import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Author from './components/Author';
import Book from './components/Book';
import { AppBar, Toolbar, Button } from '@mui/material';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
        <AppBar position='static'>
          <Toolbar>
            <Button color='inherit' onClick={()=>navigate('/book')}>Manage Books</Button>
            <Button color='inherit' onClick={()=>navigate('/author')}>Manage Author</Button>
          </Toolbar>
        </AppBar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/author' element={<Author />} />
        <Route path='/book' element={<Book />} />
      </Routes>
    </div>
  );
}

export default App;
