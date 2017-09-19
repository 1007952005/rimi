var footInp = document.getElementById("foot"),
    shopInp = document.getElementById("shop"),
    lifeInp = document.getElementById("life"),
    trafficInp = document.getElementById("traffic"),
    entertainmentInp = document.getElementById("entertainment"),
    relationshipInp = document.getElementById("relationship"),
    insuranceInp = document.getElementById("insurance"),
    medicalInp = document.getElementById("medical"),
    otherInp = document.getElementById("other"),
    msgAddBtn = document.getElementById("msgAdd"),
    msgResetBtn = document.getElementById("msgReset"),
    expensData = {
        foot: [],
        shop: [],
        life: [],
        traffic: [],
        entertainment: [],
        relationship: [],
        insurance: [],
        medical: [],
        other: []
    },
    count = document.getElementById("count"),
    average = document.getElementById("average"),
    tbody = document.getElementsByTagName("tbody")[0],
    sum,
    ave;
Object.prototype.objectVal = function (index) {
    return this[Object.keys(this)[index]];
}
msgAddBtn.onclick = function () {
    sum = 0;
    ave = 0;
    var consumptionInfo = {
            footVal: footInp.value,
            shopVal: shopInp.value,
            lifeVal: lifeInp.value,
            trafficVal: trafficInp.value,
            entertainmentVal: entertainmentInp.value,
            relationshipVal: relationshipInp.value,
            insuranceVal: insuranceInp.value,
            medicalVal: medicalInp.value,
            otherVal: otherInp.value
        },
        expensLength = Object.keys(expensData).length,
        day,
        str = "";


    for (var i = 0; i < expensLength; i++) {
        if (isNaN(consumptionInfo.objectVal(i))) {
            expensData.objectVal(i).push(Number(0).toFixed(2));
        } else {
            expensData.objectVal(i).push(Number(consumptionInfo.objectVal(i)).toFixed(2));
        }
    }
    day = expensData[Object.keys(expensData)[0]].length;

    for (var k = 0; k < day; k++) {
        str += "<tr><td>￥" + expensData.objectVal(0)[k] + "</td><td>￥" + expensData.objectVal(1)[k] + "</td><td>￥" + expensData.objectVal(2)[k] + "</td><td>￥" + expensData.objectVal(3)[k] + "</td><td>￥" + expensData.objectVal(4)[k] + "</td><td>￥" + expensData.objectVal(5)[k] +
            "</td><td>￥" + expensData.objectVal(6)[k] + "</td><td>￥" + expensData.objectVal(7)[k] + "</td><td>￥" + expensData.objectVal(8)[k] + "</td></tr>";

        sum = sum + expensData.objectVal(0)[k] * 100 + expensData.objectVal(1)[k] * 100 +
            expensData.objectVal(2)[k] * 100 + expensData.objectVal(3)[k] * 100 + expensData.objectVal(4)[k] * 100 + expensData.objectVal(5)[k] * 100 + expensData.objectVal(6)[k] * 100 + expensData.objectVal(7)[k] * 100 + expensData.objectVal(8)[k] * 100
    }

    ave = ((sum / day) / 100).toFixed(2);
    count.innerHTML = "￥" + (sum / 100).toFixed(2);
    average.innerHTML = "￥" + ave;
    tbody.innerHTML = str;
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
