const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const News = require('../models/News');

const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/login', async (req, res) => {
    res.render('admin/admin-login');
});

router.get('/dashboard', async (req, res) => {
    var token = localStorage.getItem('authtoken');
    if (!token) {
        res.redirect('/admin/login');
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
        if (err) {
            res.redirect('/admin/login');
        }
        const news = await News.findAllNews();
        res.render('admin/dashboard', {
            showView : 'dataList',
            news : news,
            id: ''
        });
    });
});

router.get('/addnews', async (req, res) => {
    res.render('admin/dashboard', {
        showView : 'addNews',
        news : {},
        id: ''  
    });
});

router.get('/editnews/:id', async (req, res) => {
    const news = await News.findOne({_id : req.params.id});
    res.render('admin/dashboard', {
        showView : 'editNews',
        news : news,
        id : req.params.id
    });
});

router.post('/updateNews', async (req, res) => {
    News.findOneAndUpdate({_id: req.body.id}, req.body, async (err, doc) => {
        if(err)
            console.log(err);
        const news = await News.findAllNews();
        res.render('admin/dashboard', {
            showView : 'dataList',
            news : news,
            id: ''
        });
    });
});

router.get('/deleteNews/:id', async (req, res) => {
    News.deleteOne({_id : req.params.id}, async (err, doc) => {
        if(err)
            console.log(err);
        const news = await News.findAllNews();
        res.render('admin/dashboard', {
            showView : 'dataList',
            news : news,
            id: ''
        });
    });
});

module.exports = router;