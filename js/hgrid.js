/*!
 * H-Grid is a jQuery Based Plugin
 *
 * Author: Himadhar H
 * github: https://github.com/himadhar/h-grid
 *
 * Date: 2016-05-24T12:59Z
 */
 
 /*globals jQuery:false */
(function ($) {
    'use strict';
    $.fn.hgrid = function (options) {
        //variables needed to execute the below logic
        options = $.extend({
            //basic
            data: [], // array of object used to iterate
            headers: [], // array of string items consisting title for each th of thead
            headerRequired: true, //boolean to confirm if header is required or not
            footers: [], // array of string items consisting title for each th of tfoot
            footerRequired: true, //boolean to confirm if footer is required or not
            dataOrder: [], // array of string items consisting key values in the order as that of headers
            height: '350px', //type int - value should be in px or %
            width: '100%', //type int - value should be in px or %
            showTitle: true, //display title if necessary
            title: 'H-Grid', //display title if necessary
            
            //controls
            paginationRequired: true, // boolean flag to check if pagination is required or not
            paginateForEach: 10, //type int - count of records for that should display per pagination
            paginateControl: 'dropdown', //pagination can be a dropdown or a pagination-controller with a list of numbers ['dropdown', 'buttons']
            paginateClassPrefix: 'paginateController', //class of the pagination controller if its a dropdown
            includeSerialNumber: true, //set as false if serial number column is not required
            
            //containers
            tableClass: 'hGridContainer', // class for the table
            theadClass: 'hGridHeaderContainer', // class for the table thead
            tbodyClass: 'hGridBodyContainer', // class for the table thead
            tfootClass: 'hGridFooterContainer', // class for the table thead
            oddRowClass: 'oddRow', // class for the each odd row
            evenRowClass: 'evenRow',// class for the each even row
            
            //methods
            paginateDropdownChange : function() {} // custom method to act while its a pagninate-dropdown chosen and triggers within the onchange method
        }, options);

        // slider rendering method below
        var buildGrid = function () {
            // plugin level variables            
            if (this.length === 0) return this;
            var currentContainer = this;
            var totalPages = 0;
            var currentPage = 0;
            var paginateSelector = '';
            
            // begin the plugin action
            init();

            function init() {
                if(options.data.length <= 0) {
                    console.log('Pass an array of objects to build the data');
                    return false;
                } else {
                    buildTableContent();
                }
            }
            
            function buildTableContent() {
                // if title is required then, show title
                var tableStr = (options.showTitle) ? ('<h3>' + options.title + '</h3>') : '';
                
                // if pagination is required then build the pagination control
                if(options.paginationRequired && options.paginateForEach < options.data.length) {
                    tableStr += buildPaginationControls();
                }
                
                //initialize table content
                tableStr += '<table class="' + options.tableClass + '">';
                
                //build header content if header data are provided
                if(options.headerRequired && options.headers.length > 0 && options.headers.length == sizeOfObject(options.data[0])) {
                    tableStr += buildTableHeader();
                }
                
                //build body content
                currentPage = 0;
                tableStr += '<tbody class="' + options.tbodyClass + '">' + buildTableBodyContent() + '</tbody>';
                
                //build header content if footer data are provided
                if(options.footerRequired && options.footers.length > 0 && options.footers.length == sizeOfObject(options.data[0])) {
                    tableStr += buildFooterHeader();
                }
                tableStr += '</table>';
                
                updateTableContent(tableStr);
            }
            
            function updateTableContent(tableContent) {
                $(currentContainer).empty().append(tableContent);
                setTimeout(function() {
                    if(options.paginateControl == 'dropdown') {
                        $('.' + paginateSelector).change(updateTableBody);
                    }
                }, 1000);
            }
            
            // function that returns the table header string
            function buildTableHeader() {
                var theadStr = '<thead class="' + options.theadClass + '">';
                theadStr += (options.includeSerialNumber) ? '<th class="serial-number">Sr No.</th>' : '';
                 for(var i=0; i< options.headers.length; i++) {
                    theadStr += '<th>' + options.headers[i] + '</th>';
                }
                theadStr += '</thead>';
                return theadStr;
            }
            
            function buildTableBodyContent() {
                var bodyStr = '';
                var maxLength = 0;
                if(totalPages > 1) {
                    if((currentPage + options.paginateForEach) < options.data.length) {
                        maxLength = options.paginateForEach;
                    } else {
                        maxLength = options.data.length;
                    }
                } else {
                    maxLength = options.data.length;
                }
                for(var i = 0; i < options.paginateForEach; i++) {
                    bodyStr += '<tr id="rowIndex' + (currentPage+1) + '">';
                    if(currentPage < maxLength) {
                        bodyStr += (options.includeSerialNumber) ? '<td class="serial-number">' + (currentPage+1) + '</td>' : '';
                    
                        var temp = options.data[currentPage];
                        // build each row in tbody
                        for(var key in temp) {
                            if(temp.hasOwnProperty(key)){
                                bodyStr += '<td>' + temp[key] + '</td>';                                
                            }
                        }
                    } else {
                        bodyStr += (options.includeSerialNumber) ? '<td class="serial-number">&nbsp;</td>' : '';
                        
                         for(var j=0; j < options.headers.length; j++) {
                            bodyStr += '<td>&nbsp;</td>';
                        }                        
                    }
                    bodyStr += '</tr>';
                    currentPage++;
                }
                return bodyStr;
            }
            
            function buildFooterHeader() {
                var tfootStr = '<tfoot class="' + options.tfootClass + '">';
                tfootStr += (options.includeSerialNumber) ? '<td class="serial-number">&nbsp;</td>' : '';
                 for(var i=0; i< options.footers.length; i++) {
                    tfootStr += '<td>' + options.footers[i] + '</td>';
                }
                tfootStr += '</tfoot>';
                return tfootStr;
            }
            
            // function that returns the pagination control string
            function buildPaginationControls() {
                var pagninateStr = '';
                
                totalPages = Math.ceil(options.data.length / options.paginateForEach);
                if(options.paginateControl == 'dropdown') {
                    paginateSelector = options.paginateClassPrefix + 'Dropdown';
                    pagninateStr = buildDropdownPaginator();
                }
                return pagninateStr;                
            }
            
            // function that returns the pagination control string
            function buildDropdownPaginator() {
                var ret = '<select class="' + paginateSelector + '">';
                for(var i = 1; i <= totalPages; i++) {
                    ret += '<option value="' + i + '">' + i + '</option>';
                }
                ret += '</select>';
                return ret;                
            }
            
            var updateTableBody = function(e) {
                e.preventDefault();
                currentPage = (parseInt($(this).val()) - 1) * options.paginateForEach;
                var updatedBodyStr = buildTableBodyContent();
                $(currentContainer).find('tbody').empty().append(updatedBodyStr);
                options.paginateDropdownChange();
            };
            
            function sizeOfObject(obj) {
                var len = 0;
                for(var key in obj) {
                    if(obj.hasOwnProperty(key)){
                        len++;
                    }
                }
                return len;
            }
        };
        return this.each(buildGrid);
    };
}(jQuery));