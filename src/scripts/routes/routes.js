import LoginPage from "../page/auth/login/login-page.js";
import RegisterPage from "../page/auth/register/register-page.js";
import DetailPage from "../page/detail/detail-page.js";
import HomePage from "../page/home/home-page.js";
import SplashPage from "../page/splash/splash-page.js";

const routes = {
  '/': () => new SplashPage(),
  '/home': () => new HomePage(),
  '/stories/:id': () => new DetailPage(),
  '/login': () => new LoginPage(),
  '/register': () => new RegisterPage(),
};

export default routes;
