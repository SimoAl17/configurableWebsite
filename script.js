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
    const content = document.getElementById("page-content");
    const page1 = data[0];
    for (const conte of page1.content) {
        const tag = document.createElement(conte.tag);
        if (conte.tag === "img") {
            tag.setAttribute("src", conte.url);
            tag.setAttribute("width", "300px");
        } else {
            tag.innerText = conte.text;
        }
        content.appendChild(tag);
    }
}