import { useLiveQuery } from 'dexie-react-hooks';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { db } from '../db';
import { useNavigate } from 'react-router-dom';

const Teams = () => {
  const teams = useLiveQuery(() => db.teams.toArray());
  const navigate = useNavigate();

  return (
    <div>
      <ProtectedRoute>
        <Layout>
          <div className="p-3">
            <div className="w-full flex">
              <h2 className="text-xl my-2">Teams</h2>
              <button
                className="btn ml-auto btn-accent"
                type="button"
                onClick={() => navigate('/teams/create')}
              >
                Add Team
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Team Name</th>
                    <th>Team Type</th>
                    <th>Members</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {teams &&
                    teams.map((t, i) => (
                      <tr key={i}>
                        <th>{i + 1}</th>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold">{t.teamName}</div>
                            </div>
                          </div>
                        </td>
                        <td>{t.type}</td>
                        <td>{t.members.length}</td>
                        <th>
                          <button
                            className="btn btn-ghost btn-xs"
                            onClick={() => {
                              navigate('/teams/members/add', {
                                state: t.teamID,
                              });
                            }}
                          >
                            Add Members
                          </button>
                          <button className="btn btn-ghost btn-xs">Edit</button>
                          <button className="btn btn-ghost btn-xs">
                            Remove
                          </button>
                        </th>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </Layout>
      </ProtectedRoute>
    </div>
  );
};

export default Teams;
