const KEY = 'simple-todo-items';
const form = document.getElementById('add-form');
const input = document.getElementById('task');
const list = document.getElementById('list');
const count = document.getElementById('count');

function load() {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
}

function save(items) {
  try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
}

let items = load();

function render() {
  list.innerHTML = '';
  items.forEach((item, i) => {
    const li = document.createElement('li');
    if (item.done) li.classList.add('done');

    const box = document.createElement('input');
    box.type = 'checkbox';
    box.checked = item.done;
    box.addEventListener('change', () => { items[i].done = box.checked; save(items); render(); });

    const text = document.createElement('span');
    text.textContent = item.text;

    const remove = document.createElement('button');
    remove.className = 'remove';
    remove.setAttribute('aria-label', 'Remove task');
    remove.textContent = '✕';
    remove.addEventListener('click', () => { items.splice(i, 1); save(items); render(); });

    li.append(box, text, remove);
    list.append(li);
  });
  const left = items.filter((item) => !item.done).length;
  count.textContent = items.length ? `${left} of ${items.length} left` : 'No tasks yet';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  items.push({ text, done: false });
  save(items);
  input.value = '';
  render();
});

render();
