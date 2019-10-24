const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.get("/leaderboard/:id", (req, res) => {
  console.log('leaderboard GET req.body', req.body)
  const queryText = `SELECT "team".team_name, "score".id, "score".score, "score".first_name, "score".last_name, "score".team_id, "score".time FROM score JOIN "team" ON "score".team_id="team".id WHERE "score".contest_id=$1 ORDER BY "score".score DESC, "score".time ASC LIMIT 10;`;
  contestId = req.params.id;
  console.log('contest id is', contestId)
  pool
    .query(queryText, [contestId])
    .then(results => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side leaderboard GET", error);
      res.sendStatus(500);
    });
});

router.get('/leaderboard/company/:id', (req, res) => {
  const queryText = `
  SELECT "contest".id from "contest"
  WHERE "contest".access_code = $1;
  `;
  contestId = req.params.id;
  pool
    .query(queryText, [contestId])
    .then(results => {
      console.log(results.rows);
      res.send(results.rows);
    })
    .catch(error => {
      console.log("error in server side leaderboard GET", error);
      res.sendStatus(500);
    });
})
// router.get("/leaderboard/:id", async (req, res) => {
//   const code = req.params.id;

//   const connection = await pool.connect();
//   try {
//     await connection.query("BEGIN");
//     const contest_idQuery = `SELECT id FROM contest WHERE "contest".access_code=$1`;
//     const result = await connection.query(contest_idQuery, [code]);
//     const contestId = result.rows.id;
//     console.log(result.rows);
//     const scoreQuery = `SELECT "team".team_name, "score".id, "score".score, "score".first_name, "score".last_name, "score".team_id, "score".time FROM score JOIN "team" ON "score".team_id="team".id WHERE "score".contest_id=$1 ORDER BY "score".score LIMIT 10;`;
//     const result2 = await connection.query(scoreQuery, [contestId]);
//     await connection.query("COMMIT");
//     res.send(result2.rows);
//     res.sendStatus(201);
//   } catch (error) {
//     console.log("error in server side leaderboard GET", error)
//     await connection.query("ROLLBACK");
//     res.sendStatus(500);
//   } finally {
//     connection.release();
//   }
// });

router.post('/', (req, res) => {
  console.log('the body is', req.body)
  const queryText = `
  INSERT into "score" ("first_name", "last_name", "email_address", "score", "time", "contest_id", "team_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;
  pool.query(queryText, [req.body.firstName, req.body.lastName, req.body.email, req.body.score, req.body.time,
  req.body.contestIdNumber, req.body.teamIdNumber])
    .then(() => {
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('error in score router POST', error);
      res.sendStatus(500);
    })
  })

  module.exports = router;
