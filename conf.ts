// Config of the deployment

export const resources = {
    requests: {
        memory: "200Mi",
        cpu: "75m"
    },
    limits: {
        memory: "400Mi",
        cpu: "200m"
    }
}

export const probes = {
    readiness: {
        httpGet: {
            path: '/',
            port: 80
        },
        initialDelaySeconds: 10,
        periodSeconds: 10
    },
    liveness: {
        httpGet: {
            path: '/',
            port: 80
        },
        initialDelaySeconds: 20,
        periodSeconds: 20
    }
}
