/**
 * Created by Preneesh on 12-06-2016.
 */
var Sub =  require('../schemas/submissions');

/*module.exports.getSub = function (req,res) {
  console.log("getting project details");
  var conditions = {title: req.query.title};
  Sub.findOne(conditions,function (err,result) {
    if(err){throw err}
    res.json(result);
    console.log("Submission was successful");
  });
};
*/
module.exports.postSub = function (req, res) {
  console.log("Updating Project details");
  var conditions = {title: req.body.title};
  var update =  {$set: req.body};
  User.findOneAndUpdate(conditions, update, function(err,result){
    if(err) {throw err;}
    else {
      res.json(result);
      console.log("Submission was successful");
    }
  });
};