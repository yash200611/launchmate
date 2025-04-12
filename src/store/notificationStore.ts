import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  timestamp: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  notificationsEnabled: boolean;
  addNotification: (notification: Omit<Notification, 'id' | 'read' | 'timestamp'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  toggleNotifications: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set) => ({
      notifications: [
        {
          id: '1',
          title: 'New Collaborator',
          message: 'John Doe has joined your E-commerce Platform project',
          read: false,
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Project Update',
          message: 'Changes were made to Personal Finance App',
          read: false,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '3',
          title: 'Reminder',
          message: 'Complete your project setup',
          read: false,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
      ],
      unreadCount: 3,
      notificationsEnabled: true,
      addNotification: (notification) =>
        set((state) => ({
          notifications: [
            {
              ...notification,
              id: Math.random().toString(36).substr(2, 9),
              read: false,
              timestamp: new Date().toISOString(),
            },
            ...state.notifications,
          ],
          unreadCount: state.unreadCount + 1,
        })),
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: state.unreadCount - 1,
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),
      toggleNotifications: () =>
        set((state) => ({
          notificationsEnabled: !state.notificationsEnabled,
        })),
    }),
    {
      name: 'notification-storage',
    }
  )
);