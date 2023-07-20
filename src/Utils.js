import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the directory name of the current module file (ES modules only!)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;
