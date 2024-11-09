import Cors from 'cors';

// Initialize CORS middleware
const cors = Cors({
  //https://ecommerce-3vsnqylwx-rahulgotharwals-projects.vercel.app/
  // we need to write this frontend url in the cors origin insted the => 'https://ecommerce-lake-xi.vercel.app
  origin: 'https://ecommerce-rahulgotharwals-projects.vercel.app', // Update with your new frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

// Helper function to run the middleware and return a promise
export const runCors = (req, res) => {
  return new Promise((resolve, reject) => {
    cors(req, res, (result) => {
      if (result instanceof Error) {
        reject(new Error('CORS error'));
      }
      resolve();
    });
  });
};
