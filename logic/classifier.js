const mongoose = require('mongoose');
const Twit = require('twit');
const config = require('../config');
let T = new Twit(config);
var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
var natural_language_understanding = new NaturalLanguageUnderstandingV1({
  'username': process.env.USERNAME,
  'password': process.env.PASSWORD,
  'version_date': process.env.VERSION_DATE
});

let params = { 
  q: '*', 
  geocode: "40.4893538421231,-3.6827461557,10km",
  lang: "en",
  count: 100
}

var twit = T.get('search/tweets', params).then( (info) => {
  var twitString = "";
   let tweets = info.data.statuses;
   for(let i=0; i< tweets.length; i++){
     twitString = twitString + " " + tweets[i].text.replace(/[&\/\\#,;.+()$~%.'":*?<>{}]/g,"");
    }
    return twitString;
  }).then((data) => {
    var parameters = {
      'text': data,
      'features': {
        'entities': {
          'emotion': true,
          'sentiment': true,
          'limit': 1,
        }
      }
    };
    natural_language_understanding.analyze(parameters, function(err, response) {
      if (err)
      console.log('error:', err);
    else
    var a = 0; 
    var b;
    for (var i = 0; i < 5; i++) {
      if ( a < Object.values(response.entities[0].emotion)[i]) a = Object.values(response.entities[0].emotion)[i]; b = Object.getOwnPropertyNames(response.entities[0].emotion)[i];
    }
    console.log(a, b);
  });
 });
