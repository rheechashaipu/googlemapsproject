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

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 38.905206,
            lng: -77.035511
        },
        scrollwheel: false,
        zoom: 14
    });
    console.log("init map");
}





var AppViewModel = function() {
    console.log("AppViewModel");
   var self = this;

   var place = function(data) {
        this.title = data.title;
        this.location = data.location;

       
        this.marker = new google.maps.Marker({
        	position: this.location,
        	map: map,
        	title: this.title
        });

        //console.log(this.marker.position.lng());

        var infowindow = new google.maps.InfoWindow({
        	content: "Sample"
        });

        this.marker.addListener('click', function(){
        	console.log("listener is working");
        	console.log(this.title);
        	infowindow.open(map, this.marker);
    	});
       
    }

   self.locationsObservableArray = ko.observableArray([]);

   defaultLocations.forEach(function(defaultLocation) {
        self.locationsObservableArray.push(new place(defaultLocation))  
    });


   //console.log(this.locationsObservableArray());

}


//Is this still following the idea of async loading?
function startApplication(){
	initMap();
	ko.applyBindings(new AppViewModel);
}

