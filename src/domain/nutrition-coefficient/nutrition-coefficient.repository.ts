import NutritionCoefficientsEntity from "./nutrition-coefficients.entity";
import ProfileId from "../profile/value-objects/profile-id.vo";

export interface NutritionCoefficientsRepository {
    save(coefficients: NutritionCoefficientsEntity): Promise<NutritionCoefficientsEntity>;
    findByProfileId(profileId: ProfileId): Promise<NutritionCoefficientsEntity>;
}

export default NutritionCoefficientsRepository;
