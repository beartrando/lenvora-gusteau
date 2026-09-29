export const messageConsumersConfig: Record<string, string> = {
    jarvisConnectingRequest: process.env.MESSAGE_CONSUMER_TOPIC_AI_CONNECTING_REQUEST ?? "jarvis.connecting-request",
};

export default messageConsumersConfig;



