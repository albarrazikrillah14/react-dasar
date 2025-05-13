import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './Home.jsx'
import { BrowserRouter, Route, Routes } from 'react-router';
import About from './About.jsx';
import Profile from './Profie.jsx';
import Customer from './Customer.jsx';
import NotFound from './NotFound.jsx';
import DataLayout from './DataLayout.jsx';
import ProductDetail from './ProductDetail.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/data" element={<DataLayout/>}>
          <Route index element={<Profile/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="customer" element={<Customer/>}/>
        </Route>
        <Route path="/products/:id" element={<ProductDetail/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
