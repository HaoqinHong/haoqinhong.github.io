(async () => {
 const badge=document.getElementById('contributed-stars'); if(!badge)return;
 const key='haoqin-contributed-stars-v1';
 function display(data){badge.textContent=Number(data.total).toLocaleString('en-US');badge.parentElement.title=`Public owned and PR-target repositories, deduplicated. ${data.count} repositories. Updated ${new Date(data.updated).toLocaleDateString()}`;}
 try{const cached=JSON.parse(localStorage.getItem(key));if(cached){display(cached);if(Date.now()-cached.updated<86400000)return;}}catch{}
 async function get(path){const r=await fetch('https://api.github.com'+path,{signal:AbortSignal.timeout(15000)});if(!r.ok)throw Error('GitHub unavailable');return r.json();}
 try{
 const repos=new Map();
 for(let page=1;;page++){const batch=await get(`/users/HaoqinHong/repos?per_page=100&page=${page}`);batch.forEach(r=>repos.set(r.full_name.toLowerCase(),r.stargazers_count));if(batch.length<100)break;}
 const targets=new Set();
 for(let page=1;;page++){const result=await get(`/search/issues?q=author%3AHaoqinHong+type%3Apr&per_page=100&page=${page}`);if(result.incomplete_results||result.total_count>1000)throw Error('Incomplete search');result.items.forEach(pr=>targets.add(pr.repository_url.replace('https://api.github.com/repos/','')));if(page*100>=result.total_count)break;}
 for(const name of targets){if(!repos.has(name.toLowerCase())){const r=await get('/repos/'+name);repos.set(r.full_name.toLowerCase(),r.stargazers_count);}}
 const data={total:[...repos.values()].reduce((a,b)=>a+b,0),count:repos.size,updated:Date.now()};display(data);try{localStorage.setItem(key,JSON.stringify(data));}catch{}
 }catch{if(badge.textContent==='…')badge.textContent='unavailable';}
})();