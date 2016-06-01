# H Grid

H Grid is a table view generating jQuery based plugin. I just started building this and will improve it over time and based on your feedback. Feel free to inform me anything that you feel must be incorporated here.

You can download the project to view the demo. 

To include the file, simply add this line in your project with correct path. Here, the path is "/js":
<br/>
<code>`<script src='js/hgrid.min.js'></script>`</code>

The plugin expects data attribute at the least for it to work. Triggering the plugin to dive into action is as simply as invoking it as shown here below:
<code>
$(document).ready(function() {
    $('.hgrid').hgrid({
        data: [{}] //this is an array of objects you have to run the plugin and build the table, this is a required param
</code>

###Below are the list of params available within the plugin for you to utilize:

####basic
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
    
####controls
    paginationRequired: true, // boolean flag to check if pagination is required or not
    paginateForEach: 10, //type int - count of records for that should display per pagination
    paginateControl: 'dropdown', //pagination can be a dropdown or a pagination-controller with a list of numbers ['dropdown', 'buttons']
    paginateClassPrefix: 'paginateController', //class of the pagination controller if its a dropdown
    includeSerialNumber: true, //set as false if serial number column is not required
    editableTableRows: false, // if the entire table's rows data are to be edited
    editableRowData: {}, // this is an object of data who's keys resemble the header array and the value are either true or false based on their values
    
####containers
    tableClass: 'hGridContainer', // class for the table
    theadClass: 'hGridHeaderContainer', // class for the table thead
    tbodyClass: 'hGridBodyContainer', // class for the table thead
    tfootClass: 'hGridFooterContainer', // class for the table thead
    oddRowClass: 'oddRow', // class for the each odd row
    evenRowClass: 'evenRow',// class for the each even row
    
####methods
    paginateDropdownChange : function() {} // custom method to act while its a pagninate-dropdown chosen and triggers within the onchange method
    onEditComplete: function() {} // custom method , will be call when edit is enabled and text field is exited
    
You can message me anything that you feel is necessary in this plugin and I will work on it and upload as part of updates.
