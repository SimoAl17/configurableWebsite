fetch('./assets/settings/settings.json')
.then(res => res.json())
.then(loadSettings)
.catch(err => console.log(err))

function loadSettings(data) {
    const result = data;
    const title = document.getElementById('main-title');
    const textNode = document.createTextNode(result.title);
    title.appendChild(textNode)
    document.title = result.title;
    //if (result.theme === "dark") {
    //    document.link.setAttribute(href, "styleDark.css");
    //}

    const header = document.getElementsByTagName("header")[0];
    header.style.backgroundImage = "url('" + result.headerImage + "')";
    
    const footerLinks = document.getElementById("link-container");
    const fblink = document.createElement("a");
    let link = result.footerLinks[0].url;
    fblink.setAttribute("href", link);
    fblink.innerText = result.footerLinks[0].text;
    footerLinks.appendChild(fblink);
    const cellLink = document.createElement("a");
    let link1 = result.footerLinks[1].url;
    cellLink.setAttribute("href", link1);
    cellLink.innerText = result.footerLinks[1].text;
    footerLinks.appendChild(cellLink);
    setTheme(result);
}

function setTheme(data) {
    const style = document.getElementById("style");
    style.setAttribute("href", (data.theme+".css"))
}

    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    let id = params.get('id');
    if(!id){
        id = "p1"
    }
    if (id === "p1") {
        loadPage1();
    } else {
        loadPage2();
    }

 
    const navMenu = document.getElementById("nav-menu")
        const a = document.createElement('a');
        const node = document.createTextNode("pagina 1");
        a.appendChild(node);
        const url = "/?id=p1";
        a.href = url;
        navMenu.appendChild(a);

        const b = document.createElement('a');
        const node2 = document.createTextNode("pagina 2");
        b.appendChild(node2);
        const url2 = "/?id=p2";
        b.href = url2;
        navMenu.appendChild(b);

function loadPage1() {
    fetch('./assets/pages/page1.md')
    .then(res => res.text())
    .then(loadPage11)
    .catch(err => console.log(err))
}

function loadPage11(data) {
    document.getElementById('page-content').innerHTML =
      marked.parse(data);
}


function loadPage2() {
    fetch('./assets/pages/page2.md')
    .then(res => res.text())
    .then(loadPage22)
    .catch(err => console.log(err))
}

function loadPage22(data) {
    document.getElementById('page-content').innerHTML =
      marked.parse(data);
}