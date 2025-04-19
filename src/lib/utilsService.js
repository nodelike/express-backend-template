import prisma from "./prisma.js";
import logger from "./logger.js";

/**
 * Get a setting from the Utils collection
 * @param {string} name - Setting name
 * @param {any} defaultValue - Default value if setting doesn't exist
 * @returns {Promise<any>} Setting value
 */
export const getSetting = async (name, defaultValue = null) => {
    try {
        const setting = await prisma.utils.findUnique({
            where: { name },
        });

        if (!setting) {
            return defaultValue;
        }

        return setting.data;
    } catch (error) {
        logger.error(`Error getting setting ${name}:`, error);
        return defaultValue;
    }
};

/**
 * Update or create a setting in the Utils collection
 * @param {string} name - Setting name
 * @param {any} data - Setting data
 * @returns {Promise<boolean>} Success status
 */
export const updateSetting = async (name, data) => {
    try {
        await prisma.utils.upsert({
            where: { name },
            update: { data },
            create: { name, data },
        });
        
        return true;
    } catch (error) {
        logger.error(`Error updating setting ${name}:`, error);
        return false;
    }
};

/**
 * Check if signups are enabled
 * @returns {Promise<boolean>} Whether signups are enabled
 */
export const isSignupEnabled = async () => {
    const signupSetting = await getSetting("is-signup-enabled", { enabled: false });
    return signupSetting.enabled === true;
};

export default {
    getSetting,
    updateSetting,
    isSignupEnabled
}; 