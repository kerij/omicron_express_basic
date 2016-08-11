var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');

var songs = []; //stores our songs

console.log(songs);

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: true }));
/**
 * POST /songs
 *
 * Places song into songs array
 */
app.post('/songs', function (req, res) {
  var song = req.body;
  var songMatch = false;
  var emptyField = false;

  //check to see if there are empty fields
  if (song.title == "" || song.artist == "") {
    var emptyField = true;
  }
  //if there are no songs in the array and the fields are not empty, put the first song in the array;

    for (var i = 0; i < songs.length; i++) {
      if (songs[i].title == song.title && songs[i].artist == song.artist) {
        songMatch = true;
        //insert a response here?
        break;
      }
    }

  //if there are emtpy fields, or the song has already been entered, error, else push to array
  if (songMatch == true || emptyField == true){
    console.log("nope");
    res.send({"message": "Duplicate or empty field"});
  } else {
    var currentDate = new Date();
    console.log(currentDate);
    currentDate = (currentDate.getMonth()+1)  + "/" + currentDate.getDate() + "/" + currentDate.getFullYear();
    console.log(currentDate);
    song.date = currentDate;
    songs.push(song);
    console.log(songs);
    res.sendStatus(200);
    }

});

app.get('/songs', function (req, res) {
  res.send(songs);
});

app.get('/*', function (req, res) {
  var file = req.params[0] || '/views/index.html';

  console.log('What is in req.params[0]?', req.params[0]);

  //console.log('dirname: ', __dirname);
  //console.log('path', path.join(__dirname, '../public', file));
  res.sendFile(path.join(__dirname, './public', file));
});

app.listen(app.get('port'), function () {
  console.log('Server now running at port ', app.get('port'));
});
