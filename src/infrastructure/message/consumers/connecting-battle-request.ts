import * as streamingProto from "../../../contracts/proto/streaming";
import UseCaseInterface from "../interfaces/use-case.interface";
import BattleId from "../../../domain/battle/value-objects/battle-id.vo";
import ConnectToBattleUseCase from "../../../application/use-cases/battle/connect-to-battle";
import logger from "@shared/logger";


export class ConnectingBattleRequestConsumer implements UseCaseInterface<streamingProto.BattleJoinGusteau> {
    constructor(
        private readonly connectToBattleUseCase: ConnectToBattleUseCase,
    ) {
    }

    async execute(topic: string, partition: number, message: streamingProto.BattleJoinGusteau): Promise<void> {
        try {
            logger.log('message received', message);
            this.connectToBattleUseCase.execute(new BattleId(message.battleId));
        } catch (error) {
            logger.error(`[Kafka] Failed to process message`, {
                rawValue: message.battleId,
                error,
            });
        }
    }

}

export default ConnectingBattleRequestConsumer;


