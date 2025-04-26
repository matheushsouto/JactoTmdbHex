import('../dist/jacto-tmdb-hexagonal/server/server.mjs')
  .then(module => module.app)
  .catch(error => {
    throw error;
  });
export default async (req, res) => {
  const { app } = await import('../dist/jacto-tmdb-hexagonal/server/server.mjs');
  return app(req, res);
};
