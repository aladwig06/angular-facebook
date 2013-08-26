'use strict';

/* Controllers */

function contactsController($scope, $location, $dialog){
    
    FB.login(function(response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          //FB.api('/me', function(response) {
          //  console.log('Good to see you, ' + response.name + '.');
          //});
          
          FB.api('/me/home', { limit: 10 }, function(response) {
            console.log("fetching " + response);
            $scope.$apply(function(){
                $scope.posts = response.data;
            });
          });
          
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      });


                            
}

function contactDetailController($scope, $location, $routeParams){
    
     $.ajax({
        type: "GET",
        url: "http://localhost:8000/contacts/" + $routeParams.id,
        success: function(data){
            var myData = angular.fromJson(data);
            $scope.$apply(function(){
                $scope.contact = myData;
            });
        },
        error: function(data){
             console.log('error' + data);
        }
    
   });
     
        $scope.removeContact = function(){
          
           
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8000/contacts/" + $routeParams.id,
            success: function(){
                
                $scope.$apply(function(){
                    $location.path('/contacts');    
                });
                
                
            },
            error: function(err){
                $scope.response = "Error occured: " + err;
            }
            
        });
        
    } 
}

function newContactController($scope, $location, dialog){
    //was $scope.addNewContact
    $scope.close = function(newContact){
        console.log('adding new contact ' + $scope.newContact);
        $.ajax({
            type: "POST",
            url: "http://localhost:8000/contacts",
            data: $scope.newContact,
            success: function(data){
                
                $scope.$apply(function(){
                   dialog.close();
                    $location.path('/contacts');    
                });
            },
            error: function(data){
                var myData = angular.fromJson(data);
                $scope.response = myData;
            }
            
            
            
        });
    }
    
    
}

