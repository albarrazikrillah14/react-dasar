customElements.define('note-status', class NoteStatus extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._callback = () => { };
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.innerHTML = `
      :host {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: block;
        max-width: 400px;
        padding: 16px;
      }

      form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      select {
        padding: 0.5rem 0.75rem;
        font-size: 1rem;
        border: 1px solid #cbd5e1;
        border-radius: 8px;
        color: #334155;
        background-color: #f8fafc;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }

      select:focus {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
        outline: none;
      }

      @media (max-width: 480px) {
        :host {
          padding: 12px;
        }
      }
    `;
  }

  render() {
    this.updateStyle();

    this._shadowRoot.innerHTML = `
    ${this._style.outerHTML}
    <form>
      <select id="kategori" name="kategori">
        <option value="archive" selected>Arsip</option>
        <option value="unarchive">Tidak Arsip</option>
      </select>
    </form>
  `;

    this._shadowRoot.querySelector('#kategori').addEventListener('change', (e) => {
      const value = e.target.value;
      this._callback(value);
    });

  }

  onStatusSubmit(callback) {
    this._callback = callback;
  }

});