import axios from "axios"

const PUBCHEM_BASE_URL = "https://pubchem.ncbi.nlm.nih.gov/rest/pug"

// Service pour interagir avec l'API PubChem
export const pubchemService = {
  // Rechercher des substances par nom
  searchByName: async (name, limit = 10) => {
    try {
      const response = await axios.get(
        `${PUBCHEM_BASE_URL}/compound/name/${encodeURIComponent(name)}/property/MolecularFormula,MolecularWeight,IUPACName/JSON`
      )
      
      const compounds = response.data.PropertyTable.Properties
      return compounds.slice(0, limit).map(compound => ({
        cid: compound.CID,
        name: compound.IUPACName || name,
        formula: compound.MolecularFormula,
        molar_mass: parseFloat(compound.MolecularWeight),
        source: 'pubchem'
      }))
    } catch (error) {
      console.error("Erreur lors de la recherche PubChem:", error)
      return []
    }
  },

  // Obtenir les détails d'un composé par CID
  getCompoundDetails: async (cid) => {
    try {
      const [propertiesResponse, synonymsResponse] = await Promise.all([
        axios.get(`${PUBCHEM_BASE_URL}/compound/cid/${cid}/property/MolecularFormula,MolecularWeight,IUPACName,CanonicalSMILES/JSON`),
        axios.get(`${PUBCHEM_BASE_URL}/compound/cid/${cid}/synonyms/JSON`)
      ])

      const properties = propertiesResponse.data.PropertyTable.Properties[0]
      const synonyms = synonymsResponse.data.InformationList.Information[0].Synonym || []

      return {
        cid: properties.CID,
        name: properties.IUPACName || synonyms[0] || `Compound ${cid}`,
        formula: properties.MolecularFormula,
        molar_mass: parseFloat(properties.MolecularWeight),
        smiles: properties.CanonicalSMILES,
        synonyms: synonyms.slice(0, 5), // Limiter à 5 synonymes
        source: 'pubchem'
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des détails:", error)
      return null
    }
  },

  // Recherche rapide avec autocomplétion
  quickSearch: async (query) => {
    if (!query || query.length < 2) return []
    
    try {
      const response = await axios.get(
        `${PUBCHEM_BASE_URL}/compound/name/${encodeURIComponent(query)}/cids/JSON?name_type=word`
      )
      
      const cids = response.data.IdentifierList.CID.slice(0, 5)
      const compounds = await Promise.all(
        cids.map(cid => pubchemService.getCompoundDetails(cid))
      )
      
      return compounds.filter(compound => compound !== null)
    } catch (error) {
      console.error("Erreur lors de la recherche rapide:", error)
      return []
    }
  }
}

export default pubchemService
