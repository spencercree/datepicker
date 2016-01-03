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

var app = angular.module("datepickerdemo", ["firebase", "ngMaterial"]);
app.controller("main", function($scope, $firebaseArray) {
  // Create a Firebase ref, see: https://firebase.com/docs/web/libraries/angular/guide
  var ref = new Firebase('https://datepickerdemo.firebaseio.com/dates');
  $scope.dates = $firebaseArray(ref);

  var windowHeight = window.innerHeight;
  document.getElementById('message').setAttribute('style', 'height:' + windowHeight + 'px');

  $scope.selectDates = function(){
    $scope.dates.$add({
      start_date : dateToString($scope.start_date),
      end_date : dateToString($scope.end_date)
    });

    $scope.start_date = "";
    $scope.end_date = "";
  };

  $scope.deleteDates = function(){
    ref.remove();
  };

  var dateToString = function(dateObj) {
    var day = dateObj.getDate();
    var month = dateObj.getMonth()+1;
    var year = dateObj.getFullYear();
    return month+'/'+day+'/'+year;
  };


  $scope.checkAvailable = function(date){
    if (!$scope.dates) {return false;}

    for(var i = 0; $scope.dates.length > i; i++) {
      if(new Date($scope.dates[i].start_date) <= date && new Date($scope.dates[i].end_date) >= date){
        return false;
      }else{}
    }
    return true;
  };

});
