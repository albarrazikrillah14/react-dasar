import { getActiveRoute } from '../routes/url-parser.js';
import routes from '../routes/routes.js';
import { setupSkipToContent, transitionHelper } from '../utils/index.js';

export default class App {
  #content;
  #skipLinkButton;


  constructor({ content, skipLinkButton }) {
    this.#content = content;
    this.#skipLinkButton = skipLinkButton;
    this.#init();
  }


  #init() {
    setupSkipToContent(this.#skipLinkButton, this.#content);
  }

  async renderPage() {
    const routeName = getActiveRoute();
    const credentials = JSON.parse(localStorage.getItem("credentials"));

    if (routeName === '/login' || routeName === "/" || routeName === '/register') {
      if (credentials) {
        window.location.href = "#/home";
      }
    } else if (!credentials) {
      window.location.href = "/";

    }

    const route = routes[routeName];
    // Get page instance
    const page = route();

    const transition = transitionHelper({
      updateDOM: async () => {
        this.#content.innerHTML = await page.render();
        page.afterRender();
      },
    });

    transition.ready.catch(console.error);

  }
}
