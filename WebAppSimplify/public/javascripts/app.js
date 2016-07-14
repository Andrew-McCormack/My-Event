/**
 * Created by Thomas on 5/28/2015.
 */
var app = angular.module('eventApp', []);

app.service("EventService", function(){

    eventService.save = function(entry){
        eventService.date.push(entry);
    };

    return eventService;

});

app.controller("HomeController", ["$scope", function($scope) {

    $scope.appTitle = "Event"

}]);

app.controller("EventItemsController", ["$scope", "$routeParams", "$location", "GroceryService", function($scope, $routeParams, $location, EventService){

    $scope.eventItem = {date: new Date()}


    $scope.save = function(){
        EventService.save( $scope.eventItem );
        $location.path("/");
    }

}]);