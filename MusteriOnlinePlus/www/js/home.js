    function GetMusteriRegisterIDInfo(regID){
            
            $.ajax({
                url: 'http://188.132.231.50:9985/Common/MobileHomeGetMusteriID',
                type: 'Get',
                data: JSON,
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    
                    if (data != null) {

                        if(data.RegistirionID != regID && regID !=null){
                            SaveMusteriRegisterionID(data.MusteriID,regID);
                            }
                        }
                    else
                        {
                            localStorage.RemoveItem("MusteriID");
                            window.location = "index.html";
                        }
                },
            });
    }


   function SaveMusteriRegisterionID(mId,rId){

       var registerMusteriID = {
           
           musteriId  : mId,
           registerId : rId,
         };
       
            $.ajax({
                url: 'http://188.132.231.50:9985/Common/SaveRegistrionID',
                type: 'POST',
                data: JSON.stringify(registerMusteriID),
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    if (data != null) {
                       //alert("Kayıt Başarılı");
                    }
                },

            });
        }
   
function StopNotification(){
        $(document).ready(function () {
            $('body').unblock(); 
        });
    }

        function onLoadEvent()
            {
                document.addEventListener("deviceready", onDeviceReady, false);
            }
            
            var capturarEventos = function (e) {
                
                switch( e.event )
                {
                    case 'registered':
                       if (e.regid.length > 0)
                       {
                           GetMusteriRegisterIDInfo(e.regid);
                           
                           /*window.plugins.clipboard.copy(e.regid,                            
                            function(r){console.log("Copy Succesfully");},
                            function(e){alert(e)});*/
                       }
                       
                        break;
                    
                    case 'message':
                     
                        if (e.foreground)
                        {
                            alert(e.payload.message);
                        }
                        else
                        {	
                            if (e.coldstart)
                                alert(e.payload.message);
                            else
                                alert("E.Background");
                        }

                        //alert("e.Peyload.Message");

                        break;
                    
                    case 'error':
						alert("Error E.Message");  
                        break;
                    
                    default:
						alert("Default Case");  
                        break;
                }
            }
            
    function onDeviceReady()  {
                
                var androidConfig = {
                
                    "senderID" : '184347188461',
                    "ecb" : "capturarEventos"
                };
                
               if(device.platform == "Android" || device.platform =="android" ) { 
                window.plugins.pushNotification.register(
                successHandler,errorHandler,androidConfig);
                  }
                else {
                    alert("Android Değil");
                }
                }
            function successHandler(result) {
                    //alert("Token Ok = " + result);
                    }
            
            function errorHandler (error) {
                    //alert("TOKEN Error= " + result);
                    } 