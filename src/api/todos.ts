export type ToDo = {
  userId: number;
  title: string;
  id: number;
  completed: boolean;
};
const SORTING_TODO_BY = 'title';

export async function fetchToDos(
  { sortingOrder, selectedUserId, page }: { sortingOrder: string; selectedUserId: number; page: number },
  signal: AbortSignal
): Promise<{ data: ToDo[]; totalCount: number }> {
  const toDosUrl = new URL('https://jsonplaceholder.typicode.com/todos');
  const params = toDosUrl.searchParams;

  params.set('_page', page.toString());
  if (sortingOrder) {
    params.set('_sort', SORTING_TODO_BY);
    params.set('_order', sortingOrder);
  }

  if (selectedUserId) params.set('userId', selectedUserId.toString());

  try {
    const response = await fetch(toDosUrl, { signal });
    const totalCount = parseInt(response.headers.get('X-Total-Count') ?? '0');
    const data = await response.json();
    return { data, totalCount };
  } catch (error) {
    if (!(error as Error).message.includes('aborted'))
      throw new Error('ToDoList fetch failed: ' + (error as Error).message);
  }
  return { data: [], totalCount: 0 };
}
