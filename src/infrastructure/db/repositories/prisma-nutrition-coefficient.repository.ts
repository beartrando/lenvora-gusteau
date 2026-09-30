import NutritionCoefficientsEntity from "../../../domain/nutrition-coefficients/nutrition-coefficients.entity";
import NutritionCoefficientsRepository from "../../../domain/nutrition-coefficients/nutrition-coefficients.repository";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";
import prisma from "../prisma";
import NutritionCoefficientsDbMapper from "../mappers/nutrition-coefficients.db.mapper";

export class PrismaNutritionCoefficientsRepository
    implements NutritionCoefficientsRepository {

    async save(
        coefficients: NutritionCoefficientsEntity,
    ): Promise<NutritionCoefficientsEntity> {
        const data = NutritionCoefficientsDbMapper.toPersistence(coefficients);

        const result = await prisma.nutritionCoefficients.upsert({
            where: {
                id: data.id,
            },
            create: data,
            update: data,
        });

        return NutritionCoefficientsDbMapper.toDomain(result);
    }

    async findByProfileId(
        profileId: ProfileId,
    ): Promise<NutritionCoefficientsEntity> {
        const result = await prisma.nutritionCoefficients.findUniqueOrThrow({
            where: {
                profileId: profileId.value,
            },
        });

        return NutritionCoefficientsDbMapper.toDomain(result);
    }
}

export default PrismaNutritionCoefficientsRepository;
