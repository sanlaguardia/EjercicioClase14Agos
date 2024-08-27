const db = require('../config/db.config.js');
const Book = db.Book;

// Crear un nuevo libro
exports.createBook = (req, res) => {
    let book = {};

    try {
        // Construir objeto Book desde el cuerpo de la solicitud
        book.name = req.body.name;
        book.editorial = req.body.editorial;
        book.author = req.body.author;
        book.genre = req.body.genre;
        book.country = req.body.country;
        book.pages = req.body.pages;
        book.year = req.body.year;
        book.price = req.body.price;

        // Guardar en la base de datos
        Book.create(book).then(result => {
            res.status(200).json({
                message: "Libro creado exitosamente con código = " + result.code,
                book: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Error!",
            error: error.message
        });
    }
};

// Obtener todos los libros
exports.retrieveAllBooks = (req, res) => {
    Book.findAll()
        .then(books => {
            res.status(200).json({
                message: "¡Libros obtenidos exitosamente!",
                books: books
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Obtener un libro por código
exports.getBookByCode = (req, res) => {
    let bookCode = req.params.code;

    Book.findByPk(bookCode)
        .then(book => {
            if (book) {
                res.status(200).json({
                    message: "Libro obtenido exitosamente con código = " + bookCode,
                    book: book
                });
            } else {
                res.status(404).json({
                    message: "Libro no encontrado con código = " + bookCode,
                    error: "404"
                });
            }
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
};

// Actualizar un libro por código
exports.updateBookByCode = async (req, res) => {
    try {
        let bookCode = req.params.code;
        let book = await Book.findByPk(bookCode);

        if (!book) {
            res.status(404).json({
                message: "Libro no encontrado para actualizar con código = " + bookCode,
                book: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                name: req.body.name,
                editorial: req.body.editorial,
                author: req.body.author,
                genre: req.body.genre,
                country: req.body.country,
                pages: req.body.pages,
                year: req.body.year,
                price: req.body.price
            };

            let result = await Book.update(updatedObject, {
                returning: true,
                where: { code: bookCode }
            });

            if (!result) {
                res.status(500).json({
                    message: "Error -> No se puede actualizar el libro con código = " + req.params.code,
                    error: "No se puede actualizar",
                });
            } else {
                res.status(200).json({
                    message: "Libro actualizado exitosamente con código = " + bookCode,
                    book: updatedObject,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede actualizar el libro con código = " + req.params.code,
            error: error.message
        });
    }
};

// Eliminar un libro por código
exports.deleteBookByCode = async (req, res) => {
    try {
        let bookCode = req.params.code;
        let book = await Book.findByPk(bookCode);

        if (!book) {
            res.status(404).json({
                message: "No existe un libro con código = " + bookCode,
                error: "404",
            });
        } else {
            await book.destroy();
            res.status(200).json({
                message: "Libro eliminado exitosamente con código = " + bookCode,
                book: book,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> No se puede eliminar el libro con código = " + req.params.code,
            error: error.message,
        });
    }
};

//------------------------------ Prestamos de libros (loan) -------------------------------------
const Loan = db.Loan;

exports.createLoans = (req, res) => {
    let loan = {};

    try {
        // Construir objeto Loan desde el cuerpo de la solicitud
        loan.bookcode = req.body.bookcode;
        loan.usercode = req.body.usercode;
        loan.date = req.body.date;
        loan.deliverymaxdate = req.body.deliverymaxdate;
        loan.deliverydate = req.body.deliverydate;

        // Guardar en la base de datos MySQL
        Loan.create(loan).then(result => {
            res.status(200).json({
                message: "Upload Successfully a Loan with orderid = " + result.orderid,
                loan: result,
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail!",
            error: error.message
        });
    }
}

exports.retrieveAllLoans = (req, res) => {
    // Encontrar toda la información de los préstamos
    Loan.findAll()
        .then(loanInfos => {
            res.status(200).json({
                message: "Get all Loans' Infos Successfully!",
                loans: loanInfos
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

// Obtener un préstamo por ID de orden
exports.getLoanByOrderId = (req, res) => {
    let loanOrderId = req.params.orderid;
    Loan.findByPk(loanOrderId)
        .then(loan => {
            res.status(200).json({
                message: "Successfully Get a Loan with orderid = " + loanOrderId,
                loan: loan
            });
        })
        .catch(error => {
            console.log(error);

            res.status(500).json({
                message: "Error!",
                error: error
            });
        });
}

// Actualizar un préstamo por ID de orden
exports.updateByOrderId = async (req, res) => {
    try {
        let loanOrderId = req.params.orderid;
        let loan = await Loan.findByPk(loanOrderId);

        if (!loan) {
            res.status(404).json({
                message: "Not Found for updating a Loan with orderid = " + loanOrderId,
                loan: "",
                error: "404"
            });
        } else {
            let updatedObject = {
                bookcode: req.body.bookcode,
                usercode: req.body.usercode,
                date: req.body.date,
                deliverymaxdate: req.body.deliverymaxdate,
                deliverydate: req.body.deliverydate
            }
            let result = await Loan.update(updatedObject, { returning: true, where: { orderid: loanOrderId } });

            if (!result) {
                res.status(500).json({
                    message: "Error -> Cannot update a Loan with orderid = " + req.params.orderid,
                    error: "Cannot Updated",
                });
            }

            res.status(200).json({
                message: "Update successfully a Loan with orderid = " + loanOrderId,
                loan: updatedObject,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Cannot update a Loan with orderid = " + req.params.orderid,
            error: error.message
        });
    }
}

// Eliminar un préstamo por ID de orden
exports.deleteByOrderId = async (req, res) => {
    try {
        let loanOrderId = req.params.orderid;
        let loan = await Loan.findByPk(loanOrderId);

        if (!loan) {
            res.status(404).json({
                message: "Does Not exist a Loan with orderid = " + loanOrderId,
                error: "404",
            });
        } else {
            await loan.destroy();
            res.status(200).json({
                message: "Delete Successfully a Loan with orderid = " + loanOrderId,
                loan: loan,
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Error -> Cannot delete a Loan with orderid = " + req.params.orderid,
            error: error.message,
        });
    }
}
