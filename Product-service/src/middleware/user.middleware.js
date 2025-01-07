
let user = async function(req, res, next) {
    req.user = {
        seller_id: req.headers['id'],

    };
    res.set(req.user);
    next();
    
};
module.exports.user = user;
