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

var a = 0, b;

let params = { 
  q: '*', 
  geocode: "40.4893538421231,-3.6827461557,10km",
  lang: "en",
  count: 100
}

function getResult(params){

	return new Promise((resolve, reject) =>{
	var result;
	T.get('search/tweets', params).then( (info) => {
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
		resolve (response.entities);
	
		 });
		})
 
 })
 }
 
 getResult(params).then((r)=> console.log(r));
