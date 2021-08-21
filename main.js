let url = "https://github.com/topics";
let cheerio = require("cheerio");
let request = require("request");
let pdfkit = require("pdfkit");
let getReposPageHtml = require("./reposPage");
request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }else{
        //console.log(html);
        getTopicLinks(html);
    }
}

function getTopicLinks(html){
    let $ = cheerio.load(html);
    let linkElemArr = $(".no-underline.d-flex.flex-column.flex-justify-center");
    // console.log(linkElemArr)
    for(let i =0;i<linkElemArr.length;i++){
       let href = $(linkElemArr[i]).attr("href");
       // console.log(href);
       let topic = href.split("/").pop();
       let fullLink = `https://github.com/${href}`;
          getReposPageHtml(fullLink,topic);
    }
}