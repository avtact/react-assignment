
import './App.css';
import { Route, Routes } from "react-router-dom";
import Login from './views/login/login'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import Dashboard from './views/dashboard/dashboard';
import Empty from './views/Empty-dashboard/Empty';
import Create from './views/Create/create-movie';
import Edit from './views/Edit/Edit';
import RequireAuth from './Auth';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Login />}/>

          <Route exact path="/dashboard" element={<RequireAuth><Dashboard /></RequireAuth>}/>
          <Route exact path="/Empty" element={<RequireAuth><Empty /></RequireAuth>}/>
          <Route exact path="/Create" element={<RequireAuth><Create /></RequireAuth>}/>
          <Route exact path="/Edit" element={<RequireAuth><Edit /></RequireAuth>}/>
      </Routes>
   
  );
}

export default App;
