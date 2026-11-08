const notes = [
  {
    "group": "Foundation Papers",
    "title": "3D Gaussian Splatting",
    "id": "1oM7mbGSl8osIrZPsmdXvczVDCtFTxJ1D"
  },
  {
    "group": "Foundation Papers",
    "title": "2D Gaussian Splatting",
    "id": "1QFrkBhMLyqLRCn7bujKy98B0hI34PFEH"
  },
  {
    "group": "Foundation Papers",
    "title": "Dynamic 3D Gaussians & 4D Gaussian Splatting",
    "id": "12WS_nT51RxmYC8OIg7bw9K-Uwl6fgALD"
  },
  {
    "group": "Foundation Papers",
    "title": "Deformable-Gaussians",
    "id": "1rheSh8b9ddjkNqO2vwPT7PSiTZS5BnCD"
  },
  {
    "group": "Simulation Method Papers",
    "title": "PhysGaussian",
    "id": "1gGP4GepEl_6BimyBY2mKY-1maDdQF5Eo"
  },
  {
    "group": "Simulation Method Papers",
    "title": "PhysDreamer & KAN & Other Physics-based Learning Methods",
    "id": "1UeIEYOUAYjqssfW6EOnoi57hhoc50uKX"
  },
  {
    "group": "Physics-Informed Method Papers",
    "title": "Physics Informed Neural Fields",
    "id": "1vperfD5crgXPBXlTtspMpOguhXVQLZmU"
  },
  {
    "group": "Physics-Informed Method Papers",
    "title": "Physics-Informed Learning of Characteristic Trajectories",
    "id": "1blHG7hLBt8Ndm8s1tV4ZgCA06D1dqpPu"
  }
];
const entries = document.getElementById('entries');
const reader = document.getElementById('reader');
const frame = document.getElementById('document-frame');
let current = 0;
function showNote(index) {
  current = index;
  const note = notes[index];
  document.getElementById('reader-title').textContent = note.title;
  frame.title = note.title;
  frame.src = `https://drive.google.com/file/d/${note.id}/preview`;
  document.getElementById('original').href = `https://drive.google.com/file/d/${note.id}/view`;
  document.getElementById('position').textContent = `${index + 1} / ${notes.length}`;
  document.getElementById('previous').disabled = index === 0;
  document.getElementById('next').disabled = index === notes.length - 1;
  if (!reader.open) { reader.showModal(); document.body.style.overflow = 'hidden'; }
}
for (const group of [...new Set(notes.map(note => note.group))]) {
  const section = document.createElement('section'); section.className = 'note-group';
  const heading = document.createElement('h2'); heading.textContent = group;
  const grid = document.createElement('div'); grid.className = 'note-grid';
  notes.forEach((note,index) => {
    if (note.group !== group) return;
    const button = document.createElement('button'); button.type = 'button'; button.className = 'note-card'; button.textContent = note.title;
    button.addEventListener('click', () => showNote(index)); grid.append(button);
  });
  section.append(heading,grid); entries.append(section);
}
document.getElementById('previous').onclick = () => { if(current > 0) showNote(current - 1); };
document.getElementById('next').onclick = () => { if(current < notes.length - 1) showNote(current + 1); };
document.getElementById('close-reader').onclick = () => reader.close();
reader.addEventListener('close', () => { frame.removeAttribute('src'); document.body.style.overflow = ''; });