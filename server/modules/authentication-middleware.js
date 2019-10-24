const rejectUnauthenticated = (req, res, next) => {
  // check if logged in
  if (req.isAuthenticated()) {
    // They were authenticated! User may do the next thing
    // Note! They may not be Authorized to do all things
    next();
  } else {
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
};

const rejectNotAdmin = (req, res, next) => {
  //check if admin
  console.log('admin is ', req.user.wastewise_admin);
  if (req.user.wastewise_admin) {
    // user is an admin, proceed forward
    next();
  } else {
    console.log('NOT AN ADMIN')
    // failure best handled on the server. do redirect here.
    res.sendStatus(403);
  }
}

module.exports = { rejectUnauthenticated, rejectNotAdmin };
