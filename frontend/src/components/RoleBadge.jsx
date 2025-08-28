const RoleBadge = ({ role, size = "sm" }) => {
  const getRoleConfig = (role) => {
    switch (role) {
      case "Admin":
        return {
          icon: "👑",
          text: "Administrateur",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-800",
          borderColor: "border-yellow-200"
        }
      case "Professeur":
        return {
          icon: "👨‍🏫",
          text: "Professeur",
          bgColor: "bg-purple-100",
          textColor: "text-purple-800",
          borderColor: "border-purple-200"
        }
      default:
        return {
          icon: "👨‍🎓",
          text: "Étudiant",
          bgColor: "bg-blue-100",
          textColor: "text-blue-800",
          borderColor: "border-blue-200"
        }
    }
  }

  const config = getRoleConfig(role)
  const sizeClasses = size === "lg" ? "px-3 py-2 text-base" : "px-2 py-1 text-sm"

  return (
    <span className={`inline-flex items-center space-x-1 rounded-full border ${config.bgColor} ${config.textColor} ${config.borderColor} ${sizeClasses}`}>
      <span>{config.icon}</span>
      <span className="font-medium">{config.text}</span>
    </span>
  )
}

export default RoleBadge
