(() => {
  const list = document.getElementById('staticFiles');
  async function loadData() {
    if (!list) return;
    try {
      const response = await fetch('data.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('HTTP ' + response.status);
      const data = await response.json();
      const files = Array.isArray(data) ? data : (Array.isArray(data.files) ? data.files : []);
      if (!files.length) {
        list.innerHTML = '<p>Website berhasil dibuka. Belum ada data file.</p>';
        return;
      }
      list.innerHTML = '<ul>' + files.map(file => {
        const name = typeof file === 'string' ? file : (file.name || 'File');
        return '<li>' + escapeHtml(name) + '</li>';
      }).join('') + '</ul>';
    } catch (error) {
      list.innerHTML = '<p>HTML dan JavaScript aktif, tetapi data.json tidak dapat dibaca.</p>';
      console.error(error);
    }
  }
  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  }
  loadData();
})();
