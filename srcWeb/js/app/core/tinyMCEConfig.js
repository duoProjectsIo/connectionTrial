angular
    .module('core')
    .config(function () {
        //region TinyMCE
        tinyMCE.baseURL = '/bower_components/tinymce';
        tinyMCE.suffix = '.min';
        //endregion
    });