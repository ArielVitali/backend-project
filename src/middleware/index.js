import publicAccess from "./publicAccess.middleware.js";
import privateAccess from "./privateAccess.middleware.js";
import privateAdminAccess from "./privateAdminAccess.middleware.js";
import publicAccessOnlyUsers from "./publicAccessOnlyUsers.middleware.js";

export default {
  publicAccess,
  publicAccessOnlyUsers,
  privateAccess,
  privateAdminAccess,
};
