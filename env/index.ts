import * as dev from './stack/dev';
import * as prod from './stack/prod';

/**
 * Get Env From Stack
 * 
 * @param {string} stack
 * @return {Object}
 */
export const getEnvFromStack = (stack: string) => {
    if (stack === 'prod') {
        return prod.build_configmaps();
    }

    return dev.build_configmaps();
};