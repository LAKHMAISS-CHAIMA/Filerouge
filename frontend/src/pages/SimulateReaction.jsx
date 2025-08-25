import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const SimulerReaction = () => {
  const [reactif1, setReactif1] = useState("");
  const [reactif2, setReactif2] = useState("");
  const [resultat, setResultat] = useState(null);

  const handleSimuler = (e) => {
    e.preventDefault();

    if (!reactif1 || !reactif2) {
      toast.error("⚠️ Merci de remplir les deux réactifs");
      return;
    }

    const reaction = `${reactif1} + ${reactif2} → Nouveau composé`;

    setResultat(reaction);
    toast.success("✅ Réaction simulée avec succès !");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-emerald-50 flex items-center justify-center px-4">
      <Toaster position="top-right" />

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-lg">
        <h1 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          ⚗️ Simuler une Réaction
        </h1>

        <form onSubmit={handleSimuler} className="space-y-4">
          <input
            type="text"
            placeholder="Premier réactif"
            value={reactif1}
            onChange={(e) => setReactif1(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
          />
          <input
            type="text"
            placeholder="Deuxième réactif"
            value={reactif2}
            onChange={(e) => setReactif2(e.target.value)}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500"
          />

          <button
            type="submit"
            className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg hover:bg-emerald-700 transition"
          >
            Lancer la simulation
          </button>
        </form>

        {resultat && (
          <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
            <h2 className="text-xl font-semibold text-emerald-700 mb-2">
              Résultat :
            </h2>
            <p className="text-slate-700">{resultat}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SimulerReaction;
