import './App.css';
import './LoginCss.css';
import Nav from './component/Nav'
import Footer from './component/Footer';
import Signup from './component/Signup';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateComp from './component/PrivateComp';
import Login from './component/Login';
import AddProduct from './component/AddProduct';
import ProductList from './component/ProductList';
import UpdateComp from './component/UpdateComp';
import Profile from './component/Profile';
import Home from './component/Home';
import Table from './component/Tables';

import UpdateUser from './component/UpdateUser';
import UpdateClass from './component/UpdateClass';

import AddClass from './component/AddClass';
import AddStudent from './component/AddStudent';
import DetailClass from './component/DetailClass';
import UpdateStudent from './component/UpdateStudent';

function App() {
  const auth = localStorage.getItem('user')
   const userName = localStorage.getItem('userName')

  return (
    <div className="App">
      <BrowserRouter> 
      <Nav/>
      <Routes>
        <Route element={<PrivateComp/>}>
        <Route path='/' element={<ProductList/>}/>

        <Route path='/table' element={<Table/>}/>


        <Route path='/add' element={<AddProduct/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/users/:id' element={<UpdateUser/>}/>
        <Route path='/addClass' element={<AddClass/>}/>
        <Route path='/addStudent' element={<AddStudent/>}/>
        <Route path='/class/:id' element={<UpdateClass/>}/>
        <Route path='/class/detailClass/:id' element={<DetailClass/>}/>
        <Route path='/students/:id' element={<UpdateStudent/>}/>

        <Route path='/products/:id' element={<UpdateComp/>}/>
        <Route path='/logout' element={<h1>Logout component</h1>}/>
        <Route path='/profile' element={<Profile/>}/>
        </Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
