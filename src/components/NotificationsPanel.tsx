import React from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { useThemeStore, getThemeClasses } from '../store/themeStore';
import { Check, X } from 'lucide-react';

interface NotificationsPanelProps {
  onClose: () => void;
}

export default function NotificationsPanel({ onClose }: NotificationsPanelProps) {
  const { notifications, markAsRead, markAllAsRead } = useNotificationStore();
  const { theme } = useThemeStore();
  const themeClasses = getThemeClasses(theme);

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className={`absolute right-0 mt-2 w-96 ${themeClasses.card} rounded-lg shadow-lg border ${themeClasses.border} z-50`}>
      <div className={`p-4 border-b ${themeClasses.border} flex justify-between items-center`}>
        <h3 className={`text-lg font-semibold ${themeClasses.text}`}>Notifications</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={markAllAsRead}
            className={`text-sm ${themeClasses.accent} hover:opacity-80`}
          >
            Mark all as read
          </button>
          <button onClick={onClose} className={`${themeClasses.subtext} hover:opacity-80`}>
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b ${themeClasses.border} ${themeClasses.hover} ${
              !notification.read ? `${themeClasses.accent} bg-opacity-10` : ''
            }`}
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h4 className={`text-sm font-medium ${themeClasses.text}`}>
                  {notification.title}
                </h4>
                <p className={`text-sm ${themeClasses.subtext} mt-1`}>{notification.message}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {formatTimestamp(notification.timestamp)}
                </p>
              </div>
              {!notification.read && (
                <button
                  onClick={() => markAsRead(notification.id)}
                  className={`${themeClasses.accent} hover:opacity-80`}
                >
                  <Check className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}