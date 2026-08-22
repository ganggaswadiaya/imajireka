const sidebar=document.getElementById('sidebar'),overlay=document.getElementById('overlay'),mobile=document.getElementById('mobile-menu'),title=document.getElementById('title');const titles={dashboard:'Dashboard',products:'Products',orders:'Orders',students:'Karya Siswa',customers:'Customers',reports:'Reports',settings:'Settings'};function close(){sidebar.classList.remove('open');overlay.classList.remove('active')}mobile.onclick=()=>{sidebar.classList.toggle('open');overlay.classList.toggle('active')};overlay.onclick=close;document.querySelectorAll('.menu').forEach(x=>x.onclick=e=>{e.preventDefault();const p=x.dataset.page;document.querySelectorAll('.menu').forEach(y=>y.classList.remove('active'));x.classList.add('active');document.querySelectorAll('.page').forEach(y=>y.classList.remove('active'));document.getElementById(p)?.classList.add('active');title.textContent=titles[p]||'Dashboard';close()});document.getElementById('logout').onclick=()=>{if(confirm('Yakin ingin keluar dari dashboard admin?'))location.href='../index.html'};
// Settings tabs and save feedback
document.querySelectorAll(".setting-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.setting;
    document.querySelectorAll(".setting-tab").forEach((item) => item.classList.remove("active"));
    document.querySelectorAll(".setting-panel").forEach((panel) => panel.classList.remove("active"));
    tab.classList.add("active");
    document.querySelector(`[data-panel="${target}"]`)?.classList.add("active");
  });
});

document.getElementById("save-settings")?.addEventListener("click", () => {
  const button = document.getElementById("save-settings");
  const original = button.innerHTML;
  button.innerHTML = '<i class="fa-regular fa-check"></i>Tersimpan';
  button.style.background = "#3F9961";
  setTimeout(() => {
    button.innerHTML = original;
    button.style.background = "";
  }, 1800);
});
