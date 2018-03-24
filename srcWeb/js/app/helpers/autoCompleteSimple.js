angular
    .module('core')
    .service('autoCompleteSimple', function ($timeout, $q, $log) {
        return {
            show: function(option){
                var self = this;

                self.simulateQuery = option.simulateQuery ;
                self.isDisabled    = option.isDisabled;
                self.noCache = option.noCache;

                self.repos         = loadAll();
                self.querySearch   = querySearch;
                self.selectedItemChange = selectedItemChange;
                self.searchTextChange   = searchTextChange;

                self.selectedItem = option.selectedItem;

                function querySearch (query) {
                    var results = query ? self.repos.filter( createFilterFor(query) ) : self.repos,
                        deferred;
                    if (self.simulateQuery) {
                        deferred = $q.defer();
                        $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
                        return deferred.promise;
                    } else {
                        return results;
                    }
                }

                function searchTextChange(text) {
                    /*$log.info('Text changed to ' + text);*/
                }

                function selectedItemChange(item) {
                    /*$log.info('Item changed to ' + JSON.stringify(item));*/
                }

                /**
                 * Build `components` list of key/value pairs
                 */
                function loadAll() {
                    return option.arrayValues.map( function (repo) {
                        repo.value = repo.name.toLowerCase();
                        return repo;
                    });
                }

                /**
                 * Create filter function for a query string
                 */
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);

                    return function filterFn(item) {
                        return (item.value.indexOf(lowercaseQuery) === 0);
                    };

                }

                return self;
            }
        };
    });