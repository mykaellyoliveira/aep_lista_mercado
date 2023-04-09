// pegando itens do json e adicionando nas divs 
export interface Itens{
  name: string;
  category: string;
  price: number;
  image: string;
}

const route = 'http://localhost:3000/itens'

const itens = fetch(route).then(res => res.json())

console.log(itens)

const main = document.querySelector('main');

itens.then((response: Itens[]) => {
   response.forEach((item) => {
    const card = document.createElement('itens-card')
    card.addSlot('name', item.name)
    card.addSlot('category', item.category)
    card.addSlot('price', item.price)
    card.addSlot('image', item.image)
    main?.appendChild(card)

  })
})

const itemTemplate = document.querySelector<HTMLTemplateElement>('#item')

class ItemCardElement extends HTMLElement{
  connectedCallback(){
    if(itemTemplate){
      const fragment = itemTemplate.content.cloneNode(true) as DocumentFragment
      const shadow = this.attachShadow({mode: 'open'})
      shadow.appendChild(fragment)
    }
  }
  
  addSlot(name: 'name' | 'category' | 'price' | 'image', value: string){
    const span = document.createElement('span')
    span.slot = name
    span.innerText = value
    this.appendChild(span)
  }
}

customElements.define('itens-card', ItemCardElement)
