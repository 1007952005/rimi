var brand = document.getElementById("brand"),
    model = document.getElementById("model"),
    param = document.getElementById("param"),
    price = document.getElementById("price"),
    country = document.getElementById("country");

var addBtn = document.getElementById("addBtn");
addBtn.onmousedown = function () {
    this.style.backgroundColor = "#c578d3";
}
addBtn.onmouseup = function () {
    this.style.backgroundColor = "#9e5caa";
}
addBtn.onclick = function () {
    var obj = {
        brandVal: brand.value,
        modelVal: model.value,
        paramVal: param.value,
        priceVal: price.value,
        countryVal: country.value
    }
    //默认值不添加数据
    for (var j in obj) {
        if (obj[j] === "") {
            return;
        } else if (obj[j] === "请选择..") {
            return;
        }
    }
    var tbody = document.getElementsByTagName("tbody")[0];
    tbody.innerHTML += "<tr></tr>";
    var tbody_tr = tbody.getElementsByTagName("tr");
    var newTr = tbody_tr[tbody_tr.length - 1];
    for (var i in obj) {
        newTr.innerHTML += "<td>" + obj[i] + "</td>";
    }
}
