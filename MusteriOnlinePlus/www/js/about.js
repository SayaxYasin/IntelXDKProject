    function GetAboutInformation(){
        ShowNotification();
            $.ajax({
                url: 'http://188.132.231.50:9985/Common/MobileGetAbout',
                type: 'POST',
                data: JSON,
                dataType: "text",
                contentType: "application/text;charset=utf-8",
                success: function (data) {
                    if (data != null) {
                        jQuery("#aboutText").html("<blockquote style='font-style:normal'><span class='quote_author' style='text-decoration:none'>TEMİZ BİR DÜNYA İÇİN YENİLENEBİLİR ENERJİ</span><br/></br>Technix Technology, tümüyle enerji sektörüne odaklanmış bir firmadır. Sektörün önde gelen gruplarıyla çözüm ortaklıkları kurmuştur. </br></br>  Firmanın Ar-Ge ekibi enerji sektöründe deneyimli Endüstri, Bilgisayar ve Elektronik Mühendisleri’nden oluşmaktadır. </br></br>Enerji sektörünün hızlı gelişimine ayak uydurarak, sektörle birlikte büyümeyi başarmış, sektörün önde gelen firmalarına özel çözümler geliştirmiş, öncelikli tercih edilen lider teknoloji firması olmayı başarmıştır.</blockquote>");
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
   // setTimeout(function () { $('body').unblock(); }, 1200);

}
function StopNotification(){
    $(document).ready(function () {
        $('body').unblock(); 
    });
}