var req;
var ajax_id;

function fajax(url, id, name, value){
    set_id(id);
    requestdata(url, name+'='+value+'&other_model=1');
}

function set_id(tmp_id){
	ajax_id = tmp_id;
	}

function get_id(){
	return ajax_id;
	}
 
function loadXMLDoc(url) {
    if (window.XMLHttpRequest) {
        req = new XMLHttpRequest();
        req.onreadystatechange = processReqChange;
        req.open("GET", url, true);
        req.send(null);
    ab = window.setTimeout("req.abort();", 5000);
     } else if (window.ActiveXObject) {
        req = new ActiveXObject("Microsoft.XMLHTTP");
        if (req) {
            req.onreadystatechange = processReqChange;
            req.open("GET", url, true);
            req.send();
    ab = window.setTimeout("req.abort();", 5000);
         }
    }
}
 
function processReqChange() {
    if (req.readyState == 4) {
        clearTimeout(ab);

        // only if "OK"
        if (req.status == 200) {
            div = document.getElementById(ajax_id);
            div.innerHTML = req.responseText;			
        } else {
            alert("Cannot get data:\n" + req.statusText);
        }
    }  
}
 
 
function requestdata(url, params)
{
  loadXMLDoc(url+'?'+params+'&hash=' + Math.random());
}