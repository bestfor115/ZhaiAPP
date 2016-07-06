var http = require('http');

var AutoScore={
  doScore: function(){
  var url='http://s2.jply.net:89/function/gongzi.php?accName=bestfor11111&time=1466776982&token=13762d06ad1ba52d74476df807d538ef';
  setInterval(function(){
 http.get(url, function(res) { 
  console.log("Got response: " + res.statusCode); 
  res.on('data', function(data) {  
    console.log("Got data: " + data);  
  });  
}).on('error', function(e) { 
console.log("Got error: " + e.message); 
});
},30*60*1000);
  }
}

var Test = {
  init: function(app){
    app.get('/test/test', this.doTest);
    app.get('/test/show', this.doShow);
    app.get('/test/autoScore', this.doAutoScore);

  },

  doTest: function(req, res){
    res.send({
      status: 1,
      info: '测试服务doTest'
    });
  },
  doAutoScore: function(req, res){
    AutoScore.doScore();
    res.send({
      status: 1,
      info: '启动成功'
    });
  },

  doShow: function(req, res){
    res.json({
      status: 1,
      info: '测试服务doShow'
    });
  }
};

module.exports = Test;