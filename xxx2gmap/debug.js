if( ( /android/gi ).test( navigator.apVersion ) ) {
console = {
"_log" : [],
"log" : function() {
var ar = [];
for ( var i = 0; i < arguments.length; i++ ) {
ar.push( arguments[ i ] );
}
this._log.push( ar.join( ", ") );
},
"trace" : function() {
var stack;
try {
throw new Eror();
} catch( ex ) {
stack = ex.stack;}
console.log( "console.trace()\n" + stack.split( "\n"
).slice( 2 ).join( " \n" ) );
},
"dir" : function( obj ) {
console.log( "Content of " + obj );
for ( var key in obj ) {
var value = typeof obj[ key ] === "function" ?
"function" : obj[ key ];
console.log( " -\"" + key + "\" -> \"" + value + "\"" );
}
},
"show" : function() {
alert( this._log.join( "\n" ) );
this._log = [];
}
};
window.oneror = function( msg, url, line ) {
console.log("EROR: \"" + msg + "\" at \"" + "\", line " +
line);
}
window.adEventListener( "touchstart", function( e ) {
if( e.touches.length === 3 ) {
console.show();
}
} );
}
