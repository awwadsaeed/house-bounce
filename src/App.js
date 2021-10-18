import './App.css';
import Login from './components/signin-page/LoginForm';
import Signup from './components/signup-page/SignupForm';
import SellerPage from './components/sellers-page/SellerPage';
import AdminPage from './components/admin-page/AllHouses';
function App() {
  return (<>
    <Login/>
    {/* <Signup/> */}
    {/* <SellerPage/> */}
    <AdminPage/>
    </>
  );
}

export default App;
