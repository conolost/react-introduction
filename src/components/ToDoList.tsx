import { ToDo } from '../api';

export function UserToDoList({ todos }: { todos: ToDo[] }) {
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(({ id, title, completed }) => {
            return (
              <tr key={id}>
                <td>{title}</td>
                <td>{completed ? 'performed' : 'in progress'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
