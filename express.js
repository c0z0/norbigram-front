express  = require('express');

var app = express();

app.get('/cool', (req, res) => {
	res.json({cool: 'muie'});
});

app.listen(3000, () => {
	console.log('listeing');
});
