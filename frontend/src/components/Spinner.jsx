const Spinner = ({ size = "md", color = "emerald" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  }

  const colorClasses = {
    emerald: "border-emerald-600",
    purple: "border-purple-600",
    orange: "border-orange-600",
    white: "border-white",
  }

  return (
    <div className="flex items-center justify-center">
      <div
        className={`${sizeClasses[size]} ${colorClasses[color]} border-4 border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Chargement"
      >
        <span className="sr-only">Chargement...</span>
      </div>
    </div>
  )
}

// Composant Spinner pleine page
export const FullPageSpinner = ({ message = "Chargement..." }) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
      <div className="text-center">
        <Spinner size="xl" color="emerald" />
        <p className="mt-4 text-gray-600 text-lg">{message}</p>
      </div>
    </div>
  )
}

// Composant Spinner pour les boutons
export const ButtonSpinner = () => {
  return <Spinner size="sm" color="white" />
}

export default Spinner
