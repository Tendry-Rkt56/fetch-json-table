
export async function recupData ()
{
     const response = await fetch('../objects/fichier.json')
     if (response.ok) {
          const result = await response.json()
          return result
     }
     else {
          return null
     }
}

