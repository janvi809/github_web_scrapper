let cheerio = require("cheerio");
let request = require("request");
let fs = require("fs");
let path = require("path");
let pdfkit = require("pdfkit");
function getIssuesHtml(url,topic,repoName){
request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
       // console.log(html);
        //getReposLink(html);
        getIssues(html);
    }
}

function getIssues(html){
    let $ = cheerio.load(html);
    let issuesElemArr = $(".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title");
   let arr =[];
   for(let i=0;i<issuesElemArr.length;i++){
       let link = $(issuesElemArr[i]).attr("href");
      // console.log(link);
       arr.push(link);

   }
  // console.log(topic,"       ",arr);
  let folderpath=path.join(__dirname,topic);
  dirCreator(folderpath);
  let filePath = path.join(folderpath,repoName + ".pdf");
  let text = JSON.stringify(arr);
  let pdfDoc = new pdfkit;
  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.text(text);
  pdfDoc.end();
  //fs.writeFileSync(filePath,);
}
}

module.exports = getIssuesHtml;

function dirCreator(folderpath){
   if(fs.existsSync(folderpath) == false){
       fs.mkdirSync(folderpath);
   }
}