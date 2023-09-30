import { ToDo } from '../api/todos';

export function UserToDoList({ toDos }: { toDos: ToDo[] }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {toDos.map(({ id, title, completed }) => (
          <tr key={id}>
            <td>{title}</td>
            <td>{completed ? 'performed :D' : 'in progress ...'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
