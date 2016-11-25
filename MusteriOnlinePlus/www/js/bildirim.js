      function GetBildirim() {
          
          var bild ={
              id:"1",
          };
          jQuery.ajax({
                url: 'http://188.132.231.50:9985/Common/MobileGetNotification',
                type: 'POST',
                data: JSON.stringify(bild),
                dataType: "text",
                contentType: "application/text;charset=utf-8",
                success: function (data) {
                    /*if (data != null) {
                        
                    }
                    else {
                        
                        }*/
                    alert("Denem Bildirim");
                },

            });

        }