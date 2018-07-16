var http=require('http');
var fs=require('fs');
var cheerio=require('cheerio');
var request=require('request');

var i=0;
var url="http://m.juyouqu.com/qu/3187982";

function startSpider(x){
  console.log("向目标站点发送请求");
  http.get(x,function(res){
    var html='';
    var titles=[];
    res.setEncoding('utf-8');
    res.on('data',function(chunk){
      html+=chunk;
    });
    res.on('end',function() {
      var $ = cheerio.load(html);
      var news_item = {
        title: $('.item-title').text().trim(),
        imgSrc: $('.post-container img').attr('src'),
        link: $('.button').attr('href'),
        i: i = i + 1,
      };
      console.log(news_item);
      var news_title = $('.item-title').text().trim();
      savedImg($,news_title);
      var nextLink = "http://m.juyouqu.com" + $('.button').attr('href');
      if(i>0) {
        setTimeout(function () {
          startSpider(nextLink);
        }, 300)
      }
    });
    }).on('error',function(err){
      console.log(err);
    });

}
function savedImg($,news_title){
  $('.post-container img').each(function(index,item){
    var img_title=news_title+index;
    var img_filename=img_title+'.jpg';
    var img_src=$(this).attr('src');
    request.head(img_src,function(err,res,body){
      if(err){
        console.log(err);
      }
    });
    request(img_src).pipe(fs.createWriteStream('./image/'+img_title+'---'+img_filename));
  });
}
startSpider(url);
