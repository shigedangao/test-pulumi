import * as k8s from "@pulumi/kubernetes";
import * as pulumi from "@pulumi/pulumi";

const config = new pulumi.Config();

const prepare_pardillo_secret = () => {

    return new k8s.core.v1.Secret('pardillo-secret', {
        stringData: {
            dbPwd: config.requireSecret('db_password'),
            dbHost: config.requireSecret('db_host')
        },
    })
}

export const getSecret = () => prepare_pardillo_secret()