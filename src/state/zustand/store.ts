import { create } from "zustand";
import { devtools } from "zustand/middleware";

export interface NotificationType {
  type: "error" | "success";
  message: string;
}

export interface LocalState {
  localValues: {
    notifocation: NotificationType | null;
    hasNotification: boolean;
  };

  updateNotification: (notifocation: NotificationType) => void;
  clearNotification: () => void;
}

export const useNotificationStore = create<LocalState>()(
  devtools((set, get) => ({
    localValues: get()?.localValues ?? {
      notifocation: null,
      hasNotification: false,
    },

    updateNotification: (notifocation) => {
      set((state) => ({
        localValues: {
          ...state?.localValues,
          notifocation,
          hasNotification: true,
        },
      }));
      if (notifocation.type !== "error") {
        setTimeout(() => {
          set((state) => ({
            localValues: {
              ...state?.localValues,
              notifocation: null,
              hasNotification: false,
            },
          }));
        }, 2000);
      }
    },

    clearNotification: () => {
      set((state) => ({
        localValues: {
          ...state?.localValues,
          notifocation: null,
          hasNotification: false,
        },
      }));
    },
  }))
);
