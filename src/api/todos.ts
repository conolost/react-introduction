export type ToDo = {
  userId: number;
  title: string;
  id: number;
  completed: boolean;
};
const SORTING_TODO_BY = 'title';
export const toDosUrl = new URL('https://jsonplaceholder.typicode.com/todos');

export async function fetchToDos(
  { sortingOrder, selectedUserId }: { sortingOrder: string; selectedUserId: number },
  signal: AbortSignal
): Promise<ToDo[]> {
  const params = toDosUrl.searchParams;

  if (sortingOrder) {
    params.set('_sort', SORTING_TODO_BY);
    params.set('_order', sortingOrder);
  } else params.delete('_sort');

  if (selectedUserId) {
    params.set('userId', selectedUserId.toString());
  } else params.delete('userId');

  try {
    const response = await fetch(toDosUrl, { signal });
    const data = await response.json();
    return data;
  } catch (error) {
    if (!(error as Error).message.includes('aborted'))
      throw new Error('ToDoList fetch failed: ' + (error as Error).message);
  }
  return [];
}
