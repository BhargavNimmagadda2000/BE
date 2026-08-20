const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, '..', 'MVC-OG', 'data', 'homes.json');
const homes = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
function fetchByIdLocal(homeId) {
  let home = homes.find(h => h.id === homeId);
  if (!home) {
    const idx = parseInt(homeId, 10);
    if (!isNaN(idx) && idx >=0 && idx < homes.length) home = homes[idx];
  }
  if (!home) home = homes.find(h => h.houseName === homeId);
  return home;
}
console.log('fetch Utsav ->', fetchByIdLocal('Utsav'));
console.log('fetch index 0 ->', fetchByIdLocal('0'));
console.log('fetch id-nonexist ->', fetchByIdLocal('nonexistent'));
