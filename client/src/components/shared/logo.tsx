import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1.5">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-primary font-bold text-primary-foreground">
            S
          </span>
      <span className="text-lg font-semibold tracking-tight">syncview</span>
    </Link>
  )
}

export default Logo