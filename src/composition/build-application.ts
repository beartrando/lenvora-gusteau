import Application from "../application/application";

import GrpcService from "../infrastructure/grpc/service";

import AuthService from "../infrastructure/auth/service";
import authConfig from "../infrastructure/auth/auth.config";
import JobService from "../infrastructure/job/service";
import jobConfig from "../infrastructure/job/configs/job.config";
import messageConfig from "../infrastructure/message/configs/message.config";
import messageProducersConfig from "../infrastructure/message/configs/producers.config";
import grpcConfig from "../infrastructure/grpc/configs/grpc.config";
import HealthUseCase from "../application/use-cases/health/health";
import websocketClientConfig from "../infrastructure/websocket/configs/websocket-client.config";
import MessageService from "../infrastructure/message/service";
import WebsocketClientService from "../infrastructure/websocket/client.service";
import StatusUseCase from "../application/use-cases/health/status";
import LivezUseCase from "../application/use-cases/health/livez";
import ReadyzUseCase from "../application/use-cases/health/readyz";
import HealthHandler from "../infrastructure/grpc/handlers/health.handler";
import messageConsumersConfig from "../infrastructure/message/configs/consumers.config";
import jobConsumersConfig from "../infrastructure/job/configs/job.consumers.config";
import SendToStreamConsumer from "../infrastructure/job/consumers/send-to-stream.consumer";
import HttpClient from "../infrastructure/http/client";
import httpClientConfig from "../infrastructure/http/configs/http.client.config";
import WebsocketClient from "../infrastructure/websocket/websocket.client";
import ProfileService from "../infrastructure/profile/service";
import BattleHandler from "../infrastructure/websocket/handlers/battle.handler";
import BattleUpdatedUseCase from "../application/use-cases/battle/battle-updated";
import AnonymousSignInUseCase from "../application/use-cases/auth/anonimous-sign-in";
import DeviceDeviceId from "../domain/device/value-objects/device-device-id.vo";
import domainBattleConfig from "../domain/device/config/config";
import FetchProfileUseCase from "../application/use-cases/profile/fetch-profile";
import ConnectToBattleUseCase from "../application/use-cases/battle/connect-to-battle";
import ConnectingBattleRequestConsumer from "../infrastructure/message/consumers/connecting-battle-request";
import RefreshTokensUseCase from "../application/use-cases/auth/refresh-tokens";
import PrismaProductRepository from "../infrastructure/db/repositories/prisma-product.repository";
import PrismaNutritionCoefficientsRepository
    from "../infrastructure/db/repositories/prisma-nutrition-coefficient.repository";
import PrismaFoodLogRepository from "../infrastructure/db/repositories/prisma-food-log.repository";
import CreateProductUseCase from "../application/use-cases/product/create-product";
import GetProductUseCase from "../application/use-cases/product/get-product";
import GetNutritionCoefficientsUseCase
    from "../application/use-cases/nutrition-coefficients/get-nutrition-coefficients";
import UpdateNutritionCoefficientsUseCase
    from "../application/use-cases/nutrition-coefficients/update-nutrition-coefficients";
import CreateFoodLogUseCase from "../application/use-cases/food-log/create-food-log";
import GetFoodLogsUseCase from "../application/use-cases/food-log/get-food-logs";


function buildApplication() {

    const productRepository = new PrismaProductRepository();
    const nutritionCoefficientsRepository = new PrismaNutritionCoefficientsRepository();
    const foodLogRepository = new PrismaFoodLogRepository();

    const createProductUseCase = new CreateProductUseCase(
        productRepository,
    );

    const getProductUseCase = new GetProductUseCase(
        productRepository,
    );

    const getNutritionCoefficientsUseCase =
        new GetNutritionCoefficientsUseCase(
            nutritionCoefficientsRepository,
        );

    const updateNutritionCoefficientsUseCase =
        new UpdateNutritionCoefficientsUseCase(
            nutritionCoefficientsRepository,
        );

    const createFoodLogUseCase = new CreateFoodLogUseCase(
        foodLogRepository,
    );

    const getFoodLogsUseCase = new GetFoodLogsUseCase(
        foodLogRepository,
    );











    const jobService = new JobService(
        jobConfig,
        messageConfig,
        messageProducersConfig,
    );

    const messageService = new MessageService(
        messageConfig,
        messageConsumersConfig,
    );

    const healthUseCase = new HealthUseCase(
        authService,
        jobService,
        messageService,
        websocketClientService,
    );

    const statusUseCase = new StatusUseCase();
    const livezUseCase = new LivezUseCase();
    const readyzUseCase = new ReadyzUseCase();

    const healthHandler = new HealthHandler(
        healthUseCase,
        statusUseCase,
        livezUseCase,
        readyzUseCase,
    );

    const grpcService = new GrpcService(
        grpcConfig.port,
        healthHandler,
    );

    return new Application(
        grpcService,
        jobService,
        messageService,
    );
}

export default buildApplication;
