import { getUniqUsersIds, ToDo } from '../api';

export function UserSelector({
  usersData,
  selectedUser,
  onChange,
}: {
  usersData: ToDo[];
  selectedUser: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label>Pick a user: </label>
      <select value={selectedUser} onChange={onChange}>
        <option key={crypto.randomUUID()} value='0'>
          All users
        </option>
        {getUniqUsersIds(usersData).map((userId) => {
          return (
            <option key={self.crypto.randomUUID()} value={userId}>
              User {userId}
            </option>
          );
        })}
      </select>
    </div>
  );
}
