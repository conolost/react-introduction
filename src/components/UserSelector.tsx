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
      <label>Pick a user: </label>
      <select value={selectedUser} onChange={onChange}>
        <option key={crypto.randomUUID()} value='0'>
          All users
        </option>
        {users.map(({ id, name }) => (
          <option key={self.crypto.randomUUID()} value={id}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
