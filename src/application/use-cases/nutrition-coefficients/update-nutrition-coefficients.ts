import NutritionCoefficientsEntity from "../../../domain/nutrition-coefficients/nutrition-coefficients.entity";
import NutritionCoefficientsRepository from "../../../domain/nutrition-coefficients/nutrition-coefficients.repository";

export class UpdateNutritionCoefficientsUseCase {
    constructor(
        private readonly nutritionCoefficientsRepository: NutritionCoefficientsRepository,
    ) {
    }

    async execute(
        coefficients: NutritionCoefficientsEntity,
    ): Promise<NutritionCoefficientsEntity> {
        return this.nutritionCoefficientsRepository.save(coefficients);
    }
}

export default UpdateNutritionCoefficientsUseCase;
