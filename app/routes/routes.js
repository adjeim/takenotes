module.exports = function(app, db) {

	var ObjectID = require('mongodb').ObjectID;

	// Create
	app.post('/notes', (req, res) => {
		const note = { 
			text: req.body.body, 
			title: req.body.title
		};
		db.collection('notes').insert(note, (err, result) => {
			if (err) {
				res.send({ 'error': 'An error has occurred'});
			} else {
				res.send(result.ops[0]);
			}
		});
	});

	// Read
	app.get('/notes/:id', (req, res) => {
		const id = req.params.id;
		const contents = { _id: new ObjectID(id) };

		db.collection('notes').findOne(contents, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});

	// Update
	app.put('/notes/:id', (req, res) => {
		const id = req.params.id;
		const contents = { _id: new ObjectID(id) };
		const note = { 
			text: req.body.body, 
			title: req.body.title
		};

		db.collection('notes').update(contents, note, (err, result) => {
			if (err) {
				res.send('An error has occurred');
			} else {
				res.send(note);
			}
		});
	});

	// Destroy
	app.delete('/notes/:id', (req, res) => {
		const id = req.params.id;
		const contents = { _id: new ObjectID(id)};

		db.collection('notes').findOne(contents, (err, item) => {
			if (err) {
				res.send({ 'error': 'An error has occurred'});
			} else {
				res.send('Note ' + id + ' has been deleted');
			}
		});
	});

	// See all notes
	app.get('/notes', (req, res) => {

		db.collection('notes').find({}).toArray(function(err, notes) {
			if (err) {
				res.send({ 'error': 'An error has occurred'});
			} else {
				res.send(notes);
			}
		});
	});

};