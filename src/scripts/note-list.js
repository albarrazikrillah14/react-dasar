customElements.define('note-list', class NoteList extends HTMLElement {
  constructor() {
    super();

    this._list = [];
    this._onDelete = null;
    this._onUpdate = null;
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.innerHTML = `
     .note-list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        padding: 1rem;
      }

    .empty-state {
      text-align: center;
      padding: 48px 20px;
      color: #64748b;
      font-size: 1.25rem; 
      font-style: italic;
      line-height: 1.6;
    }

    @media (max-width: 900px) {
        .note-list {
          grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 600px) {
       .note-list {
         grid-template-columns: 1fr;
      }
    }

    `;
  }

  render() {
    this.updateStyle();

    this._shadowRoot.innerHTML = '';
    this._shadowRoot.appendChild(this._style);

    if (typeof this._list === 'string' || this._list.length === 0) {
      this._shadowRoot.innerHTML = '';
      this._shadowRoot.appendChild(this._style);

      const empty = document.createElement('div');
      empty.classList.add('empty-state');
      empty.innerText = this._list;

      this._shadowRoot.appendChild(empty);
      return;
    }

    const container = document.createElement('div');
    container.classList.add('note-list');

    this._list.forEach((item) => {
      const note = document.createElement('note-item');
      note.setItem({
        ...item,
        onDelete: this._onDelete,
        onUpdate: this._onUpdate,
      });
      container.appendChild(note);
    });

    this._shadowRoot.appendChild(container);
  }


  set({ list, onDelete, onUpdate }) {
    this._list = list;
    this._onDelete = onDelete;
    this._onUpdate = onUpdate;
    this.render();
  }
})