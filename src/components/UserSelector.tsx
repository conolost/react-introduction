import { getUniqUsersIds } from '../api';

export default function UserSelector({
  usersData,
  selectedUser,
  onChange,
}: {
  usersData: any;
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
