
function GetAnalizSayacAboneNo() {
    ShowNotification();
           jQuery.ajax({
               url: 'http://188.132.231.50:9985/Common/MobileGetAnalysisSayacAbone',
               type: 'POST',
               data: JSON,
               dataType: "json",
               contentType: "application/json;charset=utf-8",
               success: function (data) {
                   if (data != null) {
                       WriteResponseAboneNo(data);
                       StopNotification();
                   }
                   else {
                       StopNotification();
                   }
               },

           });
 }

function WriteResponseAboneNo(aboneAnalysiss) {
     var strResult = "";
     jQuery.each(aboneAnalysiss, function (index, aboneAnalysis) {
         
         strResult += '<div class="toogle_wrap radius8"><div data-event="analiz"';
         strResult += 'data-id='+aboneAnalysis.SayacId+' class="trigger"><a href="#" >';
         strResult += '<span class="quote_author" style="text-decoration:none">';
         strResult += 'Abone No </span> : '+aboneAnalysis.AboneNo+' </a></div>';
         strResult += '<div class="toggle_container" style="display: none;">';
         strResult += '<table><tr><th>Ay</th><th>T1</th><th>T2</th>';
         strResult += '<th>T3</th><th>T0</th></tr>';
         strResult += '<tbody id="gridAnalysisTable'+aboneAnalysis.AboneNo+'"></tbody>';
         strResult += '</table><div id="chartContainer'+aboneAnalysis.SayacId+'" ';
         strResult += 'style="height: 300px;width: 100%;margin-top:25px;';
         strResult += 'margin-bottom:25px"></div></div></div>';
     });

     jQuery("#gridAnalysis").html(strResult);
 }

function GetAnalizSayacItem(sayacId) {
   
    
  ShowNotification();
    
         var pmumId = {
             id:parseInt(sayacId),
         }
           jQuery.ajax({
               url: 'http://188.132.231.50:9985/Common/MobileGetAnalysisItem',
               type: 'POST',
               data: JSON.stringify(pmumId),
               dataType: "json",
               contentType: "application/json;charset=utf-8",
               success: function (data) {
                   if (data != null) {
                       WriteResponseGrid(data);
                       //alert(data.AboneNo);
                       WriteResponseChartControl(data,sayacId);
                       StopNotification();
                   }
                   else {
                       StopNotification();
                   }
               },

           });
 }

function WriteResponseGrid(analysiss) {
     var strResult = "";
     var aboneNo = "";
     jQuery.each(analysiss, function (index, analysis) {

         strResult += '<tr><td id="analizAy">' + analysis.Ay + '</td>';
         strResult += '<td>' + analysis.T1tuk + '</td>';
         strResult += '<td>' + analysis.T2tuk + '</td>';
         strResult += '<td>' + analysis.T3tuk + '</td>';
         strResult += '<td>' + analysis.T0tuk + '</td></tr>';
         aboneNo = analysis.AboneNo;
     });

     jQuery("#gridAnalysisTable"+aboneNo).html(strResult);
 }

function WriteResponseChartControl(chartItemData,chartItem) {
    
    var gunduz=[];
    jQuery.each(chartItemData, function (index, chartGunduz) {
        gunduz.push( {x: new Date(chartGunduz.Ay), y: chartGunduz.T1yuz});
        });
    var puant=[];
    jQuery.each(chartItemData, function (index, chartPuant) {
        puant.push( {x: new Date(chartPuant.Ay), y: chartPuant.T2yuz});
        });
    var gece=[];
    jQuery.each(chartItemData, function (index, chartGece) {
        gece.push( {x: new Date(chartGece.Ay), y: chartGece.T3yuz});
        });
                
    var chart = new CanvasJS.Chart("chartContainer"+chartItem, {
            
        interactivityEnabled: false,
        
        title:{
                 text: "",
                 horizontalAlign: "right"
             },
             axisX: {
                 tickThickness: 0,
                 interval: 1,
                 intervalType: "year"
             },
             animationEnabled: true,
             toolTip: {
                 shared: true
             },
             axisY: {
                 lineThickness: 0,
                 tickThickness: 0,
                 interval: 20
             },
             legend:{
                 verticalAlign: "bottom",
                 horizontalAlign: "bottom"
             },

             data: [
             {
                 name: "Gündüz",
                 showInLegend: true,
                 type: "stackedColumn100",
                 color: "#FFC0C0 ",
                 dataPoints: gunduz
             },
             {
                 name: "Puant",
                 showInLegend: true,
                 type: "stackedColumn100",
                 color: "#FF8080 ",
                 dataPoints: puant
             },
             {
                 name: "Gece",
                 showInLegend: true,
                 type: "stackedColumn100",
                 color: "#A52A2A ",
                 dataPoints: gece
             }]
         });
         
    chart.render();
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