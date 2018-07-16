let cheerio=require('cheerio');
let fs=require('fs');
let request=require('request');
const http=require('https');
let i=0;

let url="https://www.douban.com/group/topic/71981316/";

function fetchPage(x){
  startSpider(x);
}

function startSpider(x){
  http.get(x,function(res){
    let html='';
    res.setEncoding('utf-8');
    res.on('data',function(chunk){
      html+=chunk;
    });
    res.on('end',function(){
      let $=cheerio.load(html);
      let news_item={
        imgSrc:$('.topic-figure cc img').attr('src'),
        i:i=i+1,
        title:i+1,
      };
      console.log(news_item);
      let news_imgSrc=i+1;
      savedImg($,news_imgSrc);
    });
  }).on("error",function(){
    console.log(err);
  });
}


function savedImg($,news_imgSrc){
  $('.topic-figure cc img').each(function(index,item){
      let img_filename=news_imgSrc+'.jpg';
      let img_src=$(this).attr('src');
      request.head(img_src,function(err,res,body){
        if(err)
          console.error(err);
      });
      request(img_src).pipe(fs.createWriteStream('./image/'+img_filename));
  });
}

fetchPage(url);
