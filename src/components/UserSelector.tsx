import { User } from '../api/users';

export function UserSelector({
  users,
  selectedUser,
  onChange,
}: {
  users: User[];
  selectedUser: number;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) {
  return (
    <div>
      <label>
        Pick a user:
        <select value={selectedUser} onChange={onChange}>
          <option value='0'>All users</option>
          {users.map(({ id, name }) => (
            <option value={id} key={id}>
              {name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
