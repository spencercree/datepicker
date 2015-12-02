/*
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var fs = require('fs');
var exec = require('child_process').exec;
var RSVP = require('rscp');

function replaceStringInFile(path, find, replace) {
  return new RSVP.Promise(function (resolve, reject) {
    fs.readFile(__dirname + '/' + path, 'utf8', function(error, data) {
      if (err) {
        reject('Error reading file ' + __dirname + '/' + path + ': ' + error);
      }
    
      var replacedFile = data.replace(find, replace);
    
      fs.writeFile(__dirname + '/' + path, replacedFile, function(error) {
        if (err) {
          reject('Error writing file ' + __dirname + '/' + path + ': ' + error);
        } else {
          resolve();
        }
      });
    });
  });
}

function main(name) {
  // Namespace renaming

  return RSVP.all([
    replaceStringInFile('./js/app.js', /<YOUR-FIREBASE-APP>/g, name),
    replaceStringInFile('./html/index.html', /<YOUR-FIREBASE-APP>/g, name),
    replaceStringInFile('./bower.json', /<YOUR-FIREBASE-APP>/g, name)
  ]);

  // npm install bower (if not exists)
  //exec("npm install -g bower", function () {console.log(arguments)});

  // bower install
  //exec("bower install", function () {console.log(arguments)});
}

module.exports = {
  setup: main
}
