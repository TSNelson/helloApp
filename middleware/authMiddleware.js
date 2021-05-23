
const requireAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401)
              .json({
                status: 'fail',
                message: 'unauthorized'
              });
  }

  next();
}

module.exports = requireAuth;