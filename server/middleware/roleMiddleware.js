const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      if (!req.user || !req.user.role) {
        return res.status(403).json({
          message: "Access denied. No role found."
        });
      }

      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({
          message: "Access denied. You are not authorized."
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Authorization error",
        error: error.message
      });
    }
  };
};

export default authorizeRoles;
