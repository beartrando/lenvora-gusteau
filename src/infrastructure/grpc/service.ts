import * as grpc from "@grpc/grpc-js";
import * as healthProto from '../../contracts/proto/common/health';
import logger from "@shared/logger";
import HealthHandler from "./handlers/health.handler";
import GusteauHandler from "./handlers/gusteau.handler";

export class GrpcService {
    private readonly server: grpc.Server;

    constructor(
        private readonly port: number,
        private readonly healthHandler: HealthHandler,
        private readonly gusteauHandler: GusteauHandler,
    ) {
        this.server = new grpc.Server();
    }

    async start(): Promise<void> {
        return new Promise<void>(
            (resolve, reject) => {
                this.addServices();
                this.server.bindAsync(
                    `0.0.0.0:${this.port}`,
                    grpc.ServerCredentials.createInsecure(),
                    (err, port) => {
                        if (err) {
                            logger.error(
                                {err},
                                '❌ Failed to start gRPC',
                            );

                            return reject(err);
                        }

                        logger.info(
                            `🟢 gRPC server started on port ${port}`,
                        );
                        resolve();
                    },
                );
            },
        );
    }

    stop() {
        this.server.forceShutdown();
    }

    private registerGusteauService() {
        this.server.addService(healthProto.HealthService, {
            CreateProduct: this.gusteauHandler.createProduct.bind(this.gusteauHandler),
            GetProduct: this.gusteauHandler.getProduct.bind(this.gusteauHandler),
            GetNutritionCoefficients: this.gusteauHandler.getNutritionCoefficients.bind(this.gusteauHandler),
            UpdateNutritionCoefficients: this.gusteauHandler.updateNutritionCoefficients.bind(this.gusteauHandler),
            CreateFoodLog: this.gusteauHandler.createFoodLog.bind(this.gusteauHandler),
            GetFoodLogs: this.gusteauHandler.getFoodLogs.bind(this.gusteauHandler),
        });
    }
    private registerHealthService() {
        this.server.addService(healthProto.HealthService, {
            check: this.healthHandler.check.bind(this.healthHandler),
            status: this.healthHandler.status.bind(this.healthHandler),
            livez: this.healthHandler.livez.bind(this.healthHandler),
            readyz: this.healthHandler.readyz.bind(this.healthHandler),
        });
    }

    private addServices() {
        this.registerGusteauService();
        this.registerHealthService();
    }
}

export default GrpcService;

