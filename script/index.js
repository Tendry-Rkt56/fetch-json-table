import { recupData } from "./data.js"

const search = document.getElementById("search")
const select = document.getElementById("select")
const tbody = document.querySelector('.tbody')

function appendTo (data)
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
          tbody.appendChild(tr)
     })
}

function createTd (valeur, options = {})
{
     const node = document.createElement('td')
     node.innerHTML = valeur
     if (options.hasOwnProperty('class')) {
          node.classList.add(options.class)
     }
     return node
}

(async function appenData ()
{
     const data = await recupData()
     if (Array.isArray(data)) {
          appendTo(data)
     }
     else console.log("")
})()