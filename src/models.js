
class API {
    static productsURL = 'https://m2-kenzie-shop.herokuapp.com/products';
    //Carregando a API    
    static async loadProducts () {
        const dataProducts = [];
         await fetch(API.productsURL)
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                dataProducts.push(response.products)
            })
            .catch((error) => {
                return dataProducts.push(error)
            })
        return dataProducts
    }

    //Imagem do produto segundo a ID
    static imgAPI(id) {
        const imgURL = `https://kenzie-academy-brasil.gitlab.io/fullstack/frontend/modulo2/sprint3/img/consumindo-api-produtos/${id}/Image.png`
        return imgURL
    }
}

//Função que cria o template dos cards
async function createCards () {

    //Chamando a API
    const container = document.querySelector('#shop__container')
    const data = await API.loadProducts()
    data[0].forEach((element) => {
        console.log(element)
        //Criando o container
        const section = document.createElement('section');
            section.classList.add('product__container');
        //Criando a section que envolve cada card
            container.appendChild(section);
        //Criando os cards
        section.appendChild(cardImg(element.id));

        section.appendChild(cardStars(element.reviews));

        section.appendChild(cardText(element.productName));

        //Condição de template para produtos promocionais
        if(!element.promotionStatus){

            section.appendChild(cardPrice(element.price.productPrice))

        }else{

            section.appendChild(cardPricePromotion(element.price.productPrice));

            section.appendChild(cardPrice(element.price.productPromotionPrice, element.promotionStatus));
        }
        section.appendChild(cardButton())


    })
}

//Cria a imagem do card
function cardImg (id) {
    let img = document.createElement('img');
    img.classList.add('product__img');
    img.src = API.imgAPI(id)
    return img
}

//Cria o rating de review
function cardStars (review) {
    let rest = 5 - review;

    const divStar = document.createElement('div');
        divStar.classList.add('product__stars');
    
        for (let i = 1; i <= review; i++){
            let fullStar = document.createElement('img')
                fullStar.src = './img/Star_full.png';
                fullStar.classList.add('star');
            divStar.appendChild(fullStar)
        }

        for (let i = 1; i <= rest; i++){
            let emptyStar = document.createElement('img');
                emptyStar.src = './img/Star_empty.png'
                emptyStar.classList.add('star')
            divStar.appendChild(emptyStar)
        }
    return divStar
}

//Cria o resumo do card
function cardText (text) {

    let p = document.createElement('p');
        p.classList.add('product__resumn');
        p.innerText = text
    return p
}

//Cria o preço do card
function cardPrice (price, promotion) {

    if (!promotion){

        let small = document.createElement('small');
            small.classList.add('product__price');
            
        let format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(price) //Formatação do preço
            small.innerText = format

    return small

    } else {

        let small = document.createElement('small');
            small.classList.add('product__price');
        let format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(price); //Formatação do preço
            small.innerText = `Por: ${format}`;

    return small;
    }
}

//Cria o preço pequeno do card de produtos promocionais
function cardPricePromotion (price){

    let smallCut = document.createElement('small');
        smallCut.classList.add('product__price--active');
            let format = new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(price);
                smallCut.innerText = `De: ${format}`
    return smallCut;
}

//Cria o botão de comprar
function cardButton () {
    const btn = document.createElement('button');
    btn.classList.add('product__buy');
    btn.innerText = 'comprar';
    return btn;
}

createCards()

