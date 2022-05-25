var fs = require('fs');
var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  let name = ""

  if(req.query['name'] !== undefined){
    name = "-" + req.query['name']
  }

  try{
    // 6. 동기 방식으로 파일을 생성. 함수의 인자는 앞에서 부터 순서대로 파일명, 입력데이터, 인코딩
    fs.appendFileSync('./public/logs'+name+'.txt', Date(Date.now()) + " : " +  req.query['log'] + "\n", 'utf-8');
    res.status(200).json({status: "success", name: name, log: req.query['log']})
  }catch(e){
    console.log(e);
    res.status(400).json({status: "error", name: name, log: req.query['log']})
  }
  
});

/* GET home page. */
router.get('/view', function(req, res, next) {

  try{

    let lists = fs.readdirSync("./public")
    let result = ""

    for(var i=0; i < lists.length; i++){
      console.log(lists[i])
      result += lists[i] + "<br>"
    }

    res.status(200).send(result)
  } catch(e){
    console.log(e);
    res.status(400).json({status: "error"})
  }

});

module.exports = router;
