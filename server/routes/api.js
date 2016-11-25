var express = require('express');
var router = express.Router();

var heroes = [
	{id: 11, name: 'Mr. Nice'},
	{id: 12, name: 'Narco'},
	{id: 13, name: 'Bombasto'},
	{id: 14, name: 'Celeritas'},
	{id: 15, name: 'Magneta'},
	{id: 16, name: 'RubberMan'},
	{id: 17, name: 'Dynama'},
	{id: 18, name: 'Dr IQ'},
	{id: 19, name: 'Magma'},
	{id: 20, name: 'Tornado'}
];

/* GET home page. */
router.route('/heroes/:id?')
.get(function(req, res, next) {
  res.json(heroes);
})
.put(function(req, res, next){
	var name = req.body.name,
		id = req.params.id;

	heroes.forEach(function(d){
		if(d.id == id){
			d.name = name;
		}
	});
	res.send("success");
})
.post(function(req, res, next){
	var name = req.body.name,
		id = req.body.id,
		data = {id: id, name: name};

	heroes.push(data);
	res.json(data);	
})
.delete(function(req, res, next){
	var name = req.body.name,
		id = req.params.id;

	heroes = heroes.filter(function(d){
		return d.id != id;
	});
	res.send("success");
});

module.exports = router;
