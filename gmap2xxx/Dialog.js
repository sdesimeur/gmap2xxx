"use strict";

function Dialog (name,vars) {
    this.vars=vars;
    this.name=name;
    if ($('#dialogs #'+this.name).length == 0) {
        $('#dialogs').append('<div id="'+this.name+'"></div>');
    }
    $( "#"+this.name ).dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });
    this.affiche = function(title,msg,bigsize) {
        $( "#"+this.name )
            .dialog({
                title : title,
                position: {
                    of : $('#gmap2xxx'),
                    my : 'left top',
                    at : 'left top',
                    collision : 'none none'
                }
            });
        if (bigsize) {
            $( "#"+this.name )
                .dialog({
                    height: 600,
                    width: 800
                });
        } else {
            $( "#"+this.name )
                .dialog({
                    height: "auto",
                    width: "auto"
                });
        }
        $( "#"+this.name )
            .html(msg)
            .dialog({
                modal: true,
                buttons: {
                    "Fermer": function() {
                        if (typeof this.vars !== 'undefined') {
                            this.vars.saveUrls2CookiesAndReloadPage();
                        }
                        $("#"+this.name).dialog( "close" );
                    }.bind(this)
                }
            })
            .dialog( "open" );
    }
/*    this.mDialog = function (title,msg,bigsize) {
        $( "#msg" )
            .dialog({
                title : title,
                position: {
                    of : $('#gmap2xxx'),
                    my : 'left top',
                    at : 'left top',
                    collision : 'none none'
                }
            });
        if (bigsize) {
            $( "#msg" )
                .dialog({
                    height: 600,
                    width: 800
                });
        } else {
            $( "#msg" )
                .dialog({
                    height: "auto",
                    width: "auto"
                });
        }
        $( "#msg" )
            .html(msg)
            .dialog({
                modal: true,
                buttons: {
                    "Fermer": function() {
                        $( this ).dialog( "close" );
                    }
                }
            })
            .dialog( "open" );
    }*/
}
