const Role = require("../models/Role");

module.exports = (requiredPermissions) => {
  return async (req, res, next) => {
    try {
      const userRole = await Role.findById(req.user.role);
      if (!userRole) return res.status(403).json({ message: "Role not found" });

      const hasPermission = requiredPermissions.every((perm) =>
        userRole.permissions.includes(perm)
      );

      if (!hasPermission)
        return res.status(403).json({ message: "Access Denied" });

      next();
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};
