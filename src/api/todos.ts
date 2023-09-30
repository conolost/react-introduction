export type ToDo = {
  userId: number;
  title: string;
  id: number;
  completed: boolean;
};
const SORTING_TODO_BY = 'title';

export async function fetchToDos(
  { sortingOrder, selectedUserId }: { sortingOrder: string; selectedUserId: number },
  signal: AbortSignal
): Promise<ToDo[]> {
  const toDosUrl = new URL('https://jsonplaceholder.typicode.com/todos');
  const params = toDosUrl.searchParams;

  if (sortingOrder) {
    params.set('_sort', SORTING_TODO_BY);
    params.set('_order', sortingOrder);
  }

  if (selectedUserId) params.set('userId', selectedUserId.toString());

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
