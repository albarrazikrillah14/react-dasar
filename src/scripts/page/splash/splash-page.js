export default class SplashPage {
  async render() {
    return `
       <div class="splash">
        <h1 class="title">StoryApp</h1>
        <p class="subtitle">Abadikan kenanganmu, satu cerita dalam satu gambar.</p>        
        <div class="btn">
          <button class="btn-primary" id="login">Login</button>
          <button class="btn-secondary" id="register">Register</button>
        </div>
      </div>
    `;
  }

  async afterRender() {
    const loginBtn = document.getElementById('login');
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "#/login";
    });

    const registerBtn = document.getElementById('register');
    registerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "#/register";
    });
   }
}