customElements.define('add-note', class AddNote extends HTMLElement {
  constructor() {
    super();

    this._onSave = null;
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.innerHTML = `
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #334155;
    }

    form {
      max-width: 900px;
      margin: 64px auto;
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.2s ease;
      box-sizing: border-box;
    }

    form:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
      transform: translateY(-2px);
    }

    .form__group {
      margin-bottom: 1.25rem;
      display: flex;
      flex-direction: column;
    }

    label {
      font-size: 0.95rem;
      font-weight: 600;
      margin-bottom: 0.4rem;
      color: #2563eb;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    input[type="text"] {
      padding: 0.65rem 0.9rem;
      border: 1px solid #cbd5e1;
      border-radius: 10px;
      font-size: 1rem;
      color: #334155;
      background-color: #f8fafc;
      outline: none;
      transition: all 0.3s ease;
      box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.05);
    }

    input[type="text"]::placeholder {
      color: #94a3b8;
      font-style: italic;
    }

    input[type="text"]:focus {
      border-color: #3b82f6;
      background-color: #fff;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
    }

    p {
      font-size: 0.85rem;
      color: #ef4444;
      margin-top: 0.3rem;
    }

    .form__btn {
      padding: 0.75rem 1.25rem;
      background-color: #3b82f6;
      border: none;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      font-size: 1rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
      margin-top: 0.5rem;
      min-width: 50%;
    }

    .form__btn:hover {
      background-color: #2563eb;
    }

    .form__actions {
      display: flex;
      justify-content: center;
      margin-top: 1rem;
    }

    @media only screen and (max-width: 768px) {
      form {
        padding: 1.25rem;
      }
    }

    @media only screen and (max-width: 480px) {
      form {
        padding: 1rem;
      }

      .form__btn {
        width: 100%;
      }
    }
    `;
  }


  render() {
    this.updateStyle();

    this._shadowRoot.innerHTML = `
      ${this._style.outerHTML}
      <form>
        <div class="form__group">
          <label for="title">Judul</label>
          <input type="text" name="title" id="title" required placeholder="Masukkan judul catatan..." aria-describedby="additional_title_information">
          <p id="additional_title_information" style="display:none;">Judul tidak boleh kosong</p>
        </div>
        <div class="form__group">
          <label for="body">Deskripsi</label>
          <input type="text" name="body" id="body" required placeholder="Masukkan isi catatan..." aria-describedby="additional_body_information">
          <p id="additional_body_information" style="display:none;">Deskripsi tidak boleh kosong</p>
        </div>
        <div class="form__actions">
          <button class="form__btn">Save</button>
        </div>
      </form>
    `;

    const save = this._shadowRoot.querySelector('.form__btn');

    save.addEventListener('click', (e) => {
      e.preventDefault();
      const form = e.target.closest('form');

      const titleInput = form.querySelector('#title');
      const bodyInput = form.querySelector('#body');
      const title = titleInput.value.trim();
      const body = bodyInput.value.trim();

      const titleError = form.querySelector('#additional_title_information');
      const bodyError = form.querySelector('#additional_body_information');

      let isValid = true;

      if (!title) {
        titleError.style.display = 'block';
        isValid = false;
      } else {
        titleError.style.display = 'none';
      }

      if (!body) {
        bodyError.style.display = 'block';
        isValid = false;
      } else {
        bodyError.style.display = 'none';
      }

      if (isValid) {
        this._onSave({ title, body });
        form.reset();
      }
    })
  }

  set(onSave) {
    this._onSave = onSave;
    this.render();
  }
});
