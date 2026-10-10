/** Крошечная обёртка над IndexedDB: сохранения миров в браузере (там нет лимита localStorage в 5 МБ). */
const DB_NAME = 'mincraft';
const STORE = 'worlds';

let dbPromise: Promise<IDBDatabase> | null = null;

function db(): Promise<IDBDatabase> {
  dbPromise ??= new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
  return dbPromise;
}

async function run<T>(mode: IDBTransactionMode, fn: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  const d = await db();
  return new Promise((resolve, reject) => {
    const tx = d.transaction(STORE, mode);
    const req = fn(tx.objectStore(STORE));
    tx.oncomplete = () => resolve(req.result);
    tx.onerror = () => reject(tx.error);
    tx.onabort = () => reject(tx.error);
  });
}

export const idbGet = async (key: string): Promise<string | null> => ((await run('readonly', (s) => s.get(key))) as string | undefined) ?? null;
export const idbSet = (key: string, value: string): Promise<IDBValidKey> => run('readwrite', (s) => s.put(value, key));
export const idbDelete = (key: string): Promise<undefined> => run('readwrite', (s) => s.delete(key));

/** Ключ основного мира. */
export const WORLD_KEY = 'world';
