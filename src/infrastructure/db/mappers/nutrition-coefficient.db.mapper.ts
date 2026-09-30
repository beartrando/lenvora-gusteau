import {NutritionCoefficients} from "@prisma/client";
import NutritionCoefficientsEntity from "../../../domain/nutrition-coefficients/nutrition-coefficients.entity";
import NutritionCoefficientsId from "../../../domain/nutrition-coefficients/value-objects/nutrition-coefficients-id.vo";
import NutritionProteinCoefficient from "../../../domain/nutrition-coefficients/value-objects/nutrition-protein-coefficient.vo";
import NutritionFatCoefficient from "../../../domain/nutrition-coefficients/value-objects/nutrition-fat-coefficient.vo";
import NutritionCarbsCoefficient from "../../../domain/nutrition-coefficients/value-objects/nutrition-carbs-coefficient.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

type NutritionCoefficientSaveData = Omit<
    NutritionCoefficients,
    "createdAt" | "updatedAt"
>;

export class NutritionCoefficientDbMapper {
    static toPersistence(
        coefficients: NutritionCoefficientsEntity,
    ): NutritionCoefficientSaveData {
        return {
            id: coefficients.id.value,
            profileId: coefficients.profileId.value,

            protein: coefficients.protein.value,
            fat: coefficients.fat.value,
            carbs: coefficients.carbs.value,
        };
    }

    static toDomain(
        coefficients: NutritionCoefficients,
    ): NutritionCoefficientsEntity {
        return NutritionCoefficientsEntity.create({
            id: new NutritionCoefficientsId(coefficients.id),
            profileId: new ProfileId(coefficients.profileId),

            protein: new NutritionProteinCoefficient(coefficients.protein),
            fat: new NutritionFatCoefficient(coefficients.fat),
            carbs: new NutritionCarbsCoefficient(coefficients.carbs),

            createdAt: coefficients.createdAt,
            updatedAt: coefficients.updatedAt,
        });
    }
}

export default NutritionCoefficientDbMapper;