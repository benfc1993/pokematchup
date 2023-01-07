export const baseUrl =
  process.env.ENV === 'production'
    ? 'https://pokematchup-service.onrender.com'
    : 'http://localhost:3001';
