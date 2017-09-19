var scoreData = {
    classify: ["姓名", "HTML", "CSS", "JavaScript", "jQuery", "Bootstrap", "Tools", "Vue", "总分", "平均分"],
    personInfo: [
        {
            name: "马浩",
            score: [65, 74, 85, 97, 80, 79, 88]
		},
        {
            name: "王震",
            score: [75, 84, 65, 57, 70, 89, 78]
		},
        {
            name: "蔡星月",
            score: [45, 74, 95, 67, 90, 72, 66]
		},
        {
            name: "赵兴英",
            score: [65, 77, 66, 73, 68, 78, 76]
		},
        {
            name: "李鳞",
            score: [35, 47, 56, 63, 78, 88, 96]
		}
	]
}
var thead = document.getElementsByTagName("thead")[0],
    thead_tr = thead.getElementsByTagName("tr")[0],
    tbody = document.getElementsByTagName("tbody")[0];


loadHead();
loadBody();

function loadHead() {
    for (var i in scoreData.classify) {
        thead_tr.innerHTML += "<td>" + scoreData.classify[i] + "</td>"
    }
}

function loadBody() {
    var count,
        average;
    for (var i in scoreData.personInfo) {
        count = 0;
        average = 0;
        tbody.innerHTML += "<tr></tr>";
        var tbody_tr = tbody.getElementsByTagName("tr");
        var newTr = tbody_tr[tbody_tr.length - 1];
        newTr.innerHTML += "<td>" + scoreData.personInfo[i].name + "</td>"
        var scoreLength = scoreData.personInfo[i].score.length;
        for (var j in scoreData.personInfo[i].score) {
            newTr.innerHTML += "<td>" + scoreData.personInfo[i].score[j] + "</td>";
            count += scoreData.personInfo[i].score[j];
        }
        average = (count / scoreLength).toFixed(1);
        newTr.innerHTML += "<td>" + count + "</td>";
        newTr.innerHTML += "<td>" + average + "</td>";

    }
}
