import { Div, Fragment, Heading, Image, Paragraph } from "../atoms/index.js"

export const ProductListView = (products) => {
    const element = Fragment()

    products.forEach(product => {
        const { imageURL, name, price, slug, stock, teaser } = product

        const div = Div('')
        const img = Image(`http://localhost:4000${imageURL}`, name)
        div.append(img)

        const info = Div()
        const h2 = Heading(name,2) 
        const p = Paragraph()
        p.innerHTML = teaser
        info.append(h2, p)
        div.append(info)

        const cost = Div('')
        cost.innerText = price
        div.append(cost)

        element.append(div)
    });

    return element
}