import App from '../scripts/pages/app.js';
import '../styles/responsive.css';
import '../styles/styles.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

document.addEventListener('DOMContentLoaded', async () => {
  const content = document.querySelector('#content');
  const app = new App({ content });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });
});
