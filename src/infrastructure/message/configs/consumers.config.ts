export const messageConsumersConfig: Record<string, string> = {
    remyConnectingRequest: process.env.MESSAGE_CONSUMER_TOPIC_REMY_CONNECTING_REQUEST ?? "remy.connecting-request",
};

export default messageConsumersConfig;



