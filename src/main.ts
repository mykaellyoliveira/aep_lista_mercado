const fileInput = document.querySelector<HTMLInputElement>("input[type=file]")!
const img = document.createElement("img")
const output = document.querySelector<HTMLDivElement>(".output")!

fileInput.addEventListener("change", () => {
  const file = fileInput.files;
  const reader = new FileReader();
  if (file) {
    reader.readAsDataURL(file[0])
  }
  reader.addEventListener("load", () => {
    const url: string = reader.result as string
    img.setAttribute("SRC", url)
    img.style.width = "120px"
    img.style.height = "120px"
    
    
    output.appendChild(img);
  });

});



export { };