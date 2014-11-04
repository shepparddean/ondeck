appServices.factory('ApplicationService', function($http) {

    return {
        
        /**
         * Get the owners on the application, if any;
         * 
         * @param  {[type]} applicationId [description]
         * @return {[type]}               [description]
         */
        getApplications: function() {
            return $http.get('/api/applications');
        }
    }

});