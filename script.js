class rndCat {
    constructor() {
        this.site = document.querySelector("main")

        this.store = {
            "categories":[
                {
                    "name":"Branch",
                    "type":"tag",
                    "values":["Pizzeria"],
                    "avaliable":["Skomakare","Bilmekaniker","Pizzeria"]
                },
                {
                    "name":"Färg",
                    "type":"color",
                    "values":["#ff0000"],
                    "avaliable":["#ff0000","#00ff00","#0000ff"]
                },
            ]
        }
    }

    createCategory() {

    }

    draw() {
        for (let category of this.store["categories"]) {

            if (!category["background-color"]) { category["background-color"] = this.randomColor() }

            let catHeader = document.createElement("h1")
            catHeader.innerText = category["name"]
            let catHeaderContainer = document.createElement("div")
            catHeaderContainer.classList.add("head")
            catHeaderContainer.append(catHeader)

            let catBodyContainer = document.createElement("div")
            for (let catBodyContent of category["values"]) {
                if (category["type"] == "tag") {
                    let catBodyItem = document.createElement("span")
                    catBodyItem.innerText = catBodyContent
                    catBodyContainer.append(catBodyItem)
                }
                else if (category["type"] == "color") {
                    let catBodyItem = document.createElement("span")
                    catBodyItem.innerText = catBodyContent
                    catBodyContainer.append(catBodyItem)
                }
            }

            let catSection = document.createElement("section")
            catSection.style.backgroundColor = category["background-color"]
            catSection.append(catHeaderContainer)
            catSection.append(catBodyContainer)

            this.site.append(catSection)
        }
    }

    clean() {
        this.site.replaceChildren()
    }

    randomColor() {
        let r = Math.floor(Math.random() * 255).toString(16)
        let g = Math.floor(Math.random() * 255).toString(16)
        let b = Math.floor(Math.random() * 255).toString(16)
        let rgb = "#" + r + g + b
        return rgb
    }

}