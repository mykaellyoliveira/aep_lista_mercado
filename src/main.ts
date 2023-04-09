const fileInput = document.querySelector<HTMLInputElement>("input[type=file]")!
const img = document.createElement("img")
const output = document.querySelector<HTMLDivElement>(".output")!
const inputname = document.querySelector<HTMLInputElement>("#name")!
const inputcategory = document.querySelector<HTMLSelectElement>("#category")!
const inputprice = document.querySelector<HTMLInputElement>("#price")!
const button = document.querySelector<HTMLButtonElement>("#add")!

let url: string = ""
let jsonString = ""
//carregando imagem na div 
fileInput.addEventListener("change", () => {
  const file = fileInput.files;
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file[0])
  }
  reader.addEventListener("load", () => {
    url = reader.result as string
    img.setAttribute("SRC", url)
    img.style.width = "120px"
    img.style.height = "120px"

    output.appendChild(img);
  });
});

// pegando informações do formulário transformando em json e jogando na rota
button.addEventListener("click", async (event) => {
  event.preventDefault();
 
    const item  = {
      name: inputname.value, 
      category: inputcategory.options[inputcategory.selectedIndex].text,
      price: parseFloat(inputprice.value),
      image: url,
    }

    const response = await fetch('http://localhost:3000/itens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(item)
    })

    inputname.value = '';
    inputprice.value = '';
    fileInput.value = '';
    output.removeChild(img);

    alert("Item adicionado a lista com sucesso")
})



