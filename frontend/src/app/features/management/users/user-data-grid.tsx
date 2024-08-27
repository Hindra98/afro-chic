// components/UserList.tsx
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/core-hooks';
import { fetchUsersRequest } from '../../../store-management/actions/users/users-actions';


const UserList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.getUsers);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index} className="mb-2">
            {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
