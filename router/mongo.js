const express = require('express');

const router = express.Router();

var mongoose = require('mongoose');

mongoose.connect('mongodb://192.168.99.101', function(err) {
	if (err) {
		throw err;
	}
});

router.get('/add', (req, res) => {
	var commentaireArticleSchema = new mongoose.Schema({
		pseudo: { type: String, match: /^[a-zA-Z0-9-_]+$/ },
		contenu: String,
		date: { type: Date, default: Date.now }
	});

	var CommentaireArticleModel = mongoose.model('commentaires', commentaireArticleSchema);

	var monCommentaire = new CommentaireArticleModel({ pseudo: 'Atinux' });
	monCommentaire.contenu = 'Salut, super article sur Mongoose !';

	monCommentaire.save(function(err) {
		if (err) {
			throw err;
		}
        console.log('Commentaire ajouté avec succès !');
        res.send("article added successfully");
		// On se déconnecte de MongoDB maintenant
	});
});

module.exports = router;
