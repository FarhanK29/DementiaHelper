const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if(req.oidc.isAuthenticated()){
        res.status(200).json({status: 'ok', data: 'User is authenticated'})
        res.redirect('/home');
    } else {
        res.status(401).json({status: 'error', data: 'User is not authenticated'})
    }
});