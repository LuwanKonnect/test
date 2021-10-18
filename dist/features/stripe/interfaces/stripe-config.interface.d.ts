export interface StripeConfigInterface {
    publishableKey: string;
    secretKey: string;
    currency: string;
    monthlySubscriptionPriceID: string;
    webhookSecret: string;
}
