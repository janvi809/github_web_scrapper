let cheerio = require("cheerio");
let request = require("request");
let getIssuesHtml= require("./issues");
function getReposPageHtml(url,topic){
request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
       // console.log(html);
        getReposLink(html);
    }
}

function getReposLink(html){
    let searchTool = cheerio.load(html);
let headingsArr = searchTool(".f3.color-text-secondary.text-normal.lh-condensed");

console.log(topic);
for(let i=0;i<8;i++){
  let twoAnchors =  searchTool(headingsArr[i]).find("a");
  let link = searchTool(twoAnchors[1]).attr("href");
  //console.log(link);
  let fullLink = `https://github.com${link}/issues`;
 let repoName = link.split("/").pop();
  getIssuesHtml(fullLink,topic,repoName);
}
console.log("'''''''''''''''''''''''''''''");
}
}
module.exports =getReposPageHtml;