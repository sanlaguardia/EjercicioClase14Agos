
module.exports = (sequelize, Sequelize) => {
	const Book = sequelize.define('book', {	
		code: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
	},
	  name: {
			type: Sequelize.STRING
	},
		editorial: {
			type: Sequelize.STRING
	},
	  author: {
			type: Sequelize.STRING
  	},
	  genre: {
			type: Sequelize.STRING
	},
	  country: {
			type: Sequelize.STRING
    },
		pages: {
			type: Sequelize.INTEGER
	},
		year: {
			type: Sequelize.INTEGER
  	},
	  	price: {
			type: Sequelize.INTEGER
  	},
	
	});
	
	return Book;
}