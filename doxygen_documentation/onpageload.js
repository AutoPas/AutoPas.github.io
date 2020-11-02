let previous;

function url_content(url) {
    return $.get(url);
}

function add_link(d, url, text) {
    let link = document.createElement("a");
    link.href = url;
    link.style.marginRight = '30px';
    link.innerText = text;
    d.append(link);
}

function create_main_selector() {

    const main_selector = document.getElementById("main_selector");

    add_link(main_selector, "/doxygen_documentation/git-master/", "AutoPas Doxygen");
    add_link(main_selector, "/doxygen_documentation_md-flexible/git-master/", "MD-Flexible Doxygen");
    add_link(main_selector, "http://autopas-performance-explorer.pproc-be.sccs.in.tum.de/", "Performance-Explorer");

}

function create_version_selector() {

    const version_selector = document.getElementById("autopas_version_selector");

    const url = window.location.href;

    // we assume we are on some website from here on out!
    const indexBase = "../existing_releases.txt";

    url_content(indexBase).done(function (data) {
        let doc_txt = data.toString();
        const lines = doc_txt.split('\n');

        for (let i = 0; i < lines.length; i++) {
            const option = document.createElement("option");
            if (lines[i] === "") {
                continue;
            }
            option.text = lines[i];
            option.value = lines[i];
            if (url.includes(lines[i])) {
                option.selected = true;
                previous = lines[i];
            }
            version_selector.appendChild(option);
        }
    });
}

function autopas_version_change() {
    const version_selector = document.getElementById("autopas_version_selector");
    const selected = version_selector.options[version_selector.selectedIndex].value;
    const old_url = window.location.href;
    window.location.href = old_url.replace(previous, selected);
}

function add_version_change() {
    const version_selector = document.getElementById("autopas_version_selector");
    version_selector.addEventListener("change", function () {
        autopas_version_change()
    }, false);
}

function on_page_load() {
    create_main_selector();
    create_version_selector();
    add_version_change();
}