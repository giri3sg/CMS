/**
 * Created by Girish on 5/9/2016.
 */


var Chair   = require('../schemas/chair');
var Sub =  require('../schemas/submissions');
var User   = require('../schemas/users');

module.exports.getDeadlines = function (req, res){
  Chair.findOne(req.query, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.json(doc);
  });
};
module.exports.putDeadlines = function (req, res){
  data = req.body
  Chair.findOneAndUpdate(req.query,data, {upsert:true}, function(err, doc){
    if (err) return res.send(500, { error: err });
    return res.send(doc);
  });
};

module.exports.assignPapers = function (req,res) {
  console.log(req.body)
  var update = null
  Sub.findOneAndUpdate({"_id":req.body.sub},{$set:{reviewer:req.body.rev}},function (err,res) {
    if (err) return res.send(500, { error: err });
    console.log(res)
    User.findOneAndUpdate({"_id":req.body.rev},{$push:{assigned_submissions:req.body.sub}},function (err,res) {
      if (err) return res.send(500, { error: err });
      console.log(res)
    })
  })

}