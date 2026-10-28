// Add future essays here, newest first. Each url points to a local article HTML page.
// { title: "文章标题", date: "2026-10-28", summary: "文章简介", url: "essays/article.html" }
const essays = [{ title: "人生如逆旅，知易行难。", date: "2026-09-30", summary: "AI 时代如何克服焦虑（我在尽量学习如何做到？）", url: "essays/2026-09-30.html" }];
if (essays.length) {
  const container = document.getElementById('entries');
  container.replaceChildren();
  essays.forEach(essay => {
    const link = document.createElement('a');
    link.className = 'entry';
    link.href = essay.url;
    const date = document.createElement('time');
    date.dateTime = essay.date;
    date.textContent = essay.date;
    const title = document.createElement('h3');
    title.textContent = essay.title;
    const summary = document.createElement('p');
    summary.textContent = essay.summary;
    link.append(date, title, summary);
    container.append(link);
  });
}