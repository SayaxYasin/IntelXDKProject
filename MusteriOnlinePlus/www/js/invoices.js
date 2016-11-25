
function GetInvoices(gSize,gPage,cntrl){

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
                url: 'http://188.132.231.50:9985/Common/MobileGetInvoices',
                type: 'POST',
                data: JSON.stringify(pagesize),
                dataType: "json",
                contentType: "application/json;charset=utf-8",
                success: function (data) {
                    
                    if (data != null) {
                        WriteResponseGrid(data.Result); 
                        WriteChangePageSize(data.AllInvoicesCount,gSize,gPage);
                        StopNotification();
                    }
                },

            });
        }

function WriteResponseGrid(invoices) {
    
          var strResult = "";
          jQuery.each(invoices, function (index, invoice) {
             
           strResult += '<div class="toogle_wrap radius8">';
           strResult += '<div class="trigger"><a href="#" style="font-size:14px">';
           strResult += '<span style="background-color: #edab4b; padding: 4px;';
           strResult += 'color: #fff; ">'+GetMonthText(invoice.SonOdemeTarihi)+'</span>';
           strResult += '  - '+invoice.SeriliFaturaNo+'  - '+TLFormat(invoice.GenelToplam)+'  -';
          
         if(invoice.GenelToplam==invoice.ToplamOdenen)
            {
                 strResult += '<span style="background-color: #55ca60; padding: 4px;';
                 strResult += 'color: #fff; ">Ödendi</span></a></div>'; 
            }
         else
            {
                strResult +='<span style="background-color: #f1594e; padding: 4px;';
                strResult +='color: #fff; ">Ödenmedi</span></a></div>'
            }
              
           strResult += '<div class="toggle_container" style="display: none;"><p>';
           strResult += '<ul class="listing_detailed"><li>';
           strResult += '<span class="quote_author" style="text-decoration:none">';
           strResult += 'Dönem</span>  :<a> '+invoice.Donem+'</a></li>';
           strResult += '<li><span class="quote_author" style="text-decoration:none">';
           strResult += 'Fatura No</span>  :<a> '+invoice.SeriliFaturaNo+'</a></li><li>';
           strResult += '<span class="quote_author" style="text-decoration:none">';
              
          if(invoice.KesimTarihi!=null) {
           strResult += 'Kesim Tarihi</span>  :<a> '+DateFormat(invoice.KesimTarihi)+'</a>';
              }
          else
              {
            strResult += 'Kesim Tarihi</span>  :<a> </a>';
              }
           
             
           strResult += '</li><li><span class="quote_author" style="text-decoration:none">';
           strResult +='Son Ödeme Tarihi</span>  :<a> ';
              
        if(invoice.SonOdemeTarihi!=null){
          
           strResult += ''+DateFormat(invoice.SonOdemeTarihi)+'</a>';
              }
          else
              {
            
           strResult += '</a>';
              }
           
           strResult += '</li><li><span class="quote_author" style="text-decoration:none">';
           
         if(invoice.Kdv!=null){
              strResult += 'K.D.V.</span>  :<a> '+TLFormat(invoice.Kdv)+'</a></li><li>';
              }
          else
              {
              strResult += 'K.D.V.</span>  :<a> </a></li><li>';
              }
           
              strResult += '<span class="quote_author" style="text-decoration:none">';
            
        if(invoice.AraToplam!=null){
           strResult += 'Toplam</span>  :<a> '+TLFormat(invoice.AraToplam)+'</a></li><li>';
            } 
          else
          {
           strResult += 'Genel Toplam</span> :<a> </a></li><li>';
          }
           strResult += '<span class="quote_author" style="text-decoration:none">';    
              
        if(invoice.GenelToplam!=null){
           strResult += 'Genel Toplam</span> :<a> '+TLFormat(invoice.GenelToplam)+'</a></li><li>';
            } 
          else
          {
           strResult += 'Genel Toplam</span> :<a> </a></li><li>';
          }
              
           strResult += '<span class="quote_author" style="text-decoration:none">';
        
       if(invoice.ToplamOdenen!=null){
            strResult += 'Toplam Ödenen</span> :<a>'+TLFormat(invoice.ToplamOdenen)+'</a></li>';
            } 
          else
          {
            strResult += 'Toplam Ödenen</span> :<a></a></li>';
          }
           strResult += '</ul></p></div></div>';
             
          });

          jQuery("#gridInvoices").html(strResult);
      }

function WriteChangePageSize(totalInvoice,wSize,wPage){
    jQuery('#bottomSizeLabel').val(wSize);
        jQuery('#topSizeLabel').val(wSize);
        var str="";
          var pageCount = Math.floor(totalInvoice / wSize);
          if (totalInvoice % wSize != 0)
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
            
        }
          jQuery("#topPage").html(str);
          jQuery("#bottomPage").html(str);  */
     str = '<label id="topPageLabel" class="soflow-color">'+wPage+'</label>';
        
       jQuery("#topPageLabel").html(str);
       jQuery("#bottomPageLabel").html(str); 
    
    }
    
function TLFormat(tl){
        var num = tl.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")+" TL "; 
        return num;
    }

function GetMonthText(month){
        var pattern = /Date\(([^)]+)\)/;
        var results = pattern.exec(month);
        var dt = new Date(parseFloat(results[1]));
        var monthNames = ["OCA", "ŞUB", "MAR", "NİS", "MAY", "HAZ",
          "TEM", "AĞU", "EYL", "EKİ", "KAS", "ARA"
        ];
        return monthNames[dt.getMonth()];
    }
   
function DateFormat(value){
      var pattern = /Date\(([^)]+)\)/;
      var results = pattern.exec(value);
      var dt = new Date(parseFloat(results[1]));
      return (dt.getMonth() + 1) + "." + dt.getDate() + "." + dt.getFullYear();
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