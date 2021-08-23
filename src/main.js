let qrcode = document.querySelector("img");
// qrtext = document.querySelector("textarea");
let qrbtn = document.getElementById("genBtn");
//let atbtn = document.getElementById("genAtt");
//let pdfbtn = document.getElementById("pdf")

qrbtn.addEventListener("click", both);

document.getElementById("sheet").style.visibility='hidden';

function generateQR() {
   // let time = new Date();
    
    var randomString = "";
    var characters = 'qwertyuioplkjhgfdsazxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM';
    for (var i = 0; i < characters.length; i++){
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    let size = "1000x1000";
    //let sub = qrtext.value;
    //let data = sub + "-" + randomString;
    let data = randomString;
    let baseURL = "http://api.qrserver.com/v1/create-qr-code/";
    let url = baseURL + "?size=" + size + "&data="+data;
    qrcode.src = url;
    //var database = firebase.database();
    firebase.database().ref(data)
    //database.ref(data);
    //ref.push(data);
    
   


   // atbtn.addEventListener("click", FetchAllData);

    function FetchAllData() {
        firebase.database().ref(data).once('value', function(snapshot){
            snapshot.forEach(
                function(ChildSnapshot){
                    let rn=ChildSnapshot.val().number;
                    addItemsToList(rn);
                }
            );
        });

        // function addItemsToList(rollNo){
        // var ul=document.getElementById('list' );
        // var _rollNo=document.createElement('li');
        // _rollNo.innerHTML='Roll No:'+ rollNo;
        // ul.appendChild(_rollNo);
        // };
        var srno= 0;
        function addItemsToList(rollNo){
            var tbody=document.getElementById('tbody1');
            var trow = document.createElement('tr');
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            // let time = new Date();
            // let head = sub + '-' + time
            // document.getElementById("info").innerHTML=head;
            td1.innerHTML= ++srno;
            td2.innerHTML= rollNo;
            trow.appendChild(td1);
            trow.appendChild(td2);
            tbody.appendChild(trow);
            };
    };
    window.setTimeout(FetchAllData,9600)
}

function hideQR(){
    document.getElementById("temp").style.visibility='hidden';
    
}
// function showsh(){
//     document.getElementById("sheet").style.visibility='visible';

// }
function start(){
    let t = 10;
    const countdownEL = document.getElementById('countdown');
    setInterval(updateCountDown,1000);
    function updateCountDown(){
        countdownEL.innerHTML = 'Creating Roll-call list in ' + t + ' sec';
        t--;
    }
    window.setTimeout(hideQR,10000);
  //  window.setTimeout(showsh,15000);
    qrbtn.disabled = true;
   
}

function both(){
    generateQR();
    start();
    window.setTimeout(generate,10000);
}


//pdfbtn.addEventListener("click", generate);
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
    let h ='Attendence - ' + new Date();
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
    doc.save('Attendence.pdf');  
} 
