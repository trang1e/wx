function goPage(pno,psize){
  let itable=document.getElementById("idImg");
  let num=itable.rows.length;
  console.log(num);
  let totalPage=0;
  let pageSize=psize;
  if(num/pageSize>parseInt(num/parseInt)){
    totalPage=parseInt(num/pageSize)+1;
  }else{
  totalPage=parseInt(num/pageSize);}
  let currentPage=pno;
  let startRow=(currentPage-1) * pageSize+1;
  let endRow=currentPage * pageSize;
  console.log(endRow);
  for(let i=1;i<(num+1);i++){
    let irow=itable.rows[i-1];
    if(i>=startRow && i<=endRow){
      irow.style.display="block";
    }else{
      irow.style.display="none";
    }
  }

  var tempStr= "共"+num+"条记录 分"+totalPage+"页 当前页:"+currentPage;
  if(currentPage>1) {
    tempStr += "<a href=\"#\" onclick=\"goPage(" + (1) + "," + psize + ")\">首页</a>";
    tempStr += "<a href=\"#\" onClick=\"goPage(" + (currentPage - 1) + "," + psize + ")\">上一页</a>";
  }else{
      tempStr+="首页";
      tempStr+="上一页";
    }
    if(currentPage<totalPage){
      tempStr+="<a href=\"#\" onClick=\"goPage("+(currentPage+1)+","+psize+")\">下一页</a>"
      tempStr+="<a href=\"#\" onlick=\"goPage("+(totalPage)+","+psize+")\">尾页</a>"

    }else{
      tempStr+="下一页";
      tempStr+="尾页";
    }

    document.getElementById("button").innerHTML=tempStr;

}
