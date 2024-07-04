
import { recupData } from "./data.js"

const search = document.getElementById("search")
const form = document.getElementById('form')
const tbody = document.querySelector('.tbody')
const loader = document.querySelector('.loader')

form.addEventListener('submit', (e) => {
     e.preventDefault()
})


/**
 * Affiche les données récupérées via fetch dans le tableau
 * @param {Array} data 
 * @param {HTMLElement} data 
 */
function populateTable (data, container)
{
     data.forEach((element, index) => {
          const tr = document.createElement('tr')
          const nom = createTd(`${element.nom}`, {'class' : 'fw-bold'})
          const prenom = createTd(`${element.prenom}`)
          const age = createTd(`${element.age}`)
          const poste = createTd(`${element.poste}`, {'class' : 'fw-bolder'})
          tr.appendChild(nom)
          tr.appendChild(prenom)
          tr.appendChild(age)
          tr.appendChild(poste)
          container.appendChild(tr)
     })
}


search.addEventListener('input', async () => {
     const data = await recupData(loader)
     let timeOut;
     clearTimeout(timeOut)
     timeOut = setTimeout(async () => {
          tbody.innerHTML = ''
          if (search.value !== "") {
               const value = search.value
               if (Array.isArray(data)) {
                    append(data, value, tbody)
               }   
          }
          else {
               populateTable(data, tbody)
          }
     }, 100)
})


/**
 * Filtre les données en fonction de la requête de recherche et met à jour le tableau
 * @param {Array} data 
 * @param {string} valeur 
 * @param {HTMLElement} container 
 */
function append (data, valeur, container) 
{
     let filterData = []
     filterData = data.filter(element => element.nom.toLowerCase().includes(valeur.toLowerCase()) || element.prenom.toLowerCase().includes(valeur.toLowerCase()))
     if (filterData.length > 0) {
          populateTable(filterData, container) 
     }
     else {
          const tr = document.createElement('tr')
          const td = createTd('Pas de correspondance', {'colspan' : 10})
          tr.appendChild(td)
          container.appendChild(tr)
     }
}

/**
 * Création des td dans le tbody
 * @param {string} valeur 
 * @param {Object} options 
 * @returns HTMLElement
 */
function createTd (valeur, options = {})
{
     const node = document.createElement('td')
     node.innerHTML = valeur
     if (options.hasOwnProperty('class')) {
          node.classList.add(options.class)
     }
     return node
}

/**
 * Affichage initiale des données recupérées dans le tableau
 */
(async function appendData ()
{
     const data = await recupData(loader)
     if (Array.isArray(data)) {
          populateTable(data, tbody)
     }
})()