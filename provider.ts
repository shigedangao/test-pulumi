const PROVIDER = {
    dev: "dev",
    prod: "prod"
};

/**
 * Get Provider
 *      Return the provider from the env
 * 
 * @param {string} env 
 * @reurn {string}
 */
export const get_provider = (env: string) => {
    let entries = Object.entries(PROVIDER).filter(item => item[0] == env);
    if (entries.length == 0) {
        return PROVIDER.dev;
    }

    return entries[0][1];
};