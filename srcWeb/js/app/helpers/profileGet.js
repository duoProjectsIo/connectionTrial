angular
    .module('core')
    .service('profileGet', function ($window, jwtHelper) {
        if($window.localStorage.token){
            var profile = jwtHelper.decodeToken($window.localStorage.token);
            return {
                id : profile.id,
                email : profile.email,
                name : profile.name,
                status : true
            }
        }else{
            return {
                status : false
            }
        }
    });