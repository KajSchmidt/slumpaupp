﻿class rndCat {
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
        if (list.length == exclude.length) { return }
        let randomItem = list[Math.floor(Math.random() * list.length)]
        while (exclude.includes(randomItem)) {
            randomItem = list[Math.floor(Math.random() * list.length)]
        }
        return randomItem
    }

    addItem(target, value, action) {
        if (!value) { return }
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

            /* Reroll item button */
            let catHeaderReroll = document.createElement("span")
            catHeaderReroll.innerHTML = "&#8634;"
            catHeaderReroll.onclick = () => { 
                this.addItem(category["name"], this.getItem(category["avaliable"], category["values"]), "reset")
                this.reload() 
            }
            catHeader.append(catHeaderReroll)

            /* Add item button */
            let catHeaderAdd = document.createElement("span")
            catHeaderAdd.innerHTML = "&#x2b;"
            catHeaderAdd.onclick = () => { 
                this.addItem(category["name"], this.getItem(category["avaliable"], category["values"]), "add")
                this.reload() 
            }
            catHeader.append(catHeaderAdd)

            
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
                    let catBodyItemColor = document.createElement("div")
                    catBodyItemColor.innerHTML = "&nbsp;"
                    catBodyItemColor.classList.add("color")
                    catBodyItemColor.style.backgroundColor = catBodyContent
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