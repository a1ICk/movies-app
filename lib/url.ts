import { env } from "process";

const URL = env.NODE_ENV === 'production' ? 'https://next-movies-app-gamma.vercel.app/' : 'http://localhost:3000/';
export default URL;
