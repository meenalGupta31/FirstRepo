({
    doInit : function(c, e, h) {
        h.doInitHelper(c,e,h);
    },
        handleAfterScriptsLoaded: function (c, e, h) {
        alert('scripts loaded jq and jqUI');
        $("#sortable").sortable();
    }
})