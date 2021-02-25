const router = require('express').Router();
const {
    createList,
    readList,
    updateList,
    deleteList,
} = require('../bucketListController');

router.route('/list/:userId').get(readList);