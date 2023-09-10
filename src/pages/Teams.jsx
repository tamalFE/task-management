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
          <div>
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Member Name</th>
                    <th>Task Name</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row */}
                  <tr>
                    <th>1</th>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div>
                          <div className="font-bold">Hart Hagerty</div>
                          <div className="text-sm opacity-50">
                            United States
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>Zemlak, Daniel and Leannon</td>
                    <td>Purple</td>
                    <th>
                      <button className="btn btn-ghost btn-xs">Add</button>
                      <button className="btn btn-ghost btn-xs">Remove</button>
                    </th>
                  </tr>
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
