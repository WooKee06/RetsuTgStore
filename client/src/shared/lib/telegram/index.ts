import {
  init as sdkInit,
  backButton,
  mainButton,
  themeParams,
  miniApp,
  initData,
  on,
  type User,
} from '@telegram-apps/sdk-react';

let initialized = false;

export function initTelegram(): void {
  if (initialized) return;
  try {
    sdkInit();
    backButton.mount();
    mainButton.mount();
    themeParams.mount();
    miniApp.mount();
    miniApp.ready();
    initialized = true;
  } catch {
    console.warn('Telegram SDK not available');
  }
}

export function useTelegramTheme() {
  let isDark = true;

  try {
    isDark = themeParams.isDark();
  } catch {
    // default dark
  }

  return { isDark };
}

export function useTelegramBackButton(visible: boolean, handler?: () => void) {
  if (visible) {
    backButton.show();
    if (handler) {
      on('back_button_pressed', handler);
    }
  } else {
    backButton.hide();
  }
}

export function useMainButton(text: string, handler: () => void, visible = false) {
  if (visible) {
    mainButton.setParams({
      text,
      isVisible: true,
    });
    on('main_button_pressed', handler);
  } else {
    mainButton.setParams({ isVisible: false });
  }
}

export function getTelegramUser(): { id: string; name: string; avatar?: string } | null {
  try {
    const user = initData.user() as User | undefined;
    if (user) {
      return {
        id: String(user.id),
        name: [user.first_name, user.last_name].filter(Boolean).join(' '),
        avatar: user.photo_url,
      };
    }
  } catch {
    // not in Telegram
  }
  return null;
}

export function hapticFeedback(type: 'impact' | 'notification' | 'selection' = 'impact') {
  try {
    import('@telegram-apps/sdk-react').then((sdk) => {
      switch (type) {
        case 'impact':
          sdk.hapticFeedbackImpactOccurred('medium');
          break;
        case 'notification':
          sdk.hapticFeedbackNotificationOccurred('success');
          break;
        case 'selection':
          sdk.hapticFeedbackSelectionChanged();
          break;
      }
    }).catch(() => {
      // not available
    });
  } catch {
    // not available
  }
}

export function isTelegramMiniApp(): boolean {
  try {
    return !!window.Telegram?.WebApp;
  } catch {
    return false;
  }
}

declare global {
  interface Window {
    Telegram?: {
      WebApp?: unknown;
    };
  }
}
