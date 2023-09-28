export const url = new URL('https://jsonplaceholder.typicode.com/todos');
export type ToDo = {
  userId: number;
  title: string;
  id: number;
  completed: boolean;
};

export async function getApiData(signal: AbortSignal): Promise<ToDo[]> {
  try {
    const response = await fetch(url, { signal });
    const data = await response.json();
    return data;
  } catch (error) {
    if (!(error as Error).message.includes('aborted'))
      throw new Error('ToDo fetch failed: ' + (error as Error).message);
  }
  return [];
}
