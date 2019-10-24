const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const encryptLib = require('../modules/encryption');
const pool = require('../modules/pool');
const userStrategy = require('../strategies/user.strategy');

const router = express.Router();

// Handles Ajax request for user information if user is authenticated
router.get('/', rejectUnauthenticated, (req, res) => {
  // Send back user object from the session (previously queried from the database)
  res.send(req.user);
});

// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

router.post('/register', async (req, res, next) => {
  const connection = await pool.connect()
  const password = encryptLib.encryptPassword(req.body.password);
  try {
    await connection.query('BEGIN');
    const sqlAddOrganization = `INSERT INTO organization (organization_name) VALUES ($1) RETURNING id;`
    const result = await connection.query(sqlAddOrganization, [req.body.organizationName]);
    const organizationId = result.rows[0].id;
    const sqlAddContest = `INSERT INTO contest (contest_name, access_code, compost, start_date, start_time, end_date, end_time, organization_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`
    await connection.query(sqlAddContest, [req.body.contestName, req.body.accessCode, req.body.compostBin, req.body.contestStartDate, req.body.contestStartTime, req.body.contestEndDate, req.body.contestEndTime, organizationId]);
    const sqlAddUser = `INSERT INTO "user" (first_name, last_name, username, "password", wastewise_admin, organization_id) VALUES ($1, $2, $3, $4, $5, $6);`
    await connection.query(sqlAddUser, [req.body.firstName, req.body.lastName, req.body.username, password, false, organizationId]);
    await connection.query('COMMIT');
    res.sendStatus(201);
  } catch (error) {
    await connection.query('ROLLBACK');
    console.log(`Error occurred during the user post`, error);
    res.sendStatus(500);
  } finally {
    connection.release()
  }
});

// Handles login form authenticate/login POST
// userStrategy.authenticate('local') is middleware that we run on this route
// this middleware will run our POST if successful
// this middleware will send a 404 if not successful
router.post('/login', userStrategy.authenticate('local'), (req, res) => {
  res.sendStatus(200);
});

// clear all server session information about this user
router.post('/logout', (req, res) => {
  // Use passport's built-in method to log out the user
  req.logout();
  res.sendStatus(200);
});

//ADD WASTE WISE ADMIN USER POST
router.post('/register/admin', (req, res) => {
  const password = encryptLib.encryptPassword(req.body.password);
  const sqlText = `INSERT INTO "user" ("first_name", "last_name", "username", "password", "wastewise_admin") VALUES ($1, $2, $3, $4, $5);`;
  pool.query(sqlText, [req.body.firstName, req.body.lastName, req.body.username, password, true])
    .then((result) => {
      console.log('ADD ADMIN USER POST from database:', result);
      res.sendStatus(201);
    })
    .catch((error) => {
      console.log(`Error POSTing new admin user:`, error);
      res.sendStatus(500);
    })
});

//WASTE WISE ADMIN USER GET
router.get('/register/admin', (req, res) => {
  const sqlText = `SELECT * FROM "user" WHERE "wastewise_admin" = true ORDER BY "first_name" ASC;`;
  pool.query(sqlText)
    .then((result) => {
      console.log('Waste Wise Admin User GET from database:', result);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(`Error getting Waste Wise Admin User from database`, error);
      res.sendStatus(500);
    })
});

//WASTE WISE ADMIN USER DELETE
router.delete('/register/:id', (req, res) => {
  console.log('trying to delete user', req.params.id);
  const sqlText = `DELETE FROM "user" WHERE "id" = $1;`;
  pool.query(sqlText, [req.params.id])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
    })
})

//WASTE WISE ADMIN USER PUT (WITH PASSWORD)
router.put('/register/edit', (req, res) => {
  console.log('the register req.body is', req.body)
  const password = encryptLib.encryptPassword(req.body.password);
  const sqlText = `UPDATE "user"
                  SET "first_name" = $1, "last_name" = $2, "username" = $3, "password" = $4
                  WHERE "id" = $5;`;
  pool.query(sqlText, [req.body.firstName, req.body.lastName, req.body.username, password, req.body.userId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
    })
})

//WASTE WISE ADMIN USER PUT (WITHOUT PASSWORD)
router.put('/register/editnopassword', (req, res) => {
  console.log('the register req.body is', req.body)
  const sqlText = `UPDATE "user"
                  SET "first_name" = $1, "last_name" = $2, "username" = $3
                  WHERE "id" = $4;`;
  pool.query(sqlText, [req.body.firstName, req.body.lastName, req.body.username, req.body.userId])
    .then(result => {
      res.sendStatus(200);
    })
    .catch(error => {
      res.sendStatus(500);
    })
})

module.exports = router;
