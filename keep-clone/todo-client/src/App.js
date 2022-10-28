import logo from './logo.svg';
import { useEffect,useState } from "react";
import './App.css';
import Login from './pages/login/login';
import Dashboard from './pages/dashboard/dashboard';
import { BrowserRouter, Route, Switch , useHistory } from "react-router-dom";
import Register from './pages/login/register';
function App() {
  

  return (
    <div className="App">
      <BrowserRouter>
        <Route exact path="/" component={Login}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/register" component={Register}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
