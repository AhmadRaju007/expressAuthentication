function index(req, res){
    const sites= "Sites list";
    res.send(sites);
}


module.exports = {
    index: index
}