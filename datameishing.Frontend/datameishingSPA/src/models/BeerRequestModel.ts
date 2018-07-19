export class BeerRequestModel {
    timestamp: Date;
    name: string;
    email: string;
    receipt: string;
    subscriptionEndpoint?: string;
    auth?: string;
    p256dh?: string;
}

