class rndCat {
    constructor() {
        this.site = document.querySelector("main")

        this.store = {
            "categories":[]
        }
    }

    createCategory(data) {
        if (!data["values"]) { data["values"] = []}
        if (!data["type"]) { data["tyoe"] = "tag"}
        this.store["categories"].push(data)
    }

    getItem(list, exclude) {
        let randomItem = list[Math.floor(Math.random() * list.length)]
        while (exclude.includes(randomItem)) {
            randomItem = list[Math.floor(Math.random() * list.length)]
        }
        return randomItem
    }

    addItem(target, value, action) {
        for (let category of this.store["categories"]) {
            if (category["name"] == target) {
                if (action == "reset") {
                    category["values"] = [value]
                }
                else if (action == "add") {
                    category["values"].push(value)
                }
            }
        } 
    }

    draw() {
        for (let category of this.store["categories"]) {

            let catHeader = document.createElement("h1")
            catHeader.innerText = category["name"]
            let catHeaderReload = document.createElement("span")
            catHeaderReload.innerHTML = "&#8634;"
            catHeaderReload.onclick = () => { 
                this.addItem(category["name"], this.getItem(category["avaliable"], category["values"]), "reset")
                this.reload() 
            }
            catHeader.append(catHeaderReload)
            let catHeaderContainer = document.createElement("div")
            catHeaderContainer.classList.add("head")
            catHeaderContainer.append(catHeader)

            let catBodyContainer = document.createElement("div")
            catBodyContainer.classList.add("body")
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
            catSection.append(catHeaderContainer)
            catSection.append(catBodyContainer)

            this.site.append(catSection)
        }
    }

    clean() {
        this.site.replaceChildren()
    }

    reload() {
        this.clean()
        this.draw()
    }

    randomColor() {
        let r = Math.floor(Math.random() * 255).toString(16)
        let g = Math.floor(Math.random() * 255).toString(16)
        let b = Math.floor(Math.random() * 255).toString(16)
        let rgb = "#" + r + g + b
        return rgb
    }

}