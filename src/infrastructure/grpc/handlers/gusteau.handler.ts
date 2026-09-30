import * as grpc from "@grpc/grpc-js";
import * as gusteauProto from "../../../contracts/proto/gusteau";
import callbackError from "./callback.error";
import logger from "@shared/logger";

import CreateProductUseCase from "../../../application/use-cases/product/create-product";
import GetProductUseCase from "../../../application/use-cases/product/get-product";
import GetNutritionCoefficientUseCase
    from "../../../application/use-cases/nutrition-coefficient/get-nutrition-coefficient";
import UpdateNutritionCoefficientUseCase
    from "../../../application/use-cases/nutrition-coefficient/update-nutrition-coefficient";
import CreateFoodLogUseCase from "../../../application/use-cases/food-log/create-food-log";
import GetFoodLogsUseCase from "../../../application/use-cases/food-log/get-food-logs";

import ProductProtoMapper from "../mappers/product.proto.mapper";
import NutritionCoefficientProtoMapper from "../mappers/nutrition-coefficients.proto.mapper";
import FoodLogProtoMapper from "../mappers/food-log.proto.mapper";
import ProductId from "../../../domain/product/value-objects/product-id.vo";
import NutritionCoefficientId from "../../../domain/nutrition-coefficient/value-objects/nutrition-coefficient-id.vo";
import FoodLogId from "../../../domain/food-log/value-objects/food-log-id.vo";

export class GusteauHandler {
    constructor(
        private readonly createProductUseCase: CreateProductUseCase,
        private readonly getProductUseCase: GetProductUseCase,
        private readonly getNutritionCoefficientUseCase: GetNutritionCoefficientUseCase,
        private readonly updateNutritionCoefficientUseCase: UpdateNutritionCoefficientUseCase,
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
            const product = ProductProtoMapper.toDomain(call.request as gusteauProto.ProductObject);

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

            const {id} = call.request;
            const product = await this.getProductUseCase.execute(ProductId.create(id));

            const response = gusteauProto.ProductResponse.create({
                product: ProductProtoMapper.toProto(product),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async getNutritionCoefficient(
        call: grpc.ServerUnaryCall<
            gusteauProto.GetNutritionCoefficientRequest,
            gusteauProto.NutritionCoefficientResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.NutritionCoefficientResponse>
    ) {
        try {
            const {profileId} = call.request;

            const coefficient =
                await this.getNutritionCoefficientUseCase.execute(NutritionCoefficientId.create(profileId));

            const response = gusteauProto.NutritionCoefficientResponse.create({
                nutritionCoefficient: NutritionCoefficientProtoMapper.toProto(coefficient),
            });

            callback(null, response);
        } catch (err: any) {
            logger.log(err);
            callbackError(callback, err);
        }
    }

    async updateNutritionCoefficient(
        call: grpc.ServerUnaryCall<
            gusteauProto.UpdateNutritionCoefficientRequest,
            gusteauProto.NutritionCoefficientResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.NutritionCoefficientResponse>
    ) {
        try {
            const coefficient =
                NutritionCoefficientProtoMapper.toDomain(
                    call.request as gusteauProto.NutritionCoefficientObject,
                );

            const result =
                await this.updateNutritionCoefficientUseCase.execute(
                    coefficient,
                );

            const response =
                gusteauProto.NutritionCoefficientResponse.create({
                    nutritionCoefficient:
                        NutritionCoefficientProtoMapper.toProto(result),
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
            const foodLog = FoodLogProtoMapper.toDomain(call.request as gusteauProto.FoodLogObject);

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

    async getFoodLog(
        call: grpc.ServerUnaryCall<
            gusteauProto.GetFoodLogsRequest,
            gusteauProto.FoodLogsResponse
        >,
        callback: grpc.sendUnaryData<gusteauProto.FoodLogResponse>
    ) {
        try {
            const {profileId} = call.request;

            const foodLogs = await this.getFoodLogsUseCase.execute(FoodLogId.create(profileId));

            const response = gusteauProto.FoodLogsResponse.create({
                foodLogs: {
                    foodLog: foodLogs.map(FoodLogProtoMapper.toProto),
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