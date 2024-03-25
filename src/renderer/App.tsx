import {
  MemoryRouter as Router,
  Routes,
  Route,
  BrowserRouter,
  HashRouter,
  Navigate,
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
import ProtectedRoute from './ProtectedRoute';
import { Switch } from '@headlessui/react';
// import PrintPage from './components/PrintPage';
// import PrinterConfig from './components/PrinterConfig';

export default function App() {
  return (
    <>
      <HashRouter>
        {/* <BrowserRouter> */}
        <div>
          <Navigation />
          {/* {window.location.pathname.includes('index.html') && (
            <Navigate to="/" />
          )} */}
          {/* <Switch> */}
            <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
            <Route
              path="/form"
              element={
                <ProtectedRoute>
                  <MainForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/transaction"
              element={
                <ProtectedRoute>
                  <TransactionList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/detail/:docNo"
              element={
                <ProtectedRoute>
                  <TransactionDetail />
                </ProtectedRoute>
              }
            />
            <Route
              path="/customer-list"
              element={
                <ProtectedRoute>
                  <CustomerList />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/print-transaction" element={<PrintPage />} /> */}
            {/* <Route path="/printer-config" element={<PrinterConfig />} /> */}
            </Routes>
          {/* </Switch> */}
        </div>
        {/* </BrowserRouter> */}
      </HashRouter>
    </>
  );
}
