import AdminHeader from "../admin/AdminHeader";
import AdminSidebar from "../admin/AdminSidebar";
import Message from "../admin/Message";

const MessagePage = () => {
  return (
    <div className="admin-dashboard">
      <AdminHeader />
      <div className="dashboard-content">
        <AdminSidebar />
        <div className="main-content">
          <Message />
        </div>
      </div>
    </div>
  );
};

export default MessagePage;
