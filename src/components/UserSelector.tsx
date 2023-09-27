import { getUniqUsersIds, ToDo } from '../api';

export function UserSelector({
  usersData,
  selectedUser,
  onChange,
}: {
  usersData: ToDo[];
  selectedUser: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label>Pick a user: </label>
      <select value={selectedUser} onChange={onChange}>
        {getUniqUsersIds(usersData).map((userId) => {
          return (
            <option key={userId} value={userId}>
              User {userId}
            </option>
          );
        })}
      </select>
    </div>
  );
}
