interface UmamiTracker {
    track(event: string, data?: Record<string, unknown>): void;
    track(callback: (props: { website: string }) => object): void;
    identify(id: string, properties?: Record<string, unknown>): void;
    identify(properties: Record<string, unknown>): void;
}

declare global {
    interface Window {
        umami?: UmamiTracker;
    }
}

export {};
