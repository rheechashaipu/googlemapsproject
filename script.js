function AppViewModel() {

    //initializing variables to center map over a default location
    var map;
    var current_lat = 38.907032;
    var current_lng = -77.042672;
    var current_location = {
        lat: current_lat,
        lng: current_lng
    };

    var locationsArray = ko.observableArray();

    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: {
                lat: current_lat,
                lng: current_lng
            },
            zoom: 14
        });
    }

    initMap();

    //requests nearby museums, aquariums, and art galleries

    var request = {
        location: current_location,
        radius: '3000',
        types: ['museum', 'aquarium', 'art_gallery']
    };

    service = new google.maps.places.PlacesService(map);

    service.nearbySearch(request, callback);

    function callback(results, status) {

        return results
    }

    callback();
    console.log(results);


    function createMarker(place) {
        var placeLoc = place.geometry.location;
        var infowindow = new google.maps.InfoWindow({
            content: "sample"
        });
        var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
        });
        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    }

    console.log(locationsArray());
}

ko.applyBindings(new AppViewModel());