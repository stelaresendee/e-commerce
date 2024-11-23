import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/user/Home'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import HomeAdmin from './pages/admin/HomeAdmin'
import AddProject from './pages/admin/AddProduct'
import ShoppingCart from './pages/user/ShoppingCart'
import EditProduct from './pages/admin/EditProduct'
import Payment from './pages/user/Payment'
import { AuthProvider } from './pages/AuthProvider'; 
import Detail from './pages/user/Detail'
import Orders from './pages/admin/Orders'
import MyOrders from './pages/user/MyOrders'



function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/shoppingCart" element={<ShoppingCart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/my-orders" element={<MyOrders />} />




        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/admin/add" element={<AddProject />} />
        <Route path="/admin/edit/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<Orders />} />



        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />


      </Routes>
    </Router>
    </AuthProvider>
  )
}

export default App
