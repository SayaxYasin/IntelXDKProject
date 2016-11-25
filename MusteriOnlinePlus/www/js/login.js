    function LoginUser(){
        
        ShowNotification();
        
        var username= jQuery("#ContactName").val();
        var password = jQuery("#ContactPassword").val();
        
        localStorage.clear();
            
        $.ajax({
               url: 'http://188.132.231.50:9985/Common/MobileGetUser?username='+username +'&password='+password,
                type: 'GET',
                data: JSON,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data.hasError == false)
                    {
                        StopNotification();
                        
                        localStorage.setItem("UserName",username );
                        
                        localStorage.setItem("Password",password );
                        
                        window.location = 'home.html';
                    }
                    else
                    {
                        StopNotification();
                       
                        alert("Kullanıcı Bulunamadı!!!");
                        
                        localStorage.clear();
                        
                    }
                },
                error: function (xhr, textStatus, errorThrown) {
                   StopNotification();
                    var alert = "Hata Kodu : " + xhr.status + " (" + textStatus + ")" + "\n" + "Açıklama : " + errorThrown;
                  
                }

            });
        }

    function ShowNotification() {
    
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
}
   
   function StopNotification(){
        $('body').unblock(); 
   }
    var defaultSize=0;
   
    function ControlMusteriLogin(){
        
        var localUserName = localStorage.getItem("UserName");
        
        var localPasswordName = localStorage.getItem("Password");
        
        if(localUserName != null && localPasswordName !=null)
            {
                $("#ContactName").val(localUserName);
                $("#ContactPassword").val(localPasswordName);
            }
        else
            {
                $("#ContactName").val("");
                $("#ContactPassword").val("");
            }
        
        defaultSize = GetPortraitSize();
       
            
    }

    window.onresize = function() {
        Resizer();
    };
            
    function Resizer(){
        var hgt = GetPortraitSize();
        if(defaultSize != hgt) {
                     if(defaultSize < hgt)
                    {
                        location.reload();
                    }
                    else{
                   $("#keyboardControlImage").css("margin-top","-500px"); 
                    }
                        }
        else{
             // alert("keyboard closed");
             $("#keyboardControlImage").css("margin-top","0px"); 
            }
            }
            

    function GetPortraitSize(){

            //portrait
                var w = window.innerWidth
                || document.documentElement.clientWidth
                || document.body.clientWidth;

                var h = window.innerHeight
                || document.documentElement.clientHeight
                || document.body.clientHeight;
               
            return h;
    }