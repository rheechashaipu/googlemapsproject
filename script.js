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
    },
       {
        title: "Smithsonian National Air and Space Museum",
        location: {
            lat:38.888386,
            lng: -77.019868
            }
    },
      {
       title: "National Mall",
       location: {
            lat: 38.8896, 
            lng: -77.0230
       }
   },
    {
     title: "Lincoln Memorial",
     location: {
        lat: 38.889486,
        lng: -77.050165
     }
    },
    {
     title: "Washington Monument",
     location: {
        lat: 38.8895,
        lng: -77.0353
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


    //togglebounce here will bounce the marker a couple times when the marker is clicked.
    //this could probably somehow be reconciled with the other togglebounce function to avoid repetition

        function toggleBounce() {
        //console.log(location, 'togglebounce');
        if (self.marker.getAnimation() !== null) {
            self.marker.setAnimation(null);
        } else {
            self.marker.setAnimation(google.maps.Animation.BOUNCE);
            //
            setTimeout(function(){self.marker.setAnimation(null);}, 2000);
        }
    }

    self.marker.addListener('click', toggleBounce);
    



    //addListener opens infowindow when marker is clicked
    google.maps.event.addListener(self.marker, 'click', function() {

        var infowindow = new google.maps.InfoWindow();

        var content;

        //infowindow.open(map, self.marker);

        placeTitle = self.title;
        //console.log(placeTitle);


        var wikiURL = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search='+placeTitle+'&namespace=0&limit=1&suggest=1';

        //console.log(wikiURL);
        //ajax call to get wikipedia content when infowindow is opened

        $.ajax({
            url: wikiURL,
            dataType: "jsonp",
            success: function(response){
                //console.log(response);

                var contentString = response[2];
                var wikiLink = response[3];

                //console.log(contentString);

                infowindow.setContent(placeTitle+'<br>'+'<p>'+contentString+'</p>'+'<br>'+
                    wikiLink);
            },
            error: function(){
                infowindow.setContent('Error! Wikipedia content did not load.');
            }

        });

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


    //the filteredLocations decides whether or not the filter is being utilized and...
    //...outputs the appropriate array
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



    //make marker bounce when corresponding list item is clicked
    self.markerBounce = function(location) {
        toggleBounce(location.marker);
    };

    //toggleBounce code is called in markerBounce, makes marker bounce a couple times
    function toggleBounce(location) {
        //console.log(location, 'togglebounce');
        if (location.getAnimation() !== null) {
            location.setAnimation(null);
        } else {
            location.setAnimation(google.maps.Animation.BOUNCE);
            //
            setTimeout(function(){location.setAnimation(null);}, 2000);
        }
    }

}


//Is this still following the idea of async loading?
//The idea of this function is to load the map and apply bindings after the google api loads
function startApplication() {
    initMap();
    ko.applyBindings(new AppViewModel);
}