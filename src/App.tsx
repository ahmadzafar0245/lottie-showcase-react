import './App.css';
import Search from './pages/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div>
      <Toaster />
      <Search />
    </div>
  );
}

export default App;
