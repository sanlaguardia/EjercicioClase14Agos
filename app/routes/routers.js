
const express = require('express');
const router = express.Router();
 
const books = require('../controllers/controller.js');

router.post('/api/books/create', books.createBook);
router.get('/api/books/all', books.retrieveAllBooks);
router.get('/api/books/onebycode/:code', books.getBookByCode);
router.put('/api/books/update/:code', books.updateBookByCode);
router.delete('/api/books/delete/:code', books.deleteBookByCode);

const loans = require('../controllers/controller.js');

router.post('/api/loans/create', loans.createLoans);
router.get('/api/loans/all', loans.retrieveAllLoans);
router.get('/api/loans/onebyorderid/:orderid', loans.getLoanByOrderId);
router.put('/api/loans/update/:orderid', loans.updateByOrderId);
router.delete('/api/loans/delete/:orderid', loans.deleteByOrderId);

module.exports = router;