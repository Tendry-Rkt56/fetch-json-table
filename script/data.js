
export async function recupData (loader)
{
     try {
          await new Promise(resolve => setTimeout(resolve, 500))
          const response = await fetch('../objects/fichier.json')
          if (response.ok) {
               const result = await response.json()
               return result
          }
          else {
               throw new Error ('Erreur lors de la récupértion des données')
          }
     }
     catch (error) {
          console.log(error)
     }
     finally {
          loader.style.display = 'none'
     }
}

