
module.exports = (sequelize, Sequelize) => {
	const Loan = sequelize.define('loan', {	
		orderid: {
			type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
	},
	  bookcode: {
			type: Sequelize.INTEGER
	},
		usercode: {
			type: Sequelize.INTEGER
	},
	  date: {
			type: Sequelize.DATE
  	},
	  deliverymaxdate: {
			type: Sequelize.DATE
	},
	  deliverydate: {
			type: Sequelize.DATE
    },
	
	});
	
	return Loan;
}