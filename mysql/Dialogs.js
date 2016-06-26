"use strict";

function Dialogs () {
    $( "#dialog,#msg" ).dialog({
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
    this.nDialog = function(title,msg,bigsize) {
        $( "#dialog" )
            .dialog({
                title : title,
                zIndex: 4,
                position: {
                    of : $('#gmap2xxx'),
                    my : 'left top',
                    at : 'left top',
                    collision : 'none flip'
                }
            });
        if (bigsize) {
            $( "#dialog" )
                .dialog({
                    height: 600,
                    width: 800
                });
        } else {
            $( "#dialog" )
                .dialog({
                    height: "auto",
                    width: "auto"
                });
        }
        $( "#dialog" )
            .html(msg)
            .dialog( "open" );
    }
    this.mDialog = function (title,msg,bigsize) {
        $( "#msg" )
            .dialog({
                title : title,
                zIndex: 6,
                position: {
                    of : $('#zoneurl'),
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
            .html( msg )
            .dialog( "open" );
    }
}
