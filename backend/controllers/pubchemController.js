import axios from "axios";

export const searchSubstance = async (req, res) => {
  const { name } = req.params;
  if (!name) {
    return res.status(400).json({ message: "Le nom est requis." });
  }
  try {
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/name/${name}/JSON`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Substance non trouvée." });
  }
};

export const getSubstanceByCID = async (req, res) => {
  try {
    const { cid } = req.params;
    const url = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/cid/${cid}/JSON`;
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ message: "Substance non trouvée." });
  }
}; 