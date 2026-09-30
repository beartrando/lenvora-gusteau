import * as grpc from "@grpc/grpc-js";
import * as gusteauProto from "../../../contracts/proto/gusteau";
import callbackError from "./callback.error";
import logger from "@shared/logger";

import CreateProductUseCase from "../../../application/use-cases/product/create-product";
import GetProductUseCase from "../../../application/use-cases/product/get-product";
import GetNutritionCoefficientsUseCase
    from "../../../application/use-cases/nutrition-coefficients/get-nutrition-coefficients";
import UpdateNutritionCoefficientsUseCase
    from "../../../application/use-cases/nutrition-coefficients/update-nutrition-coefficients";
import CreateFoodLogUseCase from "../../../application/use-cases/food-log/create-food-log";
import GetFoodLogsUseCase from "../../../application/use-cases/food-log/get-food-logs";

import ProductProtoMapper from "../mappers/product.proto.mapper";
import NutritionCoefficientsProtoMapper from "../mappers/nutrition-coefficients.proto.mapper";
import FoodLogProtoMapper from "../mappers/food-log.proto.mapper";

export class GusteauHandler {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getProductUseCase: GetProductUseCase,
        private readonly getNutritionCoefficientsUseCase: GetNutritionCoefficientsUseCase,
        private readonly updateNutritionCoefficientsUseCase: UpdateNutritionCoefficientsUseCase,
        private readonly createFoodLogUseCase: CreateFoodLogUseCase,
        private readonly getFoodLogsUseCase: GetFoodLogsUseCase,
    ) {
    }

    async createProduct(
        call: grpc.ServerUnaryCall<
            gusteauProto.CreateProductRequest,
            gusteauProto.ProductResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.ProductResponse>
    ) {
        try {
            const product = ProductProtoMapper.requestToDomain(call.request);

            const result = await this.createProductUseCase.execute(product);

            const response = gusteauProto.ProductResponse.create({
                product: ProductProtoMapper.toProto(result),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async getProduct(
        call: grpc.ServerUnaryCall<
            gusteauProto.GetProductRequest,
            gusteauProto.ProductResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.ProductResponse>
    ) {
        try {
            const product = await this.getProductUseCase.execute(
                ProductProtoMapper.requestToDomain(call.request),
            );

            const response = gusteauProto.ProductResponse.create({
                product: ProductProtoMapper.toProto(product),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async getNutritionCoefficients(
        call: grpc.ServerUnaryCall<
            gusteauProto.GetNutritionCoefficientsRequest,
            gusteauProto.NutritionCoefficientsResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.NutritionCoefficientsResponse>
    ) {
        try {
            const coefficients =
                await this.getNutritionCoefficientsUseCase.execute(
                    NutritionCoefficientsProtoMapper.requestToDomain(call.request),
                );

            const response =
                gusteauProto.NutritionCoefficientsResponse.create({
                    nutritionCoefficients:
                        NutritionCoefficientsProtoMapper.toProto(coefficients),
                });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async updateNutritionCoefficients(
        call: grpc.ServerUnaryCall<
            gusteauProto.UpdateNutritionCoefficientsRequest,
            gusteauProto.NutritionCoefficientsResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.NutritionCoefficientsResponse>
    ) {
        try {
            const coefficients =
                NutritionCoefficientsProtoMapper.requestToDomain(
                    call.request,
                );

            const result =
                await this.updateNutritionCoefficientsUseCase.execute(
                    coefficients,
                );

            const response =
                gusteauProto.NutritionCoefficientsResponse.create({
                    nutritionCoefficients:
                        NutritionCoefficientsProtoMapper.toProto(result),
                });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async createFoodLog(
        call: grpc.ServerUnaryCall<
            gusteauProto.CreateFoodLogRequest,
            gusteauProto.FoodLogResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.FoodLogResponse>
    ) {
        try {
            const foodLog = FoodLogProtoMapper.requestToDomain(call.request);

            const result = await this.createFoodLogUseCase.execute(foodLog);

            const response = gusteauProto.FoodLogResponse.create({
                foodLog: FoodLogProtoMapper.toProto(result),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async getFoodLogs(
        call: grpc.ServerUnaryCall<
            gusteauProto.GetFoodLogsRequest,
            gusteauProto.FoodLogsResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.FoodLogsResponse>
    ) {
        try {
            const foodLogs = await this.getFoodLogsUseCase.execute(
                FoodLogProtoMapper.requestToDomain(call.request),
            );

            const response = gusteauProto.FoodLogsResponse.create({
                foodLogs: {
                    foodLogs: foodLogs.map(FoodLogProtoMapper.toProto),
                },
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }
}

export default GusteauHandler;