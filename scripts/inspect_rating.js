const http = require('http');
http.get('http://localhost:3011', res => {
  let s = '';
  res.on('data', c => s += c);
  res.on('end', () => {
    const lines = s.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const l = lines[i];
      if (l.includes('flex items-center justify-between') || l.includes('<svg') || l.includes('font-semibold') || l.includes('Rs') || l.includes('Rating:')) {
        console.log((i+1) + ': ' + l.trim());
      }
    }
  });
}).on('error', e => console.error(e));
