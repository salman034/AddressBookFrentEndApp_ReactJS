import Form from './components/Form';
import Home from './components/Home';
import {Route,Routes } from 'react-router-dom';
import Header from './Header';
import Login from './components/Login/login';
import Registration from './components/Registration/Registration';


function App() {

  return (
    <div className="App">

      <Header/>
       
          <Routes>
          <Route path="/home" element={ <Home/>} />
          <Route path="/form" element={ <Form/>} />
          <Route exact path="/form/:id" element={<Form/>}/>
          <Route path="" element ={ <Login/> } />
          <Route path="/login" element= { <Login/> } />
          <Route path="/register" element= { <Registration/> } />
          </Routes>
          
    </div>
  );
}

export default App;
