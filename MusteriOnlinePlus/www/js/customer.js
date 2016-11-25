    function GetCustomerInformation(){
 
        ShowNotification();
        
            $.ajax({
                url: 'http://188.132.231.50:9985/Common/MobileGetCustomInformation',
                type: 'POST',
                data: JSON,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data != null) {
                        
                        //jQuery("#customerUnvan").text(data.Unvan);
                        jQuery("#customerGsmNo").text(data.GsmNo);
                        jQuery("#customerFax").text(data.Fax);
                        jQuery("#customerEmail").text(data.Email);
                        jQuery("#customerTelefon").text(data.Telefon);
                        jQuery("#customerMusteriID").text(data.MusteriID);
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