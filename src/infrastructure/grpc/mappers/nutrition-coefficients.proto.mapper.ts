import * as gusteauProto from "../../../contracts/proto/gusteau";
import NutritionCoefficientsEntity, {
    NutritionCoefficientsEntityProps,
} from "../../../domain/nutrition-coefficients/nutrition-coefficients.entity";
import NutritionCoefficientsId from "../../../domain/nutrition-coefficients/value-objects/nutrition-coefficients-id.vo";
import NutritionProteinCoefficient from "../../../domain/nutrition-coefficients/value-objects/nutrition-protein-coefficient.vo";
import NutritionFatCoefficient from "../../../domain/nutrition-coefficients/value-objects/nutrition-fat-coefficient.vo";
import NutritionCarbsCoefficient from "../../../domain/nutrition-coefficients/value-objects/nutrition-carbs-coefficient.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

export class NutritionCoefficientsProtoMapper {
    static toProto(
        coefficients: NutritionCoefficientsEntity,
    ): gusteauProto.NutritionCoefficientsObject {
        return gusteauProto.NutritionCoefficientsObject.create({
            id: coefficients.id.value,
            profileId: coefficients.profileId.value,
            protein: coefficients.protein.value,
            fat: coefficients.fat.value,
            carbs: coefficients.carbs.value,
            createdAt: coefficients.createdAt?.toISOString(),
            updatedAt: coefficients.updatedAt?.toISOString(),
        });
    }

    static toDomain(
        coefficients: gusteauProto.NutritionCoefficientsObject,
    ): NutritionCoefficientsEntity {
        const coefficientsEntityProps: NutritionCoefficientsEntityProps = {
            id: new NutritionCoefficientsId(coefficients.id),
            profileId: new ProfileId(coefficients.profileId),
            protein: new NutritionProteinCoefficient(coefficients.protein),
            fat: new NutritionFatCoefficient(coefficients.fat),
            carbs: new NutritionCarbsCoefficient(coefficients.carbs),
            createdAt: coefficients.createdAt
                ? new Date(coefficients.createdAt)
                : undefined,
            updatedAt: coefficients.updatedAt
                ? new Date(coefficients.updatedAt)
                : undefined,
        };

        return NutritionCoefficientsEntity.create(coefficientsEntityProps);
    }
}

export default NutritionCoefficientsProtoMapper;
