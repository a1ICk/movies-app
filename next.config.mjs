/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/movies",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/movies/:movieId",
        destination: "https://api.themoviedb.org/3/movie/:movieId?api_key=1d74b95816011e440a66ebdd78e3468c&append_to_response=videos,images",
      },
      {
        source: "/api/movies/p/:page/:path*",
        destination: "https://api.themoviedb.org/3/discover/movie?page=:page&api_key=1d74b95816011e440a66ebdd78e3468c&append_to_response=videos,images*"
      },
      {
        source: "/api/genres",
        destination: "https://api.themoviedb.org/3/genre/movie/list?language=en&api_key=1d74b95816011e440a66ebdd78e3468c",
      }
    ]
  }
};

export default nextConfig;
