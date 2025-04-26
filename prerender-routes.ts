import fetch from 'node-fetch';

interface Movie {
  id: number;
  title: string;
}

interface MovieResponse {
  results: Movie[];
}

export default async function (): Promise<string[]> {
  const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1YjJhNWUxMDZlNzA3N2VkMzAwMWE3OGJhY2U0MzUzMCIsIm5iZiI6MTc0NTQ5MjMxMy4xMzkwMDAyLCJzdWIiOiI2ODBhMTk1OTEzMGY3NmViM2I5ZDBiYmEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ta7sDjdIhx7Ao3BE4P9ItCljckJpCDpOgr6TLZkZhIk';
  const language = 'pt-BR';

  const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=${language}&page=1`);
  const data = (await response.json()) as MovieResponse;

  const movieRoutes = data.results.map((movie) => `/detalhes/${movie.id}`);

  return [
    '/',               // Página inicial
    '/pagina-inicial',  // Se tiver outras páginas
    ...movieRoutes      // Todas as rotas de detalhes de filmes
  ];
}
