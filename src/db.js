let db;

export function openDB() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open('FitProtocolDB', 2);
    req.onupgradeneeded = (e) => {
      const d = e.target.result;
      if (!d.objectStoreNames.contains('state')) {
        d.createObjectStore('state', { keyPath: 'key' });
      }
    };
    req.onsuccess = (e) => { db = e.target.result; resolve(db); };
    req.onerror = () => reject(req.error);
  });
}

export function dbGet(key) {
  return new Promise((resolve) => {
    const tx = db.transaction('state', 'readonly');
    const req = tx.objectStore('state').get(key);
    req.onsuccess = () => resolve(req.result ? req.result.value : null);
    req.onerror = () => resolve(null);
  });
}

export function dbSet(key, value) {
  return new Promise((resolve) => {
    const tx = db.transaction('state', 'readwrite');
    tx.objectStore('state').put({ key, value });
    tx.oncomplete = resolve;
  });
}
