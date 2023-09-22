import Navbar from "@/components/Navbar";
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = (props = LayoutProps) => {
  const { children } = props;
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;
