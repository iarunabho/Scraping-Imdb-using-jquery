const curl = require('curl');
const jsdom = require('jsdom');

const url = 'http://www.imdb.com/list/ls004489992/';

curl.get(url, null, (err, resp, body) => {
  if (resp.statusCode == 200) {
    parseData(body);
  } else {
    //some error handling
    console.log('Error while fetching url');
  }
});

function parseData(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = require('jquery')(dom.window);

  //let extract some data
  var items = $('.lister-item-content');
  for (var i = 0; i < items.length; i++) {
    var innerInfo = $(items[i]).children('h3');
    var movieName = $($(innerInfo).find('a')[0]).html();
    var movieYear = $($(innerInfo).find('.lister-item-year')[0]).html();
    console.log(i + ' -> ' + movieYear + ':' + movieName);
  }
}
