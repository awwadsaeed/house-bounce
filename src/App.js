import './App.css';
import Login from './components/signin-page/LoginForm';
import Signup from './components/signup-page/SignupForm';
import SellerPage from './components/sellers-page/SellerPage';
function App() {
  return (<>
    <Login/>
    {/* <Signup/> */}
    <SellerPage/>
    </>
  );
}

export default App;
