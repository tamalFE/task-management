import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateTeamMember = () => {
  //
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPerson = {
      name,
      position,
      task,
    };

    const personId = await db.teams.add(newPerson);
    navigate('/teams');
    return;
  };

  return <div>CreateTeamMember</div>;
};

export default CreateTeamMember;
