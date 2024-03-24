import {
  MemoryRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import Home from './pages/Home';
import MainForm from './pages/MainForm';
import Dashboard from './pages/Dashboard';
import Navigation from './components/Navigation';
import TransactionList from './pages/TransactionList';
import TransactionDetail from './pages/TransactionDetail';
import CustomerList from './pages/CustomerList';

export default function App() {
  return (
    <>
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/form" element={<MainForm />} />
          <Route path="/transaction" element={<TransactionList />} />
          <Route path="/detail/:docNo" element={<TransactionDetail />} />
          <Route path="/customer-list" element={<CustomerList />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
