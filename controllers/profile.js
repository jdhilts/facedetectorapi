const handleGetProfile = (req, res, database) => {
	const {id} = req.params;
	let found = false;
	database.select('*')
	.from('users').where({
		id: id
	})
	.then(res => res.json(user[0]));
	if(!found){
		res.status(404).json('User not found.')
	}
}

module.exports = {
	handleGetProfile: handleGetProfile
}

