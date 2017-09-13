var inp = document.getElementsByName("expens"),
    msgAddBtn = document.getElementById("msgAdd"),
    msgResetBtn = document.getElementById("msgReset"),
    expensData = [],
    count = document.getElementById("count"),
    average = document.getElementById("average"),
    tbody = document.getElementsByTagName("tbody")[0],
    sum,
    ave;

msgAddBtn.onclick = function () {
    sum = 0;
    ave = 0;
    tbody.innerHTML = "";
    var consumptionInfo = {
        footVal: Number(inp[0].value),
        shopVal: Number(inp[1].value),
        lifeVal: Number(inp[2].value),
        trafficVal: Number(inp[3].value),
        entertainmentVal: Number(inp[4].value),
        relationshipVal: Number(inp[5].value),
        insuranceVal: Number(inp[6].value),
        medicalVal: Number(inp[7].value),
        otherVal: Number(inp[8].value)
    };



    expensData.push(consumptionInfo);
    var elength = expensData.length;
    for (var i = 0; i < expensData.length; i++) {
        tbody.innerHTML += "<tr></tr>";
        var tbody_tr = tbody.getElementsByTagName("tr"),
            tr_length = tbody_tr.length,
            newTr = tbody_tr[tr_length - 1],
            str = "";

        for (var x in expensData[i]) {
            str += "<td>￥" + expensData[i][x].toFixed(2) + "</td>"
            sum += expensData[i][x]
        }
        newTr.innerHTML = str;
    }
    ave = (sum / elength).toFixed(2);
    count.innerHTML = "￥" + sum.toFixed(2);
    average.innerHTML = "￥" + ave;
}

msgResetBtn.onmousedown = function () {
    this.style.backgroundColor = "#f7f3f3";
}
msgResetBtn.onmouseup = function () {
    this.style.backgroundColor = "#DDDDDD";
}
msgAddBtn.onmousedown = function () {
    this.style.backgroundColor = "#3693e5";
}
msgAddBtn.onmouseup = function () {
    this.style.backgroundColor = "#0575D9";
}
