const notes = [
  {
    "group": "Graphics",
    "title": "3D Gaussian Splatting",
    "date": "2024-05-24",
    "id": "1oM7mbGSl8osIrZPsmdXvczVDCtFTxJ1D"
  },
  {
    "group": "Graphics",
    "title": "2D Gaussian Splatting",
    "date": "2024-05-29",
    "id": "1QFrkBhMLyqLRCn7bujKy98B0hI34PFEH"
  },
  {
    "group": "Graphics",
    "title": "Dynamic 3D Gaussians & 4D Gaussian Splatting",
    "id": "12WS_nT51RxmYC8OIg7bw9K-Uwl6fgALD",
    "date": "2024-05-18",
    "approximate": true,
    "dateSource": "根据本地文件创建时间推断：Dynamic 3D Gaussians.pdf"
  },
  {
    "group": "Graphics",
    "title": "Deformable-Gaussians",
    "id": "1rheSh8b9ddjkNqO2vwPT7PSiTZS5BnCD",
    "date": "2024-08-26",
    "approximate": true,
    "dateSource": "根据本地文件创建时间推断：Deformable 3D Gaussian：用于高保真单目动态场景重建的可变形 3D 高斯.pptx"
  },
  {
    "group": "Graphics",
    "title": "PhysGaussian",
    "id": "1gGP4GepEl_6BimyBY2mKY-1maDdQF5Eo",
    "date": "2024-06-17",
    "approximate": true,
    "dateSource": "根据本地文件创建时间推断：PhysGausssian 用于生成动力学的物理集成3D高斯.pptx"
  },
  {
    "group": "Graphics",
    "title": "PhysDreamer & KAN & Other Physics-based Learning Methods",
    "id": "1UeIEYOUAYjqssfW6EOnoi57hhoc50uKX",
    "date": "2024-05-07",
    "approximate": true,
    "dateSource": "根据本地文件创建时间推断：物理启发的视觉理解（PhysDreamer, KAN, PhysDiff）.pptx"
  },
  {
    "group": "Graphics",
    "title": "Physics Informed Neural Fields",
    "id": "1vperfD5crgXPBXlTtspMpOguhXVQLZmU",
    "date": "2025-04-25",
    "approximate": true,
    "dateSource": "根据本地文件创建时间推断：稀疏数据下的物理信息神经场烟雾重建.pptx"
  },
  {
    "group": "Graphics",
    "title": "Physics-Informed Learning of Characteristic Trajectories",
    "id": "1blHG7hLBt8Ndm8s1tV4ZgCA06D1dqpPu",
    "date": "2025-04-25",
    "approximate": true,
    "dateSource": "根据本地文件创建时间推断：Physics-Informed Fluid Reconstruction.pptx（相关主题）"
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
    const date = document.createElement(note.date ? 'time' : 'span');
    date.className = 'note-date';
    if (note.date) date.dateTime = note.date;
    date.textContent = note.date ? `整理于 ${note.date}` : '整理日期待确认';
    if (note.dateSource) date.title = note.dateSource;
    button.append(date);
    button.addEventListener('click', () => showNote(index)); grid.append(button);
  });
  section.append(heading,grid); entries.append(section);
}
document.getElementById('previous').onclick = () => { if(current > 0) showNote(current - 1); };
document.getElementById('next').onclick = () => { if(current < notes.length - 1) showNote(current + 1); };
document.getElementById('close-reader').onclick = () => reader.close();
reader.addEventListener('close', () => { frame.removeAttribute('src'); document.body.style.overflow = ''; });