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




   





var AppViewModel = function() {
    //console.log("AppViewModel");
   var self = this;

      var place = function(data) {
        this.title = data.title;
        this.location = data.location;
       
        this.marker = new google.maps.Marker({
        	position: this.location,
        	map: map,
        	title: this.title,
        	animation: google.maps.Animation.DROP
        });

      var infowindow = new google.maps.InfoWindow({
      	content: this.title
      });

      console.log(this);

      //why does line84 work? 
      this.open = google.maps.event.addListener(this.marker, 'click', function(){
      	infowindow.open(map, this);
      	console.log(this);
      });
	


        //console.log(this.marker.position.lng());  
    }



   self.locationsObservableArray = ko.observableArray([]);

   defaultLocations.forEach(function(defaultLocation) {
        self.locationsObservableArray.push(new place(defaultLocation))  
    });
   
   




   //console.log(this.locationsObservableArray());

}


//Is this still following the idea of async loading?
//The idea of this function is to load the map and apply bindings after the google api loads
function startApplication(){
	initMap();
	ko.applyBindings(new AppViewModel);
}

