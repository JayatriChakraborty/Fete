
import { Link } from 'react-router-dom';

type HeaderProps = {
  location: string | null;
};

const Header = ({ location }: HeaderProps) => (
  <header className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold text-white">Hello, James!</h1>
      <p className="text-sm text-muted-foreground">{location || "Add Your Location"}</p>
    </div>
    <Link to="/profile" className="w-12 h-12 rounded-full bg-card overflow-hidden hover:ring-2 hover:ring-brand-purple transition-shadow">
      <img src="https://i.pravatar.cc/150?u=james" alt="User avatar" className="w-full h-full object-cover" />
    </Link>
  </header>
);

export default Header;
