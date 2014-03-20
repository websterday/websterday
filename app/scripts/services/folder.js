'use strict';

angular.module('bookmarksApp')
    .factory('Folder', ['$resource', '$cookieStore', 'WS', function($resource, $cookieStore, WS) {
        return $resource(WS.url + '/folders/:id?token=' + $cookieStore.get('token'), {}, {
            // get: {method:'GET', params:{id: '@id'}},
            post: {method:'POST'},
            put: {method:'PUT', params:{id: '@id'}},
            delete: {method:'DELETE', params:{id: '@id'}}
        });
    }]);