import { useContext, useEffect, useRef, useState } from 'react';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { useLiveQuery } from 'dexie-react-hooks';
import { db } from '../db';
import { toBase64 } from '../utils/image.util';
import { authContext } from '../contexts/auth.context';

const ProfilePage = () => {
  const { user, setUser } = useContext(authContext);
  const users = useLiveQuery(() => db.users.toArray());
  const [bio, setBio] = useState(user?.bio ?? '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [image, setImage] = useState(null);
  const [showUpdateImage, setShowUpdateImage] = useState(false);
  const fileRef = useRef(null);

  const updatePassword = async (e) => {
    e.preventDefault();

    if (!user) return;

    try {
      const userInfo = users.find((u) => u.userID === user?.userID);
      if (userInfo?.password !== currentPassword) {
        alert('Invalid Current Password');
        return;
      }
      await db.users.update(Number(user?.userID), { password: newPassword });
      setNewPassword('');
      setCurrentPassword('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateBio = async (e) => {
    e.preventDefault();

    try {
      if (!user) return;
      await db.users.update(Number(user.userID), { bio });
      setBio('');
    } catch (error) {
      console.error(error);
    }
  };

  const updateImage = async (e) => {
    e.preventDefault();

    try {
      await db.users.update(Number(user?.userID), { image });
      setImage(null);
    } catch (error) {
      console.error(error);
    }
  };

  const onImageChange = async (e) => {
    const imageURI = await toBase64(e.target.files[0]);
    setImage(imageURI);
    setShowUpdateImage(true);
  };

  return (
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
              <form className="self-center" onSubmit={updateImage}>
                <button
                  className="btn"
                  type="button"
                  onClick={() => fileRef?.current?.click()}
                >
                  upload Image
                </button>
                {showUpdateImage && (
                  <button className="btn ml-2" type="submit">
                    Update Image
                  </button>
                )}
                <input
                  ref={fileRef}
                  accept="image/*"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={onImageChange}
                />
              </form>
              <h2 className="card-title self-center">{user?.username ?? ''}</h2>
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
  );
};

export default ProfilePage;
