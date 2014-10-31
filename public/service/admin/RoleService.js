/**
 * This service manages the Roles;
 * 
 * @param  {[type]} $http [description]
 * @return {[type]}       [description]
 * @author Dean Sheppard
 */
appServices.factory('RoleService', function($http) {
    return {


        /**
         * This method returns a collection of roles available in the system;
         * 
         * @return {[type]} [description]
         */
        getRoles: function() {
            return $http.get('/api/roles');
        },



        /**
         * Creates the new role
         * 
         * @param  {[type]} role [description]
         * @return {[type]}      [description]
         */
        saveRole: function(role) {
            console.log(role);

            return $http.post('/api/role', {
                name: role.name,
                code: role.code,
                description: role.description
            });

        }
    }
});