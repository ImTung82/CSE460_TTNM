import Sidebar from '../../admin/orders/Sidebar';
import Navbar from '../../admin/orders/Navbar';
const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 bg-white flex flex-col">
        <Navbar />
        <section className="p-6 text-sm">{children}</section>
      </main>
    </div>
  );
};

export default AdminLayout;
