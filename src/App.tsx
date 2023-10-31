import React from 'react';
import './App.css';
import Search from './pages/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import toast, { Toaster } from 'react-hot-toast';
import InternetChecker from './components/InternetChecker/InternetChecker';

function App() {
  return (
    <div>
      <Toaster />
      <Search />
    </div>
  );
}

export default App;
