export const messageConsumersConfig: Record<string, string> = {
    gusteauConnectingRequest: process.env.MESSAGE_CONSUMER_TOPIC_GUSTEAU_CONNECTING_REQUEST ?? "gusteau.connecting-request",
};

export default messageConsumersConfig;



