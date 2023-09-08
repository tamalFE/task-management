import { useEffect, useState } from 'react';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem('token').split('-')[0];
  const users = useLiveQuery(() => db.users.toArray());
  const [bio, setBio] = useState(user?.bio ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const updatePassword = async (e) => {
    e.preventDefault();

    try {
      if (user.password !== currentPassword) {
        alert('Invalid Current Password');
        return;
      }
      await db.users.update(Number(userId), { password: newPassword });
      setNewPassword('');
      setCurrentPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateBio = async (e) => {
    e.preventDefault();

    try {
      await db.users.update(Number(userId), { bio });
      setBio('');
    } catch (error) {
      console.error(error);
    }
  };

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

              <div className="flex gap-4">
                <div className="card w-96 bg-base-100 shadow-xl flex-1">
                  <div className="card-body">
                    <form onSubmit={updateBio}>
                      <h2 className="card-title">Update Information</h2>
                      <div className="form-control my-2">
                        <label className="label">
                          <span className="label-text">Your Bio</span>
                        </label>
                        <textarea
                          className="textarea textarea-bordered h-24"
                          placeholder="Update your Bio"
                          value={bio}
                          onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                      </div>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary" type="submit">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="card w-96 bg-base-100 shadow-xl flex-1">
                  <div className="card-body">
                    <h2 className="card-title">Update Password</h2>
                    <form onSubmit={updatePassword}>
                      <div className="form-control w-full my-2">
                        <label className="label">
                          <span className="label-text">Current Password</span>
                        </label>
                        <input
                          type="password"
                          className="input input-bordered w-full"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                      </div>
                      <div className="form-control w-full my-2">
                        <label className="label">
                          <span className="label-text">New Password</span>
                        </label>
                        <input
                          type="password"
                          className="input input-bordered w-full"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                        />
                      </div>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary" type="submit">
                          Update
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    </div>
  );
};

export default ProfilePage;
