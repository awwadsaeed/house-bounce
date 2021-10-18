
import Login from './components/signin-page/LoginForm';
import Signup from './components/signup-page/SignupForm';
import SellerPage from './components/sellers-page/SellerPage';
import AdminPage from './components/admin-page/AllHouses';
import Header from './components/header/Header';
import { useContext } from 'react';
import { userContext } from './context/UserContext';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';



function App() {
  const context = useContext(userContext);

  return (<Router>
    <Header />
    <Switch>

      <Route exact path="/">
        {
          !context.loggedin &&
          <Login />
        }
        {context.loggedin && (context.user.role === 'seller') && (
          <Redirect to="/seller" />
        )}
        {context.loggedin && (context.user.role === 'admin') && (
          <Redirect to="/admin" />
        )}
      </Route>
      <Route exact path="/signup">
        {
          !context.loggedin &&
          <Signup />
        }
      </Route>
      <Route exact path="/admin">
        {context.loggedin && (context.user.role === 'admin') && (
          <AdminPage />)}
        {!context.loggedin && <Redirect to="/" />}
      </Route>
      <Route exact path="/seller">
        {context.loggedin && (context.user.role === 'seller') && (
          <SellerPage />)}
        {!context.loggedin && <Redirect to="/" />}
      </Route>

    </Switch>
  </Router>
  );
}

export default App;
