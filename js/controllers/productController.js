import { getDetails, getList } from "../models/productModel.js"
import { ProductDetailsView, ProductListView } from "../views/organisms/productViews.js"
import { Layout } from "./layoutController.js"

//Funktion der styrer hvilken produktside der skal vises
export const ProductPage = async () => {
    //Henter værdier fra URL'en (fx ?category=mad&product=123)
    const { category = 'vand-og-vandrensning', product } = Object.fromEntries(new URLSearchParams(location.search));
    let html = ''

    //Hvis der IKKE er vlagt et specifikt produkt → vis produktlisten
    if (!product) {
        html = ProductList()
    }
    //Ellers →  vis detaljer for det valgte produkt
    else {
        html = ProductDetails(product)
    }

    //Retunerer det færdige HTML-indhold til siden
    return html
}

//Funktion der viser en liste af produkter indenfor en kategori
export const ProductList = async () => {
    //Finder kategori fra URL'en (eller bruger standardkategori)
    const { category = 'vand-og-vandrensning' } = Object.fromEntries(new URLSearchParams(location.search));

    // Henter prodktdata fra API'et
    const data = await getList(category)

    //Tilføjer teksten og farve baseret på om produktet er påå lager
    const formattedProducts = data.map(item => ({
        ...item,
        stockText: item.stock ? 'På lager' : 'Forventes på lager indenfor få uger',
        stockClass: item.stock ? 'text-green-600' : 'text-red-600'
    }))

    //Laver HTML for produktlisten
    const html = ProductListView(formattedProducts, category)

    // Pakker det hele ind i layoutet (header, footer osv.)
    const layout = Layout('Produkter', html)

    //Retunerer den færdige side
    return layout
}

//Funktion der viser detaljer om ét specefikt produkt
export const ProductDetails = async (product) => {
    //Henter detaljer om det valgte produkt fra API'et
    const data = await getDetails(product);

    //Laer HTML for produktdetalgerne
    const html = ProductDetailsView(data);

    //Pakker ind i layout (uden title)
    const layout = Layout('', html)

    //Retunerer hele siden klar til visning
    return layout
}