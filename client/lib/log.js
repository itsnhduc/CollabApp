if (Meteor.isClient) {
    
    log = function(str) {
        $('.log').remove();
        var logElemement = $('<div class="log text-center animated fadeIn"><p>' + str + '</p></div>');
        $('body').append(logElemement);
        
        var t = 0;
        
        setTimeout(function() {
            $('.log').addClass('fadeOut');
        }, 5000);
        

    }
    

    
}