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

fetch('./assets/settings/pages.json')
.then(res => res.json())
.then(loadContent)
.catch(err => console.log(err))



function loadContent(data) {
    const allPages = data;
    setNavMenu(allPages);
    
    const paramsString = window.location.search;
    const params = new URLSearchParams(paramsString);
    let id = params.get('id');
    if(!id){
        id = "p1"
    }
    const page = allPages.filter(p => p.id === id)[0];

    const content = document.getElementById("page-content");
    for (const conte of page.content) {
        const elemento = createPage(conte);
        content.appendChild(elemento);
    }
}

function setNavMenu(allPages) {
    const navMenu = document.getElementById("nav-menu")
    for (const page of allPages) {
        const a = document.createElement('a');
        const node = document.createTextNode(page.name);
        a.appendChild(node);
        //const baseUrl = window.location.toString().split("=")[0];
        //const url = baseUrl + "=" + page.id;
        const url = "/?id=" + page.id;
        a.href = url;
        navMenu.appendChild(a);
    }
}

function createPage(contPage) {
    const tagElement = document.createElement(contPage.tag);
    if (contPage.tag === "img") {
        tagElement.setAttribute("src", contPage.url);
        tagElement.setAttribute("width", "300px");
    } else if (contPage.tag === "div") {
    } else {
        tagElement.innerText = contPage.text;
    }

    if (contPage.children) {
        for (const child of [contPage.children]) {
            for (const element of child) {
                const figlio = createPage(element);
                tagElement.appendChild(figlio);
            }
        }
    }
    if (contPage.class) {
        tagElement.className = contPage.class;
    }
    if (contPage.style) {
        tagElement.style = contPage.style;
    }
    return tagElement;
    
}