import './App.css';
import NavHeader from './component/navbar/NavHeader';
import ProductType from './component/product/ProductType';
import Product from './component/product/Product';
import {   BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <NavHeader />
      <Routes>
          <Route exact  path="/" element={<ProductType />} />

          <Route exact path="/prod" element={<Product />} />

        </Routes>
    </div>
    </Router>
  );
}

export default App;
