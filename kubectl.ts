import * as k8sc from "@kubernetes/client-node";

const kc = new k8sc.KubeConfig();
kc.loadFromDefault();

const CLUSTERS_NAME = {
    staging: 'staging',
    prod: 'prod'
}

export const check_environment = (stack: string) => {
    let context = kc.getCurrentCluster();

    if (context?.name) {
        if (stack !== 'prod' && context.name.includes(CLUSTERS_NAME.staging)) {
            return true;
        }

        if (stack === 'prod' && context.name.includes(CLUSTERS_NAME.prod)) {
            return true;
        }
    }    

    return false;
}