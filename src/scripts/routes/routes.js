import AddPage from "../pages/add/add-page.js";
import LoginPage from "../pages/auth/login/login-page.js";
import RegisterPage from "../pages/auth/register/register-page.js";
import DetailPage from "../pages/detail/detail-page.js";
import HomePage from "../pages/home/home-page.js";

const routes = {
  '/': () => new LoginPage(),
  '/home': () => new HomePage(),
  '/stories/:id': () => new DetailPage(),
  '/login': () => new LoginPage(),
  '/register': () => new RegisterPage(),
  '/add': () => new AddPage(),
};

export default routes;
