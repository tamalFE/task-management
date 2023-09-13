import { useLiveQuery } from 'dexie-react-hooks';
import { createContext, useEffect, useState } from 'react';

import { db } from '../db';

export const authContext = createContext();

export const AuthProvider = (props) => {
  const [user, setUser] = useState(null);

  const users = useLiveQuery(() => db.users.toArray());

  useEffect(() => {
    const getUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return;
      }
      const id = Number(token.split('-')[0]);

      if (Array.isArray(users)) {
        const userInfo = users.find((u) => u.userID === id);
        if (userInfo) {
          const cloned = { ...userInfo };
          delete cloned.password;
          setUser(cloned);
        }
      }
    };
    getUser();
  }, [users]);

  return (
    <authContext.Provider value={{ user, setUser }}>
      {props.children}
    </authContext.Provider>
  );
};
