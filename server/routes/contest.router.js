const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//CONTEST DATA GET
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM contest WHERE organization_id = $1
                    ORDER BY contest_name ASC;`;
    pool.query(sqlText, [req.user.organization_id])
        .then((result) => {
            console.log('Organization GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error getting organization from database`, error);
            res.sendStatus(500);
        })
});

//CONTEST INFO PUT
router.put('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE contest
                    SET "contest_name" = $1, "start_date" = $2, "start_time" = $3, "end_date" = $4, "end_time" = $5, "compost" = $6
                    WHERE "id" = $7;`;
    pool.query(sqlText, [req.body.contestName, req.body.contestStartDate, req.body.contestStartTime, req.body.contestEndDate, req.body.contestEndTime, req.body.contestCompostBin, req.body.contestNameId])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//CONTEST DELETE
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const sqlText = `DELETE FROM contest WHERE "id" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then(result => {
            res.sendStatus(200);
        })
        .catch(error => {
            res.sendStatus(500);
        })
})

//NEW CONTEST POST
router.post('/add', rejectUnauthenticated, (req, res) => {
    const sqlText = `INSERT INTO contest ("contest_name", "start_date", "start_time", "end_date", "end_time", "access_code", "compost", "organization_id") VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;
    pool.query(sqlText, [req.body.contestName, req.body.contestStartDate, req.body.contestStartTime, req.body.contestEndDate, req.body.contestEndTime, req.body.contestAccessCode, req.body.contestCompostBin, req.user.organization_id])
        .then((result) => {
            console.log('ADD CONTEST POST from database:', result);
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log(`Error POSTing new contest:`, error);
            res.sendStatus(500);
        })
})

//GETS WHETHER COMPOST IS SELECTED FOR CONTEST
router.get(`/compost/:id`,  (req, res) => {
    const sqlText = `
    SELECT compost, organization_id, id from contest
    WHERE access_code = $1;
    `;
    pool.query(sqlText, [req.params.id])
    .then(result => {
        res.send(result.rows);
    })
    .catch(error => {
        console.log('error in /compost/:id GET', error)
        res.sendStatus(500);
    })
})

//CURRENT CONTEST INFO GET
router.get(`/currentcontest/:id`, (req, res) => {
    console.log('the current contest req.body', req.params.id)
    const sqlText = `SELECT * FROM "contest" WHERE "access_code" = $1;`;
    pool.query(sqlText, [req.params.id])
        .then((result) => {
            console.log('Contest Info GET from database:', result);
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error getting items from database`, error);
            res.sendStatus(500);
        })
});

module.exports = router;