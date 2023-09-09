import { useState } from 'react';
import ProtectedRoute from '../component/HOC/ProtectedRoute';
import Layout from '../layout/Layout';
import { db } from '../db';
import { useNavigate } from 'react-router-dom';

const CreateTask = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      priority,
      status: 'Not Started',
      date,
    };

    const tasksId = await db.tasks.add(newTask);
    navigate('/tasks');
    return;
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div className="p-3">
          <form onSubmit={handleSubmit}>
            <div className="card w-2/3 bg-base-100 shadow-xl mx-auto">
              <div className="card-body">
                <h2 className="text-2xl">Create Task</h2>
                <div className="form-control w-full my-2">
                  <label className="label">
                    <span className="label-text">Title</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="form-control w-full my-2">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="form-control w-full my-2">
                  <label className="label">
                    <span className="label-text">Priority</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    defaultValue={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div className="form-control w-full my-2">
                  <label className="label">
                    <span className="label-text">Due Date</span>
                  </label>
                  <input
                    type="date"
                    className="input input-bordered w-full"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary" type="submit">
                    Create
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default CreateTask;
