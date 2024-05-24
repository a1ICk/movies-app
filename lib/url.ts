import { env } from "process";

const URL = env.NODE_ENV === 'production' && env.PRODUCTION_URL ? env.PRODUCTION_URL : 'http://localhost:3000/';
export default URL;
