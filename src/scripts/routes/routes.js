import AddPage from "../pages/add/add-page.js";
import LoginPage from "../pages/auth/login/login-page.js";
import RegisterPage from "../pages/auth/register/register-page.js";
import DetailPage from "../pages/detail/detail-page.js";
import HomePage from "../pages/home/home-page.js";
import { checkAuthenticatedRoute, checkUnauthenticatedRouteOnly } from "../utils/auth.js";

export const routes = {
  '/': () => checkAuthenticatedRoute(new HomePage()),
  '/stories/:id': checkAuthenticatedRoute(() => new DetailPage()),
  '/login': checkUnauthenticatedRouteOnly(() => new LoginPage()),
  '/register': checkUnauthenticatedRouteOnly(() => new RegisterPage()),
  '/add': () => checkAuthenticatedRoute(new AddPage()),
};

