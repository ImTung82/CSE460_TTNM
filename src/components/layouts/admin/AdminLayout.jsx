import Sidebar from '../../admin/orders/Sidebar';
import Navbar from '../../admin/orders/Navbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 bg-white flex flex-col overflow-y-auto">
        <Navbar />
        <section className="p-6 text-sm flex-1 overflow-y-auto">{children}</section>
      </main>
    </div>
  );
};

export default AdminLayout;
