import { BaseHttpService } from './base-http-service'

interface Service extends BaseHttpService {}

const servicesMap: Map<string, Service> = new Map<string, Service>()

export const getService = <T extends Service>(srvc: string): T => {
    if (!servicesMap.has(srvc)) {
        throw new Error(`No service in repository with name: ${srvc}, check initialization pipeline`)
    }
    return servicesMap.get(srvc) as T
}

export function setServerUrl(serverUrl: string): void {
    servicesMap.forEach(serv => {
        serv.setServerUrl(serverUrl)
    })
}

/**
 * Helper decorator that sets static methods to class to make it singleton
 */
export function service(ServiceClassRef) {
    servicesMap.set(ServiceClassRef.serviceName, new ServiceClassRef())

    return ServiceClassRef
}
