import NutritionCoefficientsEntity from "../../../domain/nutrition-coefficients/nutrition-coefficients.entity";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import NutritionCoefficientsRepository from "../../../domain/nutrition-coefficients/nutrition-coefficients.repository";

export class GetNutritionCoefficientsUseCase {
    constructor(
        private readonly nutritionCoefficientsRepository: NutritionCoefficientsRepository,
    ) {
    }

    async execute(
        profileId: ProfileId,
    ): Promise<NutritionCoefficientsEntity> {
        return this.nutritionCoefficientsRepository.findByProfileId(profileId);
    }
}

export default GetNutritionCoefficientsUseCase;
