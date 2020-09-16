import * as k8s from "@pulumi/kubernetes";
import * as base from "../base";


const prepare_pardillo_env = () => {
    return new k8s.core.v1.ConfigMap('pardillo-pardillo-env', {
        data: {
            ...base.PARDILLO_BASE_ENV,
            PARDILLO_DOMAIN: 'www.name.org.org'
        }
    })
}

const prepare_weebly_env = () => {
    return new k8s.core.v1.ConfigMap('pardillo-weebly-env', {
        data: {
            ...base.WEEBLY_BASE_ENV
        }
    })
};

const prepare_halcon_env = () => {
    return new k8s.core.v1.ConfigMap('pardillo-halcon-env', {
        data: {
            ...base.HALCON_BASE_ENV
        }
    })
};

const prepare_misc_env = () => {
    return new k8s.core.v1.ConfigMap('pardillo-misc-env', {
        data: {
            ...base.MISC_BASE_ENV,
            WORKLOAD_TAG: 'dev',
            NODE_ENV: 'preproduction'
        }
    })
}

export const build_configmaps = () => {
    return {
        pardillo: prepare_pardillo_env(),
        weebly: prepare_weebly_env(),
        halcon: prepare_halcon_env(),
        misc: prepare_misc_env()
    }
}