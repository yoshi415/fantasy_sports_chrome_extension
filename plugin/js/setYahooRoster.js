var daysToGo, set, datesSet,
    $startActivePlayers = $("#yui_3_18_1_2_1452795857865_4029"),
    $nextDay = $("#yui_3_18_1_2_1452795937368_4043");

var setStorage = chrome.storage.local.set,
    getStorage = chrome.storage.local.get;

// var setRoster = (function(daysToSet) {
//   var days = daysToSet;
//   return function () {
//     if (days === 0) {
//       console.log('days completed')
//       return;
//     }
//     days--;

//   }
// })();

getStorage([ "daysToGo", "set", "datesSet" ], function(settings) {
  daysToGo = settings.daysToGo || 7;
  set = settings.set || false;
  datesSet = settings.datesSet || {};
});

$(function() {
  var dateParam = window.location.search;
  if ($startActivePlayers.length && !datesSet[dateParam] && daysToGo !== 0) {
    $startActivePlayers.click();
    datesSet[dateParam] = true;
    daysToGo--;
    setStorage({ "daysToGo": daysToGo, "set": true });
    console.log("setting")
  }

  if (set) {
    $nextDay.click();
    setStorage({ "set": false });
    console.log("next day, with days to go: ", daysToGo)
  }

  if (daysToGo === 0) {
    datesSet = {};
    setStorage({ "datesSet": datesSet });
    console.log("resetting")
  }
});