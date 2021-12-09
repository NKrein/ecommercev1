import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminRoutes from './pages/adminRoutes';
import StoreRoutes from './pages/storeRoutes';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<StoreRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
