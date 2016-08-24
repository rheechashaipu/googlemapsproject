//My array of hardcoded locations

var defaultLocations = [

    {
        title: "Smithsonian National Museum of Natural History",
        location: {
            lat: 38.908418,
            lng: -77.022586
        }
    }, {
        title: "Smithsonian National Museum of American History",
        location: {
            lat: 38.891081,
            lng: -77.030244
        }
    }, {
        title: "National Gallery of Art",
        location: {
            lat: 38.891266,
            lng: -77.019945
        }
    }, {
        title: "Newseum",
        location: {
            lat: 38.893015,
            lng: -77.019242
        }
    }, {
        title: "National Portrait Gallery",
        location: {
            lat: 38.897706,
            lng: -77.023245
        }
    }
]

var map;

//this function initializes the map

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.905206,
            lng: -77.035511
        },
        scrollwheel: false,
        zoom: 14
    });
    //console.log("init map");
}


// TASKS:
// - Add API call
// - Bounce the marker when clicked
// - Trigger the infowindow/bounce when the list item is clicked


var Place = function(data) {
  var self = this;
  self.title = data.title;
  self.location = data.location;

  self.marker = new google.maps.Marker({
    position: self.location,
    map: map,
    title: self.title,
    animation: google.maps.Animation.DROP
  });


  var infowindow = new google.maps.InfoWindow({
    content: self.title
  });

  console.log(self);

  //why does line84 work?
  self.open = google.maps.event.addListener(self.marker, 'click', function(){
    infowindow.open(map, self.marker);
  });



}


var AppViewModel = function() {
    //console.log("AppViewModel");
  var self = this;

   self.locationsObservableArray = ko.observableArray([]);

   defaultLocations.forEach(function(defaultLocation) {
        self.locationsObservableArray.push(new Place(defaultLocation))
    });

   // this holds the current filter -- bind this to the input
   self.filter = ko.observable('');


  self.filteredLocations = ko.computed(function() {
    // if the filter is empty, we should return whole array
    if (self.filter() === '') {
      // make markers visible
      self.locationsObservableArray().forEach(function(location) {
        location.marker.setVisible(true);
      });
      // return the whole array
      return self.locationsObservableArray();
    }

    var tempArray = [];
    // loop through the locations
    self.locationsObservableArray().forEach(function(location) {
      // if the location's title matches self.filter...
      if (location.title.indexOf(self.filter()) > -1) {
        // make the marker visible
        location.marker.setVisible(true);
        // push the location to the temporary array
        tempArray.push(location);
      } else {
        // hide the marker
        location.marker.setVisible(false);
      }
    });
    // return the temporary array
    return tempArray;
   });



   //console.log(this.locationsObservableArray());

}


//Is this still following the idea of async loading?
//The idea of this function is to load the map and apply bindings after the google api loads
function startApplication(){
	initMap();
	ko.applyBindings(new AppViewModel);
}

