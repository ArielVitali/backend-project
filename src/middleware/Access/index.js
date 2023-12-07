import publicAccess from "./publicAccess.middleware.js";
import privateAccess from "./privateAccess.middleware.js";
import privateAdminAccess from "./privateAdminAccess.middleware.js";
import publicAccessOnlyUsers from "./publicAccessOnlyUsers.middleware.js";
import premiumAccess from "./premiumAccessUsers.middleware.js";

export default {
  publicAccess,
  publicAccessOnlyUsers,
  privateAccess,
  privateAdminAccess,
  premiumAccess,
};
