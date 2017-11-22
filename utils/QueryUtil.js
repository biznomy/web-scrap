module.exports = {

    pageing: function(req) {
        limit = {};
        var page = req.query.page;
        var count = req.query.count;
        if (!page) { page = 1 }
        if (!count) { count = 200 }
        delete req.query.page;
        delete req.query.count;

        limit['page'] = page;
    	limit['limit'] = count;
        limit['skip'] = (count * (page-1));

    	return limit;
    }

}
