import { getUniqUsersIds } from "../api";

export default function UserSelector({
  selectedUser,
  onChange,
}: {
  selectedUser: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label>Pick a user: </label>
      <select value={selectedUser} onChange={onChange}>
        {getUniqUsersIds().map((userId) => {
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
