import { env } from "process";

const URL = () => {
    return env.PRODUCTION_URL || "http://localhost:3000";
}
export default URL;
