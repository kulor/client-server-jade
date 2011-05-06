var HELPERS = {
    blacklistWords : ['foo', 'terror'],
    
    filterURL : function(str){
        return encodeURIComponent(str);
    },
    
    filterBlacklistWords : function(str){
        this.blacklistWords.forEach(function(item){
            str = str.replace(new RegExp(item, 'gi'), '<span class="flag">' + unescape(item) + '</span>');
        });
        return str;
    }
};

if('object' === typeof exports){
    exports.HELPERS = HELPERS;
}