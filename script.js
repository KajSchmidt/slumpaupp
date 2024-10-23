class rndCat {
    constructor() {
        this.site = document.querySelector("main")

        this.store = {
            "categories":[]
        }
    }

    createCategory(data) {
        if (!data["items"]) { data["items"] = []}
        if (!data["type"]) { data["tyoe"] = "tag"}
        this.store["categories"].push(data)
    }

    getItem(items) {
        let response = {"item":"","error":"noerror"}
        let randomItem = items.list[Math.floor(Math.random() * items.list.length)]
        if (items.list.length <= (items.exclude.length + items.current.length)) {
            response["item"] = randomItem
            response["error"] = "eol" /* End of list error */
        }
        else {
            while (items.exclude.includes(randomItem) || items.current.includes(randomItem)) {
                randomItem = items.list[Math.floor(Math.random() * items.list.length)]
            }
            response["item"] = randomItem
        }
        return response
    }

    addItem(item) {
        for (let category of this.store["categories"]) {
            if (category["name"] == item["category"]) {
                if (item.action == "reset") {
                    category["items"] = [item.item["item"]]
                }
                else if (item.action == "add" && item.item["error"] == "eol") {
                    return
                }
                else if (item.action == "add") {
                    category["items"].push(item.item["item"])
                }
            }
        } 
    }

    draw() {
        for (let category of this.store["categories"]) {

            let catHeader = document.createElement("h1")
            catHeader.innerText = category["name"]

            if (category["icon"]) {
                let catHeaderIcon = document.createElement("i")
                catHeaderIcon.className = category["icon"]
                catHeaderIcon.classList.add("icon")
                catHeader.prepend(catHeaderIcon)
            }

            /* Reroll item button */
            let catHeaderReroll = document.createElement("i")
            catHeaderReroll.classList.add("fa-solid")
            catHeaderReroll.classList.add("fa-rotate")
            catHeaderReroll.classList.add("action")
            catHeaderReroll.setAttribute("title", "Slumpa om")
            catHeaderReroll.onclick = () => { 
                this.addItem({"category":category["name"], "item":this.getItem({"list":category["avaliable"],"current": category["items"], "exclude":[]}), "action":"reset"})
                this.reload() 
            }
            catHeader.append(catHeaderReroll)

            /* Add item button */
            let catHeaderAdd = document.createElement("i")
            catHeaderAdd.classList.add("fa-solid")
            catHeaderAdd.classList.add("fa-plus")
            catHeaderAdd.classList.add("action")
            catHeaderAdd.setAttribute("title", "Lägg till en")
            catHeaderAdd.onclick = () => { 
                this.addItem({"category":category["name"], "item":this.getItem({"list":category["avaliable"],"current": category["items"], "exclude":[]}), "action":"add"})
                this.reload() 
            }
            catHeader.append(catHeaderAdd)

            
            let catHeaderContainer = document.createElement("div")
            catHeaderContainer.classList.add("head")
            catHeaderContainer.append(catHeader)

            let catBodyContainer = document.createElement("div")
            catBodyContainer.classList.add("body")
            for (let catBodyContent of category["items"]) {
                if (category["type"] == "tag") {
                    let catBodyItem = document.createElement("span")
                    catBodyItem.innerText = catBodyContent
                    catBodyContainer.append(catBodyItem)
                }
                else if (category["type"] == "color") {
                    let catBodyItem = document.createElement("span")
                    catBodyItem.innerText = catBodyContent
                    catBodyContainer.append(catBodyItem)
                    let catBodyItemColor = document.createElement("span")
                    catBodyItemColor.innerHTML = "&#x2588;"
                    catBodyItemColor.classList.add("color")
                    catBodyItemColor.style.color = catBodyContent
                    catBodyItem.prepend(catBodyItemColor)
                }
                else if (category["type"] == "tricluster") {

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