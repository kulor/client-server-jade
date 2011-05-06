var CSJ = function(){
    var jade = require('jade');
    var templates = {};
    var precompiledTemplates = {};
    var compiledTemplates = {};

    var updateTemplates = function(json){
        templates = json;
        precompileTemplates();
    };

    var precompileTemplates = function(){
        if(templates){
            for(i in templates){
                precompiledTemplates[i] = jade.compile(templates[i]);
            }
        }
        return precompiledTemplates;
    };

    var applyDataToTemplates = function(res){
        if(precompiledTemplates && res){
            for(i in precompiledTemplates){
                compiledTemplates[i] = precompiledTemplates[i].call(null, {res: res});
            }
        }
        return compiledTemplates;
    };
    
    return {
        updateTemplates : updateTemplates,
        applyDataToTemplates : applyDataToTemplates
    }
}();