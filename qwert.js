const superagent = require('superagent');
const cheerio = require('cheerio');
const async = require('async');
const fs = require('fs');
const url = require('url');
const request = require('request');
const hupuUrl='http://pp.163.com/pp/#p=10&c=-1&m=3&page=1';

let ssr = [];
let allUrl = [];
let curCount = 0;

for(let i=1;i<=3;i++){
  hupuUrl2 = 'http://pp.163.com/pp/#p=10&c=-1&m=3&page='+i;
  superagent.get(hupuUrl2).end(function(err,res){
    if(err){
      return console.error(err);
    }
    let $=cheerio.load(res.text);

    $('.pic>a:first-child').each(function(idx,element){
      let $element = $(element);
      let href =url.resolve(hupuUrl2,$element.attr('href'));
      allUrl.push(href);
      curCount++;

      superagent.get(href).end(function(err,res){
        if(err){
          return console.error(err);
        }
        let $ = cheerio.load(res.text);
        let add=href;
        let title=$('.picset-title').text().trim();
        let tximg=$('#J-host-face a img').attr('src');
        let txname = $('.picset-author a').text().trim();
        let contentimg1 = $('.pic-area>img').attr('src');
        let contentimg2 = $('.pic-area>img').attr('src');
        let contentimg3 = $('.pic-area>img').attr('src');

        let Title=$('.picset-title').text().trim();
        savedImg($,Title);
        ssr.push({
          'tx':tximg,
          'name':txname,
          'pic':contentimg1,contentimg2,contentimg3
        });

        let stad = {
          "address":add,
          "title":title,
          "ID":txname,
          "touxiang":tximg,
          "pic1":contentimg1,
          "pic2":contentimg2,
          "pic3":contentimg3
        };
        let picArr =[contentimg1,contentimg2,contentimg3];
        savedImg($,title);
        fs.appendFile('data/result.json',JSON.stringify(stad),'utf-8',function(err){
          if(err){
            throw new Error("appendFile failled。。。");
          }
        });

        let lujin='data/'+title+'/';

        fs.exists('data/111',function(exists){
          if(!exists){
            fs.mkdir('data/111',function(err){
              if(err){
                throw(err);
              }

            });
            console.log('ye');
          }else {

            console.log(JSON.stringify(stad));
          }
        })
      })
    });
  });



}


function savedImg($,title){
  $('.pic-area>img').each(function(index,item){

    let new_title=title+index;
    let imgfile_name=new_title+'.jpg';
    let path=$(this).attr('src');
    request.head(path,function(err,res,body){
      if(err)
        console.error(err);
    });
    request(path).pipe(fs.createWriteStream('./image/'+new_title+'---'+imgfile_name));
  });
}
