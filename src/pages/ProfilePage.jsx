import { useEffect, useState } from 'react';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('token').split('-')[0];
  const users = useLiveQuery(() => db.users.toArray());

  useEffect(() => {
    if (!users) return;
    const userInfo = users.find((u) => u.userID === Number(userId));
    console.log({ userInfo });
    setUser(userInfo);
  }, [users]);

  return (
    <div>
      <ProtectedRoute>
        <Layout>
          <div className="w-full h-screen flex justify-center items-center">
            <div className="card w-3/4 bg-base-100 shadow-xl">
              <div className="card-body flex">
                <div className="avatar self-center">
                  <div className="w-24 rounded-full">
                    <img src={user?.image ?? '/profile.jpg'} />
                  </div>
                </div>
                <h2 className="card-title self-center">
                  {user?.username ?? ''}
                </h2>
                <p className="self-center">{user?.bio ?? ''}</p>
              </div>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
