fetch('https://tefeari.github.io/ColorBookmarklet/freq_heat_gnuplot2.json').then(function(response) {
    response.json().then(function(result) {
        var words = document.body.textContent.split(/[^a-zA-Z]+/g);
        var doneWords = {};
        var curWord = "";
        for (var i = 0; i < words.length; i++) {
            curWord = words[i].replace(/[^A-Za-z0-9\s]/g, "").trim().toLowerCase();
            if ((curWord.length > 0) &&
                !(curWord in doneWords) &&
                (curWord in result)) {
                findAndReplaceDOMText(document.body, {
                    find: new RegExp("\\b" + curWord + "\\b", "gi"),
                    replace: function(portion, match) {
                        var span = document.createElement("SPAN");
                        span.style.color = result[curWord];
                        span.innerText = portion.text;
                        return span;
                    }
                });
            }
            doneWords[curWord] = true;
        }
    });
});