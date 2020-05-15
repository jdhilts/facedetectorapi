const handleSignin = (req, res, database, bcrypt) => {
	const {password, email} = req.body;
  if(!password || !email){
    res.status(400).json('You must enter a password and email.');
  } else {
	database.select('email', 'hash').from('login').where('email', '=',email)
	.then(data => {
		const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return database.select('*').from('users')
          .where('email', '=', email)
          .then(user => {
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user'))
      } else {
        res.status(400).json('wrong credentials')
      }
    })
    .catch(err => res.status(400).json('wrong credentials'))
  }
}

module.exports = {
	handleSignin: handleSignin
}
