/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Add this to enable CORS headers for API routes
  async headers() {
    return [
      {
        source: '/api/:path*', // Apply to all API routes
        headers: [
          {
            key: 'Access-Control-Allow-Credentials',
            value: 'true',
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: "*" // Replace with your frontend URL
            //https://www.geeksforgeeks.org/how-to-fix-cors-errors-in-next-js-and-vercel/
            // this is the domain url we have and i think we have to send serve here  
            //ecommerce-lake-xi.vercel.app 
 
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
