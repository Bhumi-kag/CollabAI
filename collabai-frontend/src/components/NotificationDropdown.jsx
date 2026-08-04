import { Trash2, CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

import {
  markAsRead,
  deleteNotification,
  markAllAsRead,
} from "../services/notificationService";

export default function NotificationDropdown({
  notifications,
  setNotifications,
  onRefresh,
}) {

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read: true } : n
        )
      );

      onRefresh();

      toast.success("Notification marked as read.");

    } catch (error) {
      console.error(error);
      toast.error("Failed to update notification.");
    }
  };

  const handleDelete = async (id) => {
    try {

      await deleteNotification(id);

      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );

      onRefresh();

      toast.success("Notification deleted.");

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete notification.");
    }
  };

  const handleReadAll = async () => {
    try {

      await markAllAsRead();

      setNotifications((prev) =>
        prev.map((n) => ({
          ...n,
          read: true,
        }))
      );

      onRefresh();

      toast.success("All notifications marked as read.");

    } catch (error) {
      console.error(error);
      toast.error("Failed.");
    }
  };

  return (
    <div className="absolute right-0 mt-4 w-[420px] bg-white rounded-2xl shadow-2xl border z-50">

      <div className="flex justify-between items-center p-5 border-b">

        <h2 className="font-bold text-lg">
          Notifications
        </h2>

        <button
          onClick={handleReadAll}
          className="text-cyan-600 text-sm hover:underline"
        >
          Mark all read
        </button>

      </div>

      <div className="max-h-[450px] overflow-y-auto">

        {notifications.length === 0 ? (

          <div className="p-10 text-center text-gray-500">
            No notifications
          </div>

        ) : (

          notifications.map((notification) => (

            <div
              key={notification.id}
              className={`border-b p-4 hover:bg-gray-50 transition ${
                !notification.read
                  ? "bg-cyan-50"
                  : ""
              }`}
            >

              <p className="text-sm">
                {notification.message}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {notification.createdAt}
              </p>

              <div className="flex gap-4 mt-3">

                {!notification.read && (

                  <button
                    onClick={() =>
                      handleMarkRead(notification.id)
                    }
                    className="flex items-center gap-1 text-green-600 text-sm"
                  >
                    <CheckCircle size={16} />
                    Read
                  </button>

                )}

                <button
                  onClick={() =>
                    handleDelete(notification.id)
                  }
                  className="flex items-center gap-1 text-red-600 text-sm"
                >
                  <Trash2 size={16} />
                  Delete
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}