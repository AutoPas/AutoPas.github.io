var previous;

function url_content(url) {
    return $.get(url);
}

function add_link(d, link, text){
    var link = document.createElement("a");
    link.href="/doxygen_documentation/git-master/";
    link.style="margin-right:30px"
    link.innerText=text;
    d.append(link);
}

function create_main_selector() {

    var main_selector = document.getElementById("main_selector");

    add_link(main_selector, "/doxygen_documentation/git-master/", "AutoPas Doxygen");
    add_link(main_selector, "/doxygen_documentation_md-flexible/git-master/", "MD-Flexible Doxygen");
    add_link(main_selector, "http://autopas-performance-explorer.pproc-be.sccs.in.tum.de/", "Performance-Explorer");

}

function create_version_selector() {

    var version_selector = document.getElementById("autopas_version_selector");

    var url = window.location.href;

    // we assume we are on some website from here on out!
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
    create_main_selector();
    create_version_selector();
    add_version_change();
}