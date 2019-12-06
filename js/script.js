var input = document.getElementById('input');
var countP = 0;
var countBtn = 0;

var submit = document.getElementById('submit').onclick = function () {
    document.getElementById(`delete_button_${countBtn}`);
    let str = " ";
    str = input.value;
    var out = document.getElementById('out');
    out.innerHTML += `<p class="addP" id="parent_${countP}" onclick="dochange(this)">${str}</p><button class="del" id="delete_button_${countBtn}" onclick="makedelete(this)">X</button>`;
    countP++;
    countBtn++;
    //Post запит
    var http = new XMLHttpRequest();
    var url = 'http://localhost:3100/add-element';
    var data = { "itemText": str, "isCompleted": false };
    http.open('POST', url);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send(JSON.stringify(data));
}

function makedelete(val) {
    let previousBlockP = val.previousElementSibling.innerHTML;
    val.previousElementSibling.remove();
    val.remove();
    countP = countP - 1;
    countBtn = countBtn - 1;
    let str = " ";
    str = previousBlockP;
    //Post запит
    var http = new XMLHttpRequest();
    var url = 'http://localhost:3100/delete-element';
    var data = { "itemText": str };
    http.open('POST', url);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send(JSON.stringify(data));
};

function dochange(val) {
    val.classList.toggle("addP_change");
    let str = " ";
    str = val.innerHTML;
    var state = false;
    if (val.className == 'addP addP_change') {
        state = true;
    } else {
        state = false;
    };
    //Post запит
    var http = new XMLHttpRequest();
    var url = 'http://localhost:3100/update-element';
    var data = { "itemText": str, "isCompleted": state };
    http.open('POST', url);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http.onreadystatechange = function () {
        //Call a function when the state changes.
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.responseText);
        }
    }
    http.send(JSON.stringify(data));
};

function checkJSON() {
    // Using YQL and JSONP
    const Http = new XMLHttpRequest();
    const url = 'http://localhost:3100/orders';
    Http.open("GET", url);
    Http.send();
    Http.onreadystatechange = function () {
        if (Http.readyState == 4 && Http.status == 200) {
            if (Http.responseText) {
                var outJson = JSON.parse(Http.responseText);
                for (let i = 0; i < outJson.length; i++) {
                    out.innerHTML += `<p class="addP" id="parent_${i}"onclick="dochange(this)">${outJson[i].itemText}</p><button class="del" id="delete_button_${countBtn}"onclick="makedelete(this)">X</button>`;
                    countP++;
                    countBtn++;
                    if (outJson[i].isCompleted === true) {
                        let elem = document.getElementById(`parent_${i}`);
                        elem.classList.toggle("addP_change");
                    };
                };
            };
        };
    };

}
checkJSON();