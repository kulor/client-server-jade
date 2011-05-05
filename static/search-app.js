$().ready(function(){
    $('#query').keyup(function(e){
        var query = this.value;
        $.ajax({
            url: '/search/json?query=' + query,
            success: function(response) {
                var compiledTemplates = CSJ.applyDataToTemplates(response);
                $('#search-results').html(compiledTemplates.results);

                // Update the url for browsers that can handle it
                if(history.pushState){
                    history.pushState({isMine:true}, null, window.location.pathname + '?query=' + query);
                }
            }
        });
    
    });
});