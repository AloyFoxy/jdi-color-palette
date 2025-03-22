import { v4 as uuidv4 } from 'uuid';

const colorForm = document.getElementById('add-color-form')
const inputName = document.getElementById('color-name')
const inputCode = document.getElementById('color-code')
const btnSubmit = document.getElementById('submit')
const colorsContainer = document.getElementById('colors-container') 
const buttonCopy = document.getElementById('buttonCopy')

let colorsArray = [];

// DarkMode
const darkModeToggle = document.getElementById('toggle-darkmode');
const htmlElement = document.documentElement;

// Función para establecer el tema
const setTheme = (isDark) => {
  if (isDark) {
    htmlElement.classList.add('dark');
    localStorage.theme = 'dark';
  } else {
    htmlElement.classList.remove('dark');
    localStorage.theme = 'light';
  }
};

// Inicializar tema basado en localStorage o preferencia del sistema
const isDarkMode = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
setTheme(isDarkMode);

// Toggle del tema al hacer click
darkModeToggle.addEventListener('click', () => {
  const isDark = htmlElement.classList.contains('dark');
  setTheme(!isDark);
});



colorsContainer.addEventListener('click', (e) => {
  if(e.target && e.target.matches('button.buttonCopy')) {
    navigator.clipboard.writeText(e.target.dataset.color)
    console.log(e.target.dataset.color)
  }
  
  if (e.target && e.target.matches('button.buttonEdit')) {
    showModalEdit(e)
  }

  if (e.target && e.target.matches('button.buttonDelete')) {
    showModalDelete(e)
    console.log('Eliminar este color ' + e.target.dataset.id)

  }
})

function showModalEdit(e) {
    const modalWrapper = document.getElementById('modalWrapper')
    // Crear el modal principal
    const modal = document.createElement('div')
    modal.classList.add('relative', 'z-10')
    modal.setAttribute('aria-labelledby', 'modal-title')
    modal.setAttribute('role', 'dialog')
    modal.setAttribute('aria-modal', 'true')

    // Crear el overlay del modal
    const modalOverlay = document.createElement('div')
    modalOverlay.classList.add('fixed', 'inset-0', 'bg-gray-500/75', 'transition-opacity')
    modalOverlay.setAttribute('aria-hidden', 'true')

    // Crear el contenedor principal del modal
    const modalContainer = document.createElement('div')
    modal.setAttribute('id', 'modal')
    modalContainer.classList.add('fixed', 'inset-0', 'z-10', 'w-screen', 'overflow-y-auto')

    // Crear el contenedor de alineación
    const modalAlignment = document.createElement('div')
    modalAlignment.classList.add('flex', 'min-h-full', 'items-end', 'justify-center', 'p-4', 'text-center', 'sm:items-center', 'sm:p-0')

    // Panel principal del modal
    const modalPanel = document.createElement('div')
    modalPanel.classList.add('relative', 'transform', 'overflow-hidden', 'rounded-lg', 'bg-white', 'text-left', 'shadow-xl', 'transition-all', 'sm:my-8', 'sm:w-full', 'sm:max-w-lg')

    // Contenido del modal
    const modalContent = document.createElement('div')
    modalContent.classList.add('bg-white', 'dark:bg-neutral-900', 'px-4', 'pt-5', 'pb-4', 'sm:p-6', 'sm:pb-4')

    const contentWrapper = document.createElement('div')
    contentWrapper.classList.add('sm:flex', 'sm:items-start')


    // Texto del modal
    const textContainer = document.createElement('div')
    textContainer.classList.add('mt-3', 'text-center', 'sm:mt-0', 'sm:ml-4', 'sm:text-left')
    textContainer.setAttribute('id', 'textContainer')

    const modalTitle = document.createElement('h3')
    modalTitle.classList.add('text-base', 'font-semibold', 'text-gray-900', 'dark:text-gray-300' )
    modalTitle.id = 'modal-title'
    modalTitle.textContent = 'Are you sure you want to delete this color?'

    const modalDescription = document.createElement('div')
    modalDescription.classList.add('my-2', 'flex', 'gap-4', 'dark:text-gray-300')

    const descriptionText = document.createElement('p')
    descriptionText.classList.add('text-sm', 'text-gray-500', 'dark:text-gray-300')
    descriptionText.textContent = 'Write HEX Code to change your color'

    const inputEditCode = document.createElement('input')
    inputEditCode.classList.add('w-full', 'border', 'border-gray-300', 'rounded-md', 'px-3', 'py-2', 'dark:text-neutral-300', 'border-neutral-300', 'dark:border-neutral-800', 'focus:outline-none', 'focus:ring-1', 'focus:ring-neutral-500')
    inputEditCode.setAttribute('placeholder', 'Change Color Code')
    inputEditCode.setAttribute('type', 'text')
    inputEditCode.setAttribute('id', 'modal-inputCode')

    const inputEditName = document.createElement('input')
    inputEditName.classList.add('w-full', 'border', 'border-gray-300', 'rounded-md', 'px-3', 'py-2', 'dark:text-neutral-300', 'border-neutral-300', 'dark:border-neutral-800', 'focus:outline-none', 'focus:ring-1', 'focus:ring-neutral-500')
    inputEditName.setAttribute('placeholder', 'Change Color Name')
    inputEditName.setAttribute('type', 'text')
    inputEditName.setAttribute('id', 'modal-inputName')
    
    // Botones del modal
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('bg-gray-50', 'dark:bg-neutral-900', 'px-4', 'py-3', 'sm:flex', 'sm:flex-row-reverse', 'sm:px-6')

    const buttonEditModal = document.createElement('button')
    buttonEditModal.classList.add('modal-buttonEditModal','mt-2', 'text-orange-400', 'hover:text-white', 'border', 'border-orange-400', 'hover:bg-orange-500', 'focus:ring-4', 'focus:outline-none', 'focus:ring-orange-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-orange-300', 'dark:text-orange-300', 'dark:hover:text-white', 'dark:hover:bg-orange-400', 'dark:focus:ring-orange-900', 'cursor-pointer')
    buttonEditModal.textContent = 'Edit'

    const buttonCancel = document.createElement('button')
    buttonCancel.classList.add('modal-buttonCancel','mt-2', 'text-gray-900', 'hover:text-white', 'border', 'border-gray-800', 'hover:bg-gray-900', 'focus:ring-4', 'focus:outline-none', 'focus:ring-gray-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-gray-600', 'dark:text-gray-400', 'dark:hover:text-white', 'dark:hover:bg-gray-600', 'dark:focus:ring-gray-800', 'transition', 'cursor-pointer')
    buttonCancel.textContent = 'Cancel'

    // Construir la estructura del modal

    textContainer.appendChild(modalTitle)
    textContainer.appendChild(descriptionText)
    modalDescription.appendChild(inputEditCode)
    modalDescription.appendChild(inputEditName)
    textContainer.appendChild(modalDescription)

    contentWrapper.appendChild(textContainer)
    modalContent.appendChild(contentWrapper)

    buttonContainer.appendChild(buttonEditModal)
    buttonContainer.appendChild(buttonCancel)

    modalPanel.appendChild(modalContent)
    modalPanel.appendChild(buttonContainer)

    modalAlignment.appendChild(modalPanel)
    modalContainer.appendChild(modalAlignment)

    modal.appendChild(modalOverlay)
    modal.appendChild(modalContainer)
    modalWrapper.appendChild(modal)

    // Usar requestAnimationFrame para asegurar que el DOM está listo
    requestAnimationFrame(() => {
      inputEditCode.focus()
    })

    buttonContainer.addEventListener('click', (event) => {
      if (event.target && event.target.matches('button.modal-buttonCancel')) {
          console.log('Cerrar Modal');
          closeModal()
      }    
      
      if (event.target && event.target.matches('button.modal-buttonEditModal')) {
        const inputEditCode = document.getElementById('modal-inputCode').value
        const inputEditName = document.getElementById('modal-inputName').value

        editColor(e, inputEditCode, inputEditName)
      }    
    })
}

function showModalDelete(e){
  const modalWrapper = document.getElementById('modalWrapper')
  // Crear el modal principal
  const modal = document.createElement('div')
  modal.classList.add('relative', 'z-10')
  modal.setAttribute('aria-labelledby', 'modal-title')
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', 'true')

  // Crear el overlay del modal
  const modalOverlay = document.createElement('div')
  modalOverlay.classList.add('fixed', 'inset-0', 'bg-gray-500/75', 'transition-opacity')
  modalOverlay.setAttribute('aria-hidden', 'true')

  // Crear el contenedor principal del modal
  const modalContainer = document.createElement('div')
  modal.setAttribute('id', 'modal')
  modalContainer.classList.add('fixed', 'inset-0', 'z-10', 'w-screen', 'overflow-y-auto')

  // Crear el contenedor de alineación
  const modalAlignment = document.createElement('div')
  modalAlignment.classList.add('flex', 'min-h-full', 'items-end', 'justify-center', 'p-4', 'text-center', 'sm:items-center', 'sm:p-0')

  // Panel principal del modal
  const modalPanel = document.createElement('div')
  modalPanel.classList.add('relative', 'transform', 'overflow-hidden', 'rounded-lg', 'bg-white', 'text-left', 'shadow-xl', 'transition-all', 'sm:my-8', 'sm:w-full', 'sm:max-w-lg')

  // Contenido del modal
  const modalContent = document.createElement('div')
  modalContent.classList.add('bg-white', 'dark:bg-neutral-900', 'px-4', 'pt-5', 'pb-4', 'sm:p-6', 'sm:pb-4')

  const contentWrapper = document.createElement('div')
  contentWrapper.classList.add('flex', 'flex-col', 'items-center')
  const svgIcon = document.createElement('svg')
  svgIcon.classList.add('w-12', 'h-12', 'text-red-500', 'dark:text-red-500')
  svgIcon.setAttribute('src', 'path_to_your_svg_file')
  svgIcon.setAttribute('alt', 'Your SVG Icon')

  // Texto del modal
  const textContainer = document.createElement('div')
  textContainer.classList.add('mt-3', 'text-center',)
  textContainer.setAttribute('id', 'textContainer')

  const modalTitle = document.createElement('span')
  modalTitle.classList.add('text-xl', 'font-semibold', 'text-gray-900', 'dark:text-gray-300' )
  modalTitle.id = 'modal-title'
  modalTitle.textContent = 'Are you sure you want to delete this color?'

  // Botones del modal
  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('bg-gray-50', 'dark:bg-neutral-900', 'px-4', 'py-3', 'flex', 'flex-row', 'justify-center','sm:px-6')

  const buttonDeleteModal = document.createElement('button')
  buttonDeleteModal.classList.add('modal-buttonDeleteModal','mt-2', 'text-red-700', 'hover:text-white', 'border', 'border-red-700', 'hover:bg-red-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-red-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-red-500', 'dark:text-red-500', 'dark:hover:text-white', 'dark:hover:bg-red-600', 'dark:focus:ring-red-900', 'cursor-pointer')
  buttonDeleteModal.textContent = 'Delete'

  const buttonCancel = document.createElement('button')
  buttonCancel.classList.add('modal-buttonCancel','mt-2', 'text-gray-900', 'hover:text-white', 'border', 'border-gray-800', 'hover:bg-gray-900', 'focus:ring-4', 'focus:outline-none', 'focus:ring-gray-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-gray-600', 'dark:text-gray-400', 'dark:hover:text-white', 'dark:hover:bg-gray-600', 'dark:focus:ring-gray-800', 'transition', 'cursor-pointer')
  buttonCancel.textContent = 'Cancel'

  // Construir la estructura del modal

  contentWrapper.appendChild(svgIcon) // Aquí se añade el icono SVG al contenedor de contenido

  textContainer.appendChild(modalTitle)

  contentWrapper.appendChild(textContainer)
  modalContent.appendChild(contentWrapper)

  buttonContainer.appendChild(buttonDeleteModal)
  buttonContainer.appendChild(buttonCancel)

  modalPanel.appendChild(modalContent)
  modalPanel.appendChild(buttonContainer)

  modalAlignment.appendChild(modalPanel)
  modalContainer.appendChild(modalAlignment)

  modal.appendChild(modalOverlay)
  modal.appendChild(modalContainer)
  modalWrapper.appendChild(modal)

  buttonContainer.addEventListener('click', (event) => {
    if (event.target && event.target.matches('button.modal-buttonCancel')) {
        console.log('Cerrar Modal');
        closeModal()
    }    
    
    if (event.target && event.target.matches('button.modal-buttonDeleteModal')) {
      deleteColor(e)
    }    
  })
}

function closeModal() {
  const modal = document.getElementById('modal')
  if (modal) {
    modal.remove()
  }
}

function deleteColor(e){
  console.log('Color que quiero eliminar' + e.target.dataset.id);
  colorsArray.map(color => {
    if (color.id == e.target.dataset.id) {        
      colorsArray = colorsArray.filter(obj => obj.id !== e.target.dataset.id);

      const colorsJSON = JSON.stringify(colorsArray)
      localStorage.setItem('colors', colorsJSON)
      closeModal()
      renderAllColors()
      console.log(colorsArray);
      
    }
  })
}

function editColor(e, inputEditCode, inputEditName) {
  console.log('la funcion funciona ' + e.target.dataset.id);
  
  colorsArray.map(color => {
    if (color.id == e.target.dataset.id) {        
      if (inputEditCode && inputEditName) {
        if(!inputEditCode.startsWith('#')){
          inputEditCode = `#${inputEditCode}`
        } else{
          inputEditCode = `${inputEditCode}`
        }      
        
        
        

        color.code = inputEditCode      
        color.name = inputEditName      

        console.log(colorsArray);
  
        const colorsJSON = JSON.stringify(colorsArray)
        localStorage.setItem('colors', colorsJSON)
        closeModal()
        renderAllColors()

       
        

      } else {
          const warningText = document.createElement('p')
          warningText.classList.add('relative', 'text-sm', 'text-red-500', 'font-semibold')
          warningText.textContent = 'Por favor, completa todos los campos requeridos'
          setTimeout(() => {
            warningText.classList.add('hidden')
          }, 2000);
          const textContainer = document.getElementById('textContainer')
          textContainer.appendChild(warningText)
      }
    }
  })
}

function renderColorCard(colorObj) {
  
  const card = document.createElement('div')
  card.classList.add('flex', 'flex-col', 'border-1', 'border-gray-300', 'dark:border-gray-800', 'items-center', 'justify-center', 'p-4', 'rounded-md', 'border', 'sm:bg-red-500')

  const colorBlock = document.createElement('div')
  colorBlock.classList.add('w-full', 'h-16', 'border-1', 'border-gray-300', 'dark:border-gray-800',  'rounded-md')
  colorBlock.style.backgroundColor = colorObj.code

  const colorInfoContainer = document.createElement('div')
  colorInfoContainer.classList.add('flex', 'flex-row', 'items-center', 'mt-2', 'gap-4')

  const colorNameElem = document.createElement('p')
  colorNameElem.classList.add('text-lg', 'font-semibold', 'text-gray-500','dark:text-gray-300')
  colorNameElem.textContent = colorObj.name

  const colorCodeElem = document.createElement('p')
  colorCodeElem.classList.add('text-lg', 'text-gray-500')
  colorCodeElem.textContent = colorObj.code

  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList.add('flex', 'justify-between')

  const buttonCopy = document.createElement('button')
  buttonCopy.classList.add('buttonCopy', 'mt-2', 'text-gray-900', 'hover:text-white', 'border', 'border-gray-800', 'hover:bg-gray-900', 'focus:ring-4', 'focus:outline-none', 'focus:ring-gray-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-gray-600', 'dark:text-gray-400', 'dark:hover:text-white', 'dark:hover:bg-gray-600', 'dark:focus:ring-gray-800', 'transition', 'cursor-pointer')
  buttonCopy.setAttribute('data-color', colorObj.code)
  buttonCopy.textContent = 'Copy'

  const buttonEdit = document.createElement('button')
  buttonEdit.classList.add('buttonEdit','mt-2', 'text-orange-400', 'hover:text-white', 'border', 'border-orange-400', 'hover:bg-orange-500', 'focus:ring-4', 'focus:outline-none', 'focus:ring-orange-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-orange-300', 'dark:text-orange-300', 'dark:hover:text-white', 'dark:hover:bg-orange-400', 'dark:focus:ring-orange-900', 'cursor-pointer')
  buttonEdit.setAttribute('data-id', colorObj.id)
  buttonEdit.textContent = 'Edit'

  const buttonDelete = document.createElement('button')
  buttonDelete.classList.add('buttonDelete', 'mt-2', 'text-red-700', 'hover:text-white', 'border', 'border-red-700', 'hover:bg-red-800', 'focus:ring-4', 'focus:outline-none', 'focus:ring-red-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-red-500', 'dark:text-red-500', 'dark:hover:text-white', 'dark:hover:bg-red-600', 'dark:focus:ring-red-900', 'cursor-pointer')
  buttonDelete.setAttribute('data-id', colorObj.id)
  buttonDelete.textContent = 'Delete'

  card.appendChild(colorBlock)
  colorInfoContainer.appendChild(colorNameElem)
  colorInfoContainer.appendChild(colorCodeElem)
  card.appendChild(colorInfoContainer)
  card.appendChild(buttonsContainer)
  buttonsContainer.appendChild(buttonEdit)
  buttonsContainer.appendChild(buttonCopy)
  buttonsContainer.appendChild(buttonDelete)


  colorsContainer.appendChild(card)
}
function renderAllColors(){
  colorsContainer.innerHTML = '';
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
  renderAllColors()
})

