import './App.css';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import UserList from './Components/Users/Users';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppContext } from './context';
import {useState} from 'react';

function App() {
  const [token, setToken] = useState(null);

	const dispatchUserEvent = (actionType, payload) => {
		switch (actionType) {
			case 'LOGIN':
				setToken(payload.token);
				return;
			case 'LOGOUT':
				setToken(null);
				return;
			default:
				return;
		}
	};


  return (
    <div className="App">
			<AppContext.Provider value={{ token, dispatchUserEvent }}>

      <BrowserRouter>
        <Routes>
        {!token?<>  <Route path="/" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/></>:
            <Route path="*" element={<UserList/>}/>}
        </Routes>
        </BrowserRouter>

     </AppContext.Provider>
    </div>
  );
}

export default App;
