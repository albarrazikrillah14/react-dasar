customElements.define('note-item', class NoteItem extends HTMLElement {
  constructor() {
    super();

    this._id = "";
    this._title = "";
    this._body = "";
    this._createdAt = "";
    this._archived = false;
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
    .note {
      padding: 1.5rem;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      background-color: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      transition: all 0.2s ease;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      color: #334155;
      box-sizing: border-box;
    }

    .note:hover {
      border-color: #3b82f6;
      box-shadow: 0 4px 16px rgba(59, 130, 246, 0.15);
      transform: translateY(-2px);
    }

    .note__header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .note__header_title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #1e293b;
      margin: 0;
      flex: 1;
      line-height: 1.3;
    }

    .note__header_date {
      font-size: 0.875rem;
      color: #64748b;
      font-weight: 400;
      white-space: nowrap;
    }

    .note,
    .note__body,
    .note__header_title {
      overflow-wrap: break-word;
      word-break: break-word;
    }

    .note__body {
      font-size: 1rem;
      line-height: 1.5;
      color: #475569;
      margin: 0 0 1rem 0;
      white-space: pre-line;
    }

    .note__actions {
      margin-top: 1rem;
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .note__actions button {
      padding: 0.5rem 1rem;
      border: 1px solid transparent;
      border-radius: 8px;
      font-weight: 500;
      font-size: 0.875rem;
      cursor: pointer;
      transition: all 0.15s ease;
      flex: 1;
      min-width: 80px;
      color: white;
      user-select: none;
    }

    .note__actions button.delete {
      background-color: #ef4444;
      border-color: #dc2626;
    }

    .note__actions button.delete:hover {
      background-color: #dc2626;
    }

    .note__actions button.archive {
      background-color: #6b7280;
      border-color: #4b5563;
    }

    .note__actions button.archive:hover {
      background-color: #4b5563;
    }

    @media only screen and (max-width: 768px) {
      .note {
        padding: 1.25rem;
      }
      
      .note__header {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .note__header_title {
        font-size: 1.125rem;
      }
      
      .note__header_date {
        font-size: 0.8rem;
      }
    }

    @media only screen and (max-width: 480px) {
      .note {
        padding: 1rem;
      }
      
      .note__actions {
        flex-direction: column;
        gap: 0.5rem;
      }
      
      .note__actions button {
        width: 100%;
      }
    }
    
    .note__body--collapsed {
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .note__body--expanded {
      display: block;
    }
    
    .toggle-body {
      background: none;
      border: none;
      color: #3b82f6;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      padding: 0;
      margin-top: 0.5rem;
      transition: color 0.2s ease;
      text-align: left;
    }

    .toggle-body:hover {
      color: #1d4ed8;
    }
    `;
  }

  render() {
    this.updateStyle();

    // Perbaikan: Cek panjang teks berdasarkan baris atau karakter
    const lines = this._body.split('\n');
    const isLongText = lines.length > 3 || this._body.length > 300;

    this._shadowRoot.innerHTML = `
    ${this._style.outerHTML}
    <div class="note">
      <div class="note__header">
        <h1 class="note__header_title">${this._title}</h1>
        <p class="note__header_date">${formatTanggal(this._createdAt)}</p>
      </div>        
      <p class="note__body ${isLongText ? 'note__body--collapsed' : ''}">${this._body}</p>
      ${isLongText ? '<button class="toggle-body">Show more</button>' : ''}
      <div class="note__actions">
        <button class="delete">Delete</button>
        <button class="archive">${this._archived ? 'Unarchive' : 'Archive'}</button>
      </div>
    </div>`;

    const deleteButton = this._shadowRoot.querySelector('.delete');
    if (deleteButton) {
      deleteButton.addEventListener('click', () => {
        if (this._onDelete) this._onDelete(this._id);
      });
    }

    const updateButton = this._shadowRoot.querySelector('.archive');
    if (updateButton) {
      updateButton.addEventListener('click', () => {
        if (this._onUpdate) this._onUpdate(this._id, this._archived);
      });
    }

    if (isLongText) {
      const bodyElement = this._shadowRoot.querySelector('.note__body');
      const toggleButton = this._shadowRoot.querySelector('.toggle-body');

      if (toggleButton && bodyElement) {
        toggleButton.addEventListener('click', () => {
          const isCollapsed = bodyElement.classList.contains('note__body--collapsed');
          
          if (isCollapsed) {
            bodyElement.classList.remove('note__body--collapsed');
            bodyElement.classList.add('note__body--expanded');
            toggleButton.textContent = 'Show less';
          } else {
            bodyElement.classList.remove('note__body--expanded');
            bodyElement.classList.add('note__body--collapsed');
            toggleButton.textContent = 'Show more';
          }
        });
      }
    }
  }

  setItem({ id, title, body, createdAt, archived, onDelete, onUpdate }) {
    this._id = id;
    this._title = title;
    this._body = body;
    this._createdAt = createdAt;
    this._archived = archived;
    this._onDelete = onDelete;
    this._onUpdate = onUpdate;

    this.render();
  }
});

function formatTanggal(isoDate) {
  const date = new Date(isoDate);

  const namaBulan = [
    '', 'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const tanggal = date.getUTCDate();
  const bulan = namaBulan[date.getUTCMonth() + 1];
  const tahun = date.getUTCFullYear();

  return `${tanggal} ${bulan} ${tahun}`;
}