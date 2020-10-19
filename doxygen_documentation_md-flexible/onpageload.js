var previous;

function url_content(url) {
    return $.get(url);
}

function create_version_selector() {

    var version_selector = document.getElementById("autopas_version_selector");

    var url = window.location.href;

    // we assume we are on some website from here on out!
    //var base = url.replace("/doc_doxygen/master/index.html","");
    var indexBase = "../existing_releases.txt";

    url_content(indexBase).done(function (data) {
        doc_txt = data.toString();
        var lines = doc_txt.split('\n');

        for (var i = 0; i < lines.length; i++) {
            var option = document.createElement("option");
            if (lines[i] === "") {
                continue;
            }
            option.text = lines[i];
            option.value = lines[i];
            if (url.includes(lines[i])) {
                option.selected = "selected";
                previous = lines[i];
            }
            version_selector.appendChild(option);
        }
    });
}

function autopas_version_change() {
    var version_selector = document.getElementById("autopas_version_selector");
    var selected = version_selector.options[version_selector.selectedIndex].value;
    var oldurl = window.location.href;
    var newurl = oldurl.replace(previous, selected);
    window.location.href = newurl;
}

function add_version_change() {
    var version_selector = document.getElementById("autopas_version_selector");
    version_selector.addEventListener("change", function(){ autopas_version_change() }, false);
}

function on_page_load() {
    create_version_selector();
    add_version_change();
}