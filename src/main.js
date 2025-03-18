import { v4 as uuidv4 } from 'uuid';

const colorForm = document.getElementById('add-color-form')
const inputName = document.getElementById('color-name')
const inputCode = document.getElementById('color-code')
const btnSubmit = document.getElementById('submit')
const colorsContainer = document.getElementById('colors-container') 
const buttonCopy = document.getElementById('buttonCopy')

let colorsArray = [];

function renderColorCard(colorObj) {
  
  const card = document.createElement('div')
  card.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'p-4', 'rounded-md', 'border')

  const colorBlock = document.createElement('div')
  colorBlock.classList.add('w-16', 'h-16', 'border-1', 'border-gray-300', 'rounded-md')
  colorBlock.style.backgroundColor = colorObj.code

  const colorNameElem = document.createElement('p')
  colorNameElem.classList.add('mt-2', 'text-sm', 'font-medium')
  colorNameElem.textContent = colorObj.name

  const colorCode = document.createElement('p')
  colorCode.classList.add('text-xs', 'text-gray-500')
  colorCode.textContent = colorObj.code

  const buttonCopy = document.createElement('button')
  buttonCopy.classList.add('mt-2', 'bg-blue-100', 'hover:bg-blue-200', 'text-blue-600', 'px-2', 'py-1', 'rounded', 'text-sm', 'font-semibold')
  buttonCopy.setAttribute('id', 'buttonCopy')
  buttonCopy.textContent = 'Copy'

  card.appendChild(colorBlock)
  card.appendChild(colorNameElem)
  card.appendChild(colorCode)
  card.appendChild(buttonCopy) 

  colorsContainer.appendChild(card)

  // colorsContainer.innerHTML = `
  //   <div class="flex flex-col items-center justify-center p-4 rounded-md border">
  //     <div class="w-16 h-16 rounded-md" style="background-color: ${colorObj.code};"></div>
  //       <p class="mt-2 text-sm font-medium">${colorObj.name}</p>
  //       <p class="text-xs text-gray-500">${colorObj.code}</p>
  //       <button class="mt-2 bg-blue-100 hover:bg-blue-200 text-blue-600 px-2 py-1 rounded text-sm font-semibold">
  //           Copiar
  //       </button>
  //   </div>
  // `
}


function rederAllColors(){
  // colorsContainer.innerHTML = '';
  colorsArray.forEach(element => {
    renderColorCard(element)
  })
}

colorForm.addEventListener('submit', (event) => {
  event.preventDefault()
  let name = inputName.value
  let code = inputCode.value
  let id = uuidv4()

  if(!code.startsWith('#')){
    code = `#${code}`
  } else{
    code = `${code}`
  }
  
  const newColor = { id, name, code }
  
  colorsArray.push(newColor)
  console.log('====================================');
  console.log(colorsArray);
  console.log(newColor);
  console.log('====================================');
  renderColorCard(newColor)

  const colorsJSON = JSON.stringify(colorsArray)
  localStorage.setItem('colors', colorsJSON)

  inputName.innerText = ''
  inputCode.innerText = ''
})


// buttonCopy.addEventListener('click', () => {
//   console.log('copiado')
// })

document.addEventListener('DOMContentLoaded', () => {
  const storedColors = localStorage.getItem('colors')
  if (storedColors) {    
    colorsArray = JSON.parse(storedColors)
  }
  console.log(colorsArray);
  rederAllColors()
})