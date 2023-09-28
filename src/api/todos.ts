export type ToDo = {
  userId: number;
  title: string;
  id: number;
  completed: boolean;
};
const DEFAULT_LIMIT = 20;
const DEFAULT_SORT_FIELD = 'title';

const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

type GetToDoListFilterOptions = {
  userId?: number;
  _page?: number;
  _limit?: number;
};

type GetToDoListSortOptions = {
  _sort?: string;
  _order?: string;
};

type GetToDoListOptions = {
  sort?: GetToDoListSortOptions;
  filters?: GetToDoListFilterOptions;
};

export async function getApiToDoList({ filters, sort }: GetToDoListOptions, signal: AbortSignal): Promise<ToDo[]> {
  const { _page = 1, _limit = DEFAULT_LIMIT } = filters ?? {};
  const { _sort = DEFAULT_SORT_FIELD } = sort ?? {};

  const optionEntries = Object.entries({ _page, _limit, _sort, ...filters, ...sort });
  const convertedOptions = optionEntries.map(([key, value]) => [key, (value ?? '').toString()]);
  const searchParams = new URLSearchParams(convertedOptions);

  const fetchUrl = `${todosUrl}?${searchParams.toString()}`;

  try {
    const response = await fetch(fetchUrl, { signal });
    const data = await response.json();
    return data;
  } catch (error) {
    if (!(error as Error).message.includes('aborted'))
      throw new Error('ToDo fetch failed: ' + (error as Error).message);
  }

  return [];
}
