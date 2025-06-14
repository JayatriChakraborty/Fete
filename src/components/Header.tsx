
type HeaderProps = {
  location: string | null;
};

const Header = ({ location }: HeaderProps) => (
  <header className="flex justify-between items-center">
    <div>
      <h1 className="text-2xl font-bold text-white">Hello, James!</h1>
      <p className="text-sm text-muted-foreground">{location || "Add Your Location"}</p>
    </div>
  </header>
);

export default Header;
