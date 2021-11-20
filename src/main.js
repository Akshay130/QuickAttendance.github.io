let qrcode = document.querySelector("img");
let qrbtn = document.getElementById("genBtn");

qrbtn.addEventListener("click", both);

document.getElementById("sheet").style.visibility='hidden';

function generateQR() {
    var randomString = "";
    var characters = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM';
    for (var i = 0; i < characters.length; i++){
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    let size = "1000x1000";
    let data = randomString;
    let baseURL = "http://api.qrserver.com/v1/create-qr-code/";
    let url = baseURL + "?size=" + size + "&data="+data;
    qrcode.src = url;
    firebase.database().ref(data)
   
    function FetchAllData() {
        firebase.database().ref(data).orderByChild("number").limitToFirst(333).once('value', function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
                    let rn=ChildSnapshot.val().number;
                    addItemsToList(rn);
                }
            );
        });
        var srno= 0;
        function addItemsToList(rollNo){
            var tbody=document.getElementById('tbody1');
            var trow = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            td1.innerHTML= ++srno;
            td2.innerHTML= rollNo;
            trow.appendChild(td1);
            trow.appendChild(td2);
            tbody.appendChild(trow);
            };
    };
    window.setTimeout(FetchAllData,9000)
}

function hideQR(){
    document.getElementById("temp").style.visibility='hidden';
    }

function start(){
    let t = 10;
    const countdownEL = document.getElementById('countdown');
    setInterval(updateCountDown,1000);
    function updateCountDown(){
        countdownEL.innerHTML = 'Creating Roll-call list in ' + t + ' sec';
        t--;
    }
    window.setTimeout(hideQR,10000);
    qrbtn.disabled = true; 
}

function generate() {  
    var doc = new jsPDF('p', 'pt', 'letter');  
    var htmlstring = '';  
    var tempVarToCheckPageHeight = 0;  
    var pageHeight = 0;  
    pageHeight = doc.internal.pageSize.height;  
    specialElementHandlers = {  
        // element with id of "bypass" - jQuery style selector  
        '#bypassme': function(element, renderer) {  
            // true = "handled elsewhere, bypass text extraction"  
            return true  
        }  
    };  
    margins = {  
        top: 150,  
        bottom: 60,  
        left: 40,  
        right: 40,  
        width: 600  
    };  
    var y = 20; 
  
    let h ='Attendance - ' + new Date();
    doc.setLineWidth(2);  
    doc.text(40, y = y + 30, h);  
    doc.autoTable({  
        html: '#rollcall',  
        startY: 70,  
        theme: 'striped',  
        columnStyles: {  
            0: {  
                cellWidth: 180,  
            },  
            1: {  
                cellWidth: 330,  
            },  
            2: {  
                cellWidth: 150,  
            }  
        },  
        styles: {  
            minCellHeight: 20  
        }  
    })
    doc = addWaterMark(doc);
    doc.save('Attendance.pdf');  
} 

function both(){
    generateQR();
    start();
    window.setTimeout(generate,11000);
    window.setTimeout(csv,11000);
}

function addWaterMark(doc) {
    var totalPages = doc.internal.getNumberOfPages();

    for (i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      //doc.addImage(imgData, 'PNG', 40, 40, 75, 75);
      doc.setTextColor(150);
      doc.setFontSize(11);
      doc.text(40, doc.internal.pageSize.height - 20, 'E-mail: akshayramgude007@gmail.com');
    }

    return doc;
  }

function csv() {
    $('#rollcall').table2csv();
}
