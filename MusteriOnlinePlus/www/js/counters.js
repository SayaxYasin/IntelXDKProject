 
function GetCounters(gSize,gPage,cntrl){
    
    //var gSize = jQuery('#topSize option:selected').val();
    //var gPage = jQuery('#topPage option:selected').val();
    //var params = '?page=' + page + '&size=' + size;
    
    ShowNotification();
    
    if(cntrl==0)
        {
            gSize=10;
            gPage=1;
        }
    
     var pagesize = {
                  page: gPage,
                  size: gSize,
                };  
    
            $.ajax({
                url: 'http://188.132.231.50:9985/Common/MobileGetCounters',
                type: 'POST',
                data: JSON.stringify(pagesize),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    
                    if (data != null) {
                        WriteResponseGrid(data.Result); 
                        WriteChangePageSize(data.AllCountersCount,gSize,gPage);
                        StopNotification();
                    }
                    else {
                        StopNotification();
                        }
                },

            });
        }

function WriteResponseGrid(counters) {
    
    var strResult = "";

    jQuery.each(counters, function (index, counter) {
              
        strResult+='<div class="toogle_wrap radius8">';
        strResult+='<a href="#"><div class="trigger">';
        strResult+='<span class="quote_author" style="text-decoration:none">';
        strResult+='Abone No </span> :'+counter.AboneNo+'</a></div>';
        strResult+='<div class="toggle_container" style="display: none;">';
        strResult+='<ul class="listing_detailed">';
        strResult+='<li><span class="quote_author" style="text-decoration:none">'; strResult+='Dağıtım Şirketi Adı</span>  : <a> '+counter.DagitimSirketi+'</a></li>';
        strResult+='<li><span class="quote_author" style="text-decoration:none">';
        strResult+='Sayaç Abone No</span>  :<a> '+counter.AboneNo+'</a></li>';
        strResult+='<li><span class="quote_author" style="text-decoration:none">Sayaç'; strResult+='Bağlantı Seviyesi</span>  :<a> '+counter.SayacBaglantiSeviyesi+'';
        strResult+='</a></li><li><span class="quote_author" style="text-decoration:none">'; strResult+='Belediye</span>  :<a> '+counter.Ilce+'</a></li>';
        strResult+='<li><span class="quote_author" style="text-decoration:none">Şehir'; strResult+='</span> :<a>'+counter.Il+'</a></li></ul></div></div>';
             
        });

      jQuery("#gridCounter").html(strResult);
    }

    function WriteChangePageSize(totalCounter,wSize,wPage)
    {
        jQuery('#bottomSizeLabel').val(wSize);
        jQuery('#topSizeLabel').val(wSize);
        var str="";
          var pageCount = Math.floor(totalCounter / wSize);
          if (totalCounter % wSize != 0)
              pageCount++;
        
        
         if (wPage > 1)
        {
                $('#btnTopGeri').prop('disabled', false);
                $('#btnBottomGeri').prop('disabled', false);
        }
        if (wPage <= 1)
        {
                $('#btnTopGeri').prop('disabled', true);
                $('#btnBottomGeri').prop('disabled', true);
            
        }
        if (wPage < pageCount)
        {
            $('#btnTopIleri').prop('disabled', false);
            $('#btnBottomIleri').prop('disabled', false);
        }
        if (wPage >= pageCount)
        {
                $('#btnTopIleri').prop('disabled', true);
                $('#btnBottomIleri').prop('disabled', true);
        }
        
        /*for (var i = 1; i <= pageCount; i++) {
            
            if(i==wPage){
                str+="<option selected='selected' value="+i+">"+i+"</option>";;
            }
            else {
                str += "<option value="+i+">"+i+"</option>";
          }
            
        }*/
          //jQuery("#topPage").html(str);
          //jQuery("#bottomPage").html(str); 
        str = '<label id="topPageLabel" class="soflow-color">'+wPage+'</label>';
        
       jQuery("#topPageLabel").html(str);
       jQuery("#bottomPageLabel").html(str); 
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
    //setTimeout(function () { $('body').unblock(); }, 2000);

}
function StopNotification(){
    $(document).ready(function () {
        $('body').unblock(); 
    });
}