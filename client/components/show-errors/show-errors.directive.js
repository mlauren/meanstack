'use strict';

/**
 * Visual directive for adding fixes to form
 */
angular.module('portfolioApp')
    .directive('showErrors', function() {
    return {
        restrict: 'A',
        require: '^form',
        link: function(scope, el, attrs, formCtrl) {
                // select child element
                var inputEl = el[0].querySelector('[name]');

                // Convert text box to angular element
                var inputNgEl = angular.element(inputEl);
                var inputName = inputNgEl.attr('name');

            inputNgEl.bind('blur', function() {
                el.toggleClass('has-error', formCtrl[inputName].$invalid);
            });
        }
    };
});