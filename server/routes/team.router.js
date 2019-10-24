const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//TEAM DATA GET
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM team WHERE organization_id = $1 ORDER BY team_name ASC;`;
    pool.query(sqlText, [req.user.organization_id])
        .then((result) => {
            console.log('Team GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error getting teams from database`, error);
            res.sendStatus(500);
        })
});

//TEAM NAME PUT
router.put('/teamName', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE team
    SET team_name = $1
    WHERE "id" = $2;`;
    pool.query(sqlText, [req.body.teamName, req.body.teamNameId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//TEAM DELETE
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM team WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//NEW TEAM POST
router.post('/', rejectUnauthenticated,  (req, res) => {
    const sqlText = `INSERT INTO team ("team_name", "organization_id") VALUES ($1, $2);`;
    pool.query(sqlText, [req.body.teamName, req.user.organization_id])
        .then((result) => {
            console.log('ADD TEAM POST from database:', result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error POSTing new team:`, error);
            res.sendStatus(500);
        })
})

//route to get team names from database when playing game,
//does not need authentication middleware
router.get('/names/:id', (req, res) => {
    const sqlText = `
    SELECT * FROM "team"
    JOIN "organization" on "organization".id = "team".organization_id
    JOIN "contest" on "contest".organization_id = "organization".id
    WHERE "contest".access_code = $1;
    `;
    pool.query(sqlText, [req.params.id])
    .then((result) => {
        res.send(result.rows);
    })
    .catch((error) => {
        console.log('error in GET team names', error);
        res.sendStatus(500);
    })
})

router.get('/idnumber/:id', (req, res) => {
    console.log('team/idnumber', req.params.id)
    let search = req.params.id.split('&')
    console.log('search turned out as', search)
    let teamName = search[0].split('=').pop()
    let organizationId = search[1].split('=').pop()
    console.log('team name is', teamName)
    console.log('org id is', organizationId);
    const sqlText = `
   SELECT "team".id from "team"
   WHERE "team".team_name = $1 and "team".organization_id = $2;
   `;
    pool.query(sqlText, [teamName, organizationId])
        .then(result => {
            console.log('team id number is', result.rows[0].id)
            res.send(result.rows[0])
        })
        .catch(error => {
            console.log('error in get team/idnumber/id', error);
            res.sendStatus(500);
        })
})

module.exports = router