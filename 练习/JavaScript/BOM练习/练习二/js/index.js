setTimeout(function () {
    var if1 = document.getElementById("if1"),
        if2 = document.getElementById("if2"),
        if1DOC = if1.contentDocument,
        if2DOC = if2.contentDocument,
        btn = if2DOC.getElementById("btn");
    btn.onclick = function () {
        var q1 = if1DOC.getElementById("q").textContent,
            w1 = if1DOC.getElementById("w").textContent,
            e1 = if1DOC.getElementById("e").textContent,
            q2 = if2DOC.getElementById("q"),
            w2 = if2DOC.getElementById("w"),
            e2 = if2DOC.getElementById("e");
        q2.textContent = q1;
        w2.textContent = w1;
        e2.textContent = e1;
    }
}, 500);
