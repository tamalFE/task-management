// db.js
import Dexie from 'dexie';

export const db = new Dexie('Task-Manager');
db.version(1).stores({
  users: '++userID, username, password, image, bio', // Primary key and indexed props
});