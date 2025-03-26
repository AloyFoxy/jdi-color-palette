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

document.addEventListener('DOMContentLoaded', () => {
  const sampleColors = [
    { id: uuidv4(), name: 'Naranja Zorro', code: '#FF6F20' },
    { id: uuidv4(), name: 'Marrón Oso', code: '#8B4513' },
    { id: uuidv4(), name: 'Gris Lobo', code: '#e0e0e0' },
    { id: uuidv4(), name: 'Blanco Conejo', code: '#FFFFFF' },
    { id: uuidv4(), name: 'Negro Pantera', code: '#000000' }
  ];

  sampleColors.forEach(color => {
    colorsArray.push(color);
    renderColorCard(color);
  });
});


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
    modalOverlay.classList.add('fixed', 'inset-0', 'bg-neutral-500/75')
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
    modalPanel.classList.add('relative', 'transform', 'overflow-hidden', 'rounded-lg', 'bg-white', 'text-left', 'shadow-xl', 'sm:my-8', 'sm:w-full', 'sm:max-w-lg')

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
    modalTitle.classList.add('text-base', 'font-semibold', 'text-neutral-900', 'dark:text-neutral-300' )
    modalTitle.id = 'modal-title'
    modalTitle.textContent = 'Are you sure you want to delete this color?'

    const modalDescription = document.createElement('div')
    modalDescription.classList.add('my-2', 'flex', 'gap-4', 'dark:text-neutral-300')

    const descriptionText = document.createElement('p')
    descriptionText.classList.add('text-sm', 'text-neutral-500', 'dark:text-neutral-300')
    descriptionText.textContent = 'Write HEX Code to change your color'

    const inputEditCode = document.createElement('input')
    inputEditCode.classList.add('w-full', 'border', 'border-neutral-300', 'rounded-md', 'px-3', 'py-2', 'dark:text-neutral-300', 'border-neutral-300', 'dark:border-neutral-800', 'focus:outline-none', 'focus:ring-1', 'focus:ring-neutral-500')
    inputEditCode.setAttribute('placeholder', 'Change Color Code')
    inputEditCode.setAttribute('type', 'text')
    inputEditCode.setAttribute('id', 'modal-inputCode')

    const inputEditName = document.createElement('input')
    inputEditName.classList.add('w-full', 'border', 'border-neutral-300', 'rounded-md', 'px-3', 'py-2', 'dark:text-neutral-300', 'border-neutral-300', 'dark:border-neutral-800', 'focus:outline-none', 'focus:ring-1', 'focus:ring-neutral-500')
    inputEditName.setAttribute('placeholder', 'Change Color Name')
    inputEditName.setAttribute('type', 'text')
    inputEditName.setAttribute('id', 'modal-inputName')
    
    // Botones del modal
    const buttonContainer = document.createElement('div')
    buttonContainer.classList.add('bg-neutral-50', 'dark:bg-neutral-900', 'px-4', 'py-3', 'sm:flex', 'sm:flex-row-reverse', 'sm:px-6')

    const buttonEditModal = document.createElement('button')
    buttonEditModal.classList.add('modal-buttonEditModal','mt-2', 'text-orange-400', 'hover:text-white', 'border', 'border-orange-400', 'hover:bg-orange-500', 'focus:ring-4', 'focus:outline-none', 'focus:ring-orange-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-orange-300', 'dark:text-orange-300', 'dark:hover:text-white', 'dark:hover:bg-orange-400', 'dark:focus:ring-orange-900', 'cursor-pointer', 'transition-colors', 'duration-300', 'ease-in-out')
    buttonEditModal.textContent = 'Edit'

    const buttonCancel = document.createElement('button')
    buttonCancel.classList.add('modal-buttonCancel','mt-2', 'text-neutral-900', 'hover:text-white', 'border', 'border-neutral-800', 'hover:bg-neutral-900', 'focus:ring-4', 'focus:outline-none', 'focus:ring-neutral-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-neutral-600', 'dark:text-neutral-400', 'dark:hover:text-white', 'dark:hover:bg-neutral-600', 'dark:focus:ring-neutral-800', 'cursor-pointer', 'transition-colors', 'duration-300', 'ease-in-out')
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
  modal.classList.add('relative', 'z-10', 'rounded-lg', 'overflow-hidden', 'shadow-lg')
  modal.setAttribute('aria-labelledby', 'modal-title')
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-modal', 'true')

  // Crear el overlay del modal
  const modalOverlay = document.createElement('div')
  modalOverlay.classList.add('fixed', 'inset-0', 'bg-neutral-500/75')
  modalOverlay.setAttribute('aria-hidden', 'true')

  // Crear el contenedor principal del modal
  const modalContainer = document.createElement('div')
  modal.setAttribute('id', 'modal')
  modalContainer.classList.add('fixed', 'inset-0', 'z-10', 'w-screen', 'overflow-y-auto')

  // Crear el contenedor de alineación
  const modalAlignment = document.createElement('div')
  modalAlignment.classList.add('flex', 'min-h-full', 'items-center', 'justify-center', 'p-4', 'text-center', 'sm:p-0')

  // Panel principal del modal
  const modalPanel = document.createElement('div')
  modalPanel.classList.add('relative', 'transform', 'overflow-hidden', 'rounded-lg', 'bg-white', 'text-left', 'shadow-xl', 'sm:my-8', 'sm:w-full', 'sm:max-w-lg')

  // Contenido del modal
  const modalContent = document.createElement('div')
  modalContent.classList.add('bg-white', 'dark:bg-neutral-900', 'px-6', 'pt-5', 'pb-4', 'sm:p-6', 'sm:pb-4')

  const contentWrapper = document.createElement('div')
  contentWrapper.classList.add('flex', 'flex-col', 'items-center', 'text-center')
  const svgIcon = document.createElement('svg')
  svgIcon.classList.add('w-16', 'h-8', 'text-red-500', 'dark:text-red-500')
  svgIcon.setAttribute('src', 'path_to_your_svg_file')
  svgIcon.setAttribute('alt', 'Your SVG Icon')

  // Texto del modal
  const textContainer = document.createElement('div')
  textContainer.classList.add('mt-3', 'text-center',)
  textContainer.setAttribute('id', 'textContainer')

  const modalTitle = document.createElement('span')
  modalTitle.classList.add('text-xl', 'font-semibold', 'text-neutral-900', 'dark:text-neutral-300' )
  modalTitle.id = 'modal-title'
  modalTitle.textContent = '¿Estás seguro de que deseas eliminar este color?'

  // Botones del modal
  const buttonContainer = document.createElement('div')
  buttonContainer.classList.add('bg-neutral-50', 'dark:bg-neutral-900', 'px-4', 'py-3', 'flex', 'flex-row', 'justify-center','sm:px-6')

  const buttonDeleteModal = document.createElement('button')
  buttonDeleteModal.classList.add('modal-buttonDeleteModal','mt-2', 'text-white', 'bg-red-600', 'hover:bg-red-700', 'focus:ring-4', 'focus:outline-none', 'focus:ring-red-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'cursor-pointer', 'transition-colors', 'duration-300', 'ease-in-out')
  buttonDeleteModal.textContent = 'Eliminar'

  const buttonCancel = document.createElement('button')
  buttonCancel.classList.add('modal-buttonCancel','mt-2', 'text-neutral-900', 'hover:text-white', 'border', 'border-neutral-800', 'hover:bg-neutral-900', 'focus:ring-4', 'focus:outline-none', 'focus:ring-neutral-300', 'font-medium', 'rounded-lg', 'text-sm', 'px-5', 'py-2.5', 'text-center', 'me-2', 'mb-2', 'dark:border-neutral-600', 'dark:text-neutral-400', 'dark:hover:text-white', 'dark:hover:bg-neutral-600', 'dark:focus:ring-neutral-800', 'cursor-pointer', 'transition-colors', 'duration-300', 'ease-in-out')
  buttonCancel.textContent = 'Cancelar'

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
          inputEditCode = inputEditCode.toUpperCase()
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
  card.classList.add('flex', 'flex-col', 'border', 'border-neutral-300', 'dark:border-neutral-800', 'items-center', 'gap-4', 'p-6', 'rounded-lg', 'shadow-lg', 'hover:shadow-2xl', 'bg-white', 'dark:bg-neutral-900', 'transition-colors', 'duration-300', 'ease-in-out')

  const colorBlock = document.createElement('div')
  colorBlock.classList.add('w-full', 'h-32', 'rounded-lg', 'transform', 'hover:scale-105', 'shadow-md', 'transition-transform', 'duration-300', 'ease-in-out')
  colorBlock.style.backgroundColor = colorObj.code

  const colorInfoContainer = document.createElement('div')
  colorInfoContainer.classList.add('flex', 'flex-col', 'gap-1', 'text-center')

  const colorNameElem = document.createElement('p')
  colorNameElem.classList.add('text-2xl', 'font-bold', 'text-neutral-800', 'dark:text-neutral-200', 'truncate', 'transition-colors', 'duration-300', 'ease-in-out')
  colorNameElem.textContent = colorObj.name

  const colorCodeElem = document.createElement('p')
  colorCodeElem.classList.add('text-lg', 'text-neutral-600', 'dark:text-neutral-400', 'italic', 'transition-colors', 'duration-300', 'ease-in-out')
  colorCodeElem.textContent = colorObj.code

  const buttonsContainer = document.createElement('div')
  buttonsContainer.classList.add('flex', 'flex-col', 'w-full', 'gap-2')

  const buttonCopy = document.createElement('button')
  buttonCopy.classList.add('buttonCopy', 'bg-white','text-neutral-500' ,'border-1', 'border', 'border-neutral-600','hover:bg-neutral-200', 'hover:text-neutral-800', 'focus:outline-none', 'font-medium', 'rounded-lg', 'text-lg', 'py-3', 'text-neutral-300', 'cursor-pointer', 'dark:bg-neutral-800', 'dark:text-white', 'dark:hover:bg-neutral-900', 'dark:hover:text-white', 'transition-colors', 'duration-300', 'ease-in-out')
  buttonCopy.setAttribute('data-color', colorObj.code)
  buttonCopy.textContent = 'Copiar'

  const buttonEdit = document.createElement('button')
  buttonEdit.classList.add('buttonEdit', 'bg-orange-500', 'hover:bg-orange-600', 'focus:outline-none', 'font-medium', 'rounded-lg', 'text-lg', 'py-3', 'text-white', 'cursor-pointer', 'transition-colors', 'duration-300', 'ease-in-out')
  buttonEdit.setAttribute('data-id', colorObj.id)
  buttonEdit.textContent = 'Editar'

  const buttonDelete = document.createElement('button')
  buttonDelete.classList.add('buttonDelete', 'bg-red-500', 'hover:bg-red-600', 'focus:outline-none', 'font-medium', 'rounded-lg', 'text-lg', 'py-3', 'text-white', 'cursor-pointer', 'transition-colors', 'duration-300', 'ease-in-out')
  buttonDelete.setAttribute('data-id', colorObj.id)
  buttonDelete.textContent = 'Eliminar'

  buttonsContainer.appendChild(buttonCopy)
  buttonsContainer.appendChild(buttonEdit)
  buttonsContainer.appendChild(buttonDelete)

  card.appendChild(colorBlock)
  colorInfoContainer.appendChild(colorNameElem)
  colorInfoContainer.appendChild(colorCodeElem)
  card.appendChild(colorInfoContainer)
  card.appendChild(buttonsContainer)

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

  // Validación REGEX antes de normalizar
  const hexRegex = /^#?([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/;
  const trimmedCode = code.trim();

  if (!hexRegex.test(trimmedCode)) {
    alert("Código HEX inválido. Por favor ingresa un valor como #FFF o #FFFFFF.");
    return;
  }

  if(!code.startsWith('#')){
    code = `#${code.toUpperCase()}`
  } else{
    code = `${code.toUpperCase()}`
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

