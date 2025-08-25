const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-emerald-400 mb-4">ChemLab Sim</h3>
            <p className="text-slate-300">
              Plateforme de simulation d'expériences chimiques pour l'apprentissage et la recherche.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-violet-400 mb-4">Liens rapides</h4>
            <ul className="space-y-2">
              <li>
                <a href="/simulate" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Simuler
                </a>
              </li>
              <li>
                <a href="/library" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Bibliothèque
                </a>
              </li>
              <li>
                <a href="/history" className="text-slate-300 hover:text-emerald-400 transition-colors">
                  Historique
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-violet-400 mb-4">Contact</h4>
            <p className="text-slate-300">Email: contact@chemlabsim.com</p>
            <p className="text-slate-300">Tél: +33 1 23 45 67 89</p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">&copy; 2024 ChemLab Sim. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
