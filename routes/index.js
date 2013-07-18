exports.index = function(req, res)
{
	res.render('index', { reg_errors: "", title: 'Main' });
};
