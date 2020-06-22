const Clarifai = require('clarifai');

const app = new Clarifai.App({apiKey: 'f8f375522cb84928b24d11648ab9854c'});

const handleApiCall = (req, res) => {
app.models.predict('a403429f2ddf4b49b307e318f00e528b', req.body.input)
.then(data => res.json(data))
.catch(err => res.status(400).json('Unable to communicate with api.'))
}

const handleImage = (req, res, database) => {
	const {id} = req.body;
	database('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(error => res.status(400).json('Unable to update number of entries.'))
}

module.exports = {
	handleImage: handleImage,
	handleApiCall: handleApiCall
}