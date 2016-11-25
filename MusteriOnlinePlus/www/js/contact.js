    function GetContactInformation(){
        
        ShowNotification();
            $.ajax({
                url: 'http://188.132.231.50:9985/Common/MobileGetCustomInformation',
                type: 'POST',
                data: JSON,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data != null) {
                        
                        //jQuery("#contactUnvan").text(data.Unvan);
                        jQuery("#contactUnvan2").text(data.Unvan);
                        jQuery("#contactPostaAdres").text(data.PostaAdres);
                        jQuery("#contactGsmNo").text(data.GsmNo);
                        jQuery("#contactFax").text(data.Fax);
                        jQuery("#contactEmail").text(data.Email);
                        StopNotification();
                    }
                    else {
                        StopNotification();
                        }
                    
                },

            });
        }

    function ShowNotification() {
        $(document).ready(function () {
            $('body').block({
                message: "<div class='rotateContainer'><img class='rotate' src='http://188.132.231.50:9985/Content/assets/img/load1.png' /> <p class='rotateMsg'>Yükleniyor lütfen bekleyiniz...</p><div>", 
                css: {
                    border: 'none',
                    padding: '0px',
                    backgroundColor: '#fff',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .7,
                    color: '#000',
                    width: '363px',
                }
            });
        
    });
    //setTimeout(function () { $('body').unblock(); }, 1200);

}
function StopNotification(){
    $(document).ready(function () {
        $('body').unblock(); 
    });
}