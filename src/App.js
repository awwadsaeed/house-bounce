import './App.css';
import Login from './components/signin-page/LoginForm';
import Signup from './components/signup-page/SignupForm';
import RequestFrom from './components/sellers-page/RequestFrom';
function App() {
  return (<>
    <Login/>
    {/* <Signup/> */}
    <RequestFrom/>
    </>
  );
}

export default App;
