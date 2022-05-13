function index(req, res){
    const logs= "Logs list";
    res.send(logs);
}


module.exports = {
    index: index
}