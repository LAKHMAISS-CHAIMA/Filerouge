import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function SubstanceDetails() {
  const { cid } = useParams(); 
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/pubchem/cid/${cid}`)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setErreur("Erreur lors de la récupération.");
        setLoading(false);
      });
  }, [cid]);

  if (loading) return <p>Chargement...</p>;
  if (erreur) return <p>{erreur}</p>;

  const compound = data?.PC_Compounds?.[0];
  const name = compound?.props?.find((p) => p.urn?.label === "IUPAC Name")?.value?.sval;
  const formula = compound?.props?.find((p) => p.urn?.label === "Molecular Formula")?.value?.sval;
  const weight = compound?.props?.find((p) => p.urn?.label === "Molecular Weight")?.value?.fval;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Détails de la substance</h2>
      <p><strong>Nom IUPAC :</strong> {name || "Non disponible"}</p>
      <p><strong>Formule :</strong> {formula || "Non disponible"}</p>
      <p><strong>Poids moléculaire :</strong> {weight || "Non disponible"}</p>
    </div>
  );
}

export default SubstanceDetails; 