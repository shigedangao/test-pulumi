import * as k8s from "@pulumi/kubernetes";
import * as kx from "@pulumi/kubernetesx"
import * as pulumi from '@pulumi/pulumi';
import * as provider from './provider';
import * as env from './env';
import * as cnf from './conf';

// Example of deploying a project like pardillo
const ENV: string = pulumi.getStack();
const APP_NAME = "pardillo";
const IMAGE_VERSION = "v1.0.0"

const appLabels = {
    app: APP_NAME,
    env: ENV
};

const envs = env.getEnvFromStack(ENV);

const resources = k8s.types.input

const deployment = new k8s.apps.v1.Deployment(`${APP_NAME}-${ENV}`, {
    spec: {
        selector: { matchLabels: appLabels },
        replicas: 2,
        template: {
            metadata: { labels: appLabels },
            spec: { containers: [{
                    name: `${APP_NAME}-${ENV}`,
                    image: `${provider.get_provider(ENV)}lol:${IMAGE_VERSION}`,
                    envFrom: [
                        { configMapRef: { name: envs.pardillo.metadata.name } },
                        { configMapRef: { name: envs.weebly.metadata.name } },
                        { configMapRef: { name: envs.halcon.metadata.name } },
                        { configMapRef: { name: envs.misc.metadata.name } }
                    ],
                    volumeMounts: [{
                        name: 'elastic-cert',
                        mountPath: '/etc/ssl/certs/elastic-certificate.pem',
                        subPath: 'elastic-certificate.pem',
                        readOnly: true
                    }],
                    resources: {
                        requests: cnf.resources.requests,
                        limits: cnf.resources.limits
                    },
                    readinessProbe: cnf.probes.readiness,
                    livenessProbe: cnf.probes.liveness,
                    ports: [{
                        containerPort: 80
                    }]
                }],
                volumes: [{
                    name: 'elastic-cert',
                    secret: {
                        secretName: 'elastic-certificate-pem'
                    }
                }],
                serviceAccountName: 'pardillo-proxy',
                automountServiceAccountToken: false
            }
        }
    }
});

export const name = deployment.metadata.name;