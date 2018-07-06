var myApp = angular.module('fileUpload', ['ngFileUpload']);


myApp.controller('AppCtrl', ['$scope', '$http','Upload', '$window', function($scope, $http, Upload, $window) {
    console.log("Hello World from controller");



    var vm = this;
    vm.submit = function(){ //function to call on form submit
        if (vm.upload_form.file.$valid && vm.file) { //check if from is valid
            vm.upload(vm.file); //call upload function
        }
    } 
    
    vm.upload = function (file) {
        Upload.upload({
            
            url: 'http://localhost:5000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
                $window.alert('Success ' + resp.config.data.file.name + ' Response: Image Uploaded');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            vm.progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    };



    $http({
        method: 'GET', 
        url: '/api/all'
    }).then(function (response) {
        console.log(response, 'res');
       const data = response.data;
       $scope.contactlist = data;
    },function (error){
        console.log(error, 'can not get data.');
    });
    

    





    /*person1 = {
        name : 'Asif',
        age : '25',
        location : 'Hyderabad'
    };

    person2 = {
        name : 'Basharath',
        age : '22',
        location : 'Bangalore'
    };

    person3 = {
        name : 'Shabbir',
        age : '35',
        location : 'Delhi'
    };

    var contactlist = [person1, person2 , person3];

    $scope.contactlist = contactlist;*/

}]);

