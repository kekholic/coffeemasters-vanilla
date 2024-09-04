// TODO refactor with receiving a collection of routes with a regex as path and component to render
const Router = {
    init: () => {
        document.querySelectorAll("a.navlink").forEach((a)=> {
            a.addEventListener("click", (event) => {
                event.preventDefault();
                const url = event.target.getAttribute("href");
                Router.go(url)
            })
        })

        // for URL changes
        window.addEventListener("popstate", (event) => {
            Router.go(event.state.route, false)
        })
        // inital URL can be no "/"
        Router.go(location.pathname);
    },
    go: (route, addToHistory = true) => {
        console.log(`Going to ${route}`);

        if (addToHistory) {
            history.pushState({ route }, null, route)
        }
        let pageElement = null
        switch(route) {
            case "/":
                pageElement = document.createElement("menu-page");
                break;
            case "/order": 
                pageElement = document.createElement("order-page");
                pageElement.textContent = "Your order";
                break;
            default: 
                if (route.startsWith("/product-")) {
                    pageElement = document.createElement("details-page");
                    const paramId = route.substring(route.lastIndexOf("-")+1);
                    pageElement.dataset.productId = paramId;
                }
        }

        if (pageElement) {
            let cache = document.querySelector("main")
            cache.innerHTML = '';
            cache.appendChild(pageElement);
            window.scrollX = 0;
            window.scrollY = 0;
        } else {
            // 404
            document.querySelector("main").innerHTML = "Oops, 404!"

        }
    }
}

export default Router;