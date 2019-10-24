const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

//ORGANIZATION DATA GET
router.get('/', rejectUnauthenticated, (req, res) => {
    const sqlText = `SELECT * FROM organization WHERE id = $1;`;
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

//ORGANIZATION NAME PUT
router.put('/organizationName', rejectUnauthenticated, (req, res) => {
    const sqlText = `UPDATE organization
    SET organization_name = $1
    WHERE "id" = $2;`;
    pool.query(sqlText, [req.body.organizationName, req.user.organization_id])
    .then(result => {
        res.sendStatus(200);
    })
    .catch(error => {
        res.sendStatus(500);
    })
})

module.exports = router;