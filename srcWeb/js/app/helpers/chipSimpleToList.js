angular
    .module('core')
    .factory('chipSimpleToList', function () {
        return {
            show: function(option){
                var self = this;

                self.readonly = option.readonly;
                self.selectedItem = option.selectedItem;
                self.searchText = option.searchText;
                self.autocompleteDemoRequireMatch = option.autoCompleteDemoRequireMatch;
                self.selectedValues = option.selectedValues;

                self.querySearch = querySearch;
                self.datas = loadData();
                self.transformChip = transformChip;

                /**
                 * Return the proper object when the append is called.
                 */
                function transformChip(chip) {
                    // If it is an object, it's already a known chip
                    if (angular.isObject(chip)) {
                        return chip;
                    }else{
                        // Otherwise, create a new one
                        return chip;
                    }
                }

                /**
                 * Search for datas.
                 */
                function querySearch (query) {
                    var results = query ? self.datas.filter(createFilterFor(query)) : [];

                    return results;
                }

                /**
                 * Create filter function for a query string
                 */
                function createFilterFor(query) {
                    var lowercaseQuery = angular.lowercase(query);

                    return function filterFn(data) {
                        return (data.indexOf(lowercaseQuery) === 0);
                    };

                }

                function loadData() {
                    return option.arrayValues.map(function (repo) {
                        repo = repo.toLowerCase();
                        return repo;
                    });
                }

                return self;
            }
        };
    });