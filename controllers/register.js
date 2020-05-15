const handleRegister = (req, res, database, bcrypt) => {
	const {name, email, password} = req.body;
	if(!name || !email || !password){
		res.status(400).json('Some or all fields are empty.');
	} else {
		const hash = bcrypt.hashSync(password);
		database.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email 
			})
			.into('login')
			.returning('email')
			.then(loginEmail => {
				return trx('users')
				.returning('*')
				.insert({name: name, email: loginEmail[0], joined: new Date()})
				.then(user => res.json(user[0]))	
			})
			.then(trx.commit)
			.catch(trx.rollback)
		})		
		.catch(error => res.status(400).json("Error!"))	
	}
}

module.exports = {
	handleRegister: handleRegister
}
