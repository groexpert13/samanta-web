import { hapticFeedback, openTelegramLink, closeMiniApp } from '@telegram-apps/sdk-react';

/**
 * TelegramService handles interactions with the Telegram Mini App SDK.
 * It provides methods for haptic feedback, closing the app, and communication with the bot.
 */
export const TelegramService = {
    /**
     * Triggers a haptic feedback impact.
     * @param style 'light', 'medium', 'heavy', 'rigid', or 'soft'
     */
    impact: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' = 'light') => {
        try {
            if (hapticFeedback.impactOccurred.isAvailable()) {
                hapticFeedback.impactOccurred(style);
            }
        } catch (e) {
            console.warn('Haptics failed', e);
        }
    },

    /**
     * Triggers a haptic feedback notification.
     * @param type 'error', 'success', or 'warning'
     */
    notification: (type: 'error' | 'success' | 'warning') => {
        try {
            if (hapticFeedback.notificationOccurred.isAvailable()) {
                hapticFeedback.notificationOccurred(type);
            }
        } catch (e) {
            console.warn('Haptics failed', e);
        }
    },

    /**
     * Closes the Mini App.
     */
    close: () => {
        try {
            closeMiniApp();
        } catch (e) {
            console.warn('Close failed', e);
        }
    },

    /**
     * Sends a command to the bot via a deep link and closes the app.
     * This is a reliable way to "notify" the bot of an action.
     * @param command The command to send (e.g., 'refresh', 'help')
     */
    sendCommandToBot: (command: string) => {
        try {
            TelegramService.impact('medium');
            // Replace with your bot's username or use a generic start link
            // For this project, we assume the bot username is known or can be extracted.
            // A common pattern is https://t.me/BotUsername?start=command
            // We will use openTelegramLink to trigger the bot.

            // In a real app, you'd fetch the bot username from config.
            // For now, we use a generic placeholder or assume the user knows.
            // But more robustly, we use the direct link if possible.
            const botUsername = 'samantAIbot'; // Replace with actual if known
            openTelegramLink(`https://t.me/${botUsername}?start=${command}`);

            // Close the app so the user sees the bot message
            setTimeout(() => {
                TelegramService.close();
            }, 500);
        } catch (e) {
            console.warn('Send command failed', e);
        }
    }
};
