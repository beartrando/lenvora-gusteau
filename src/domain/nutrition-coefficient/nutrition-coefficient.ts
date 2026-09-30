import ProfileId from "../profile/value-objects/profile-id.vo";
import NutritionCoefficientsId from "./value-objects/nutrition-coefficients-id.vo";
import NutritionProteinCoefficient from "./value-objects/nutrition-protein-coefficient.vo";
import NutritionFatCoefficient from "./value-objects/nutrition-fat-coefficient.vo";
import NutritionCarbsCoefficient from "./value-objects/nutrition-carbs-coefficient.vo";

type NutritionCoefficientsEntityProps = {
    id?: NutritionCoefficientsId;
    profileId: ProfileId;
    protein: NutritionProteinCoefficient;
    fat: NutritionFatCoefficient;
    carbs: NutritionCarbsCoefficient;
    createdAt?: Date;
    updatedAt?: Date;
};

export class NutritionCoefficientsEntity {
    constructor(
        readonly id: NutritionCoefficientsId,
        readonly profileId: ProfileId,
        readonly protein: NutritionProteinCoefficient,
        readonly fat: NutritionFatCoefficient,
        readonly carbs: NutritionCarbsCoefficient,
        readonly createdAt: Date | null,
        readonly updatedAt: Date | null,
    ) {
    }

    static create(
        props: NutritionCoefficientsEntityProps,
    ): NutritionCoefficientsEntity {
        const now = new Date();

        return new NutritionCoefficientsEntity(
            props.id ?? NutritionCoefficientsId.create(),
            props.profileId,
            props.protein,
            props.fat,
            props.carbs,
            props.createdAt ?? now,
            props.updatedAt ?? now,
        );
    }
}

export default NutritionCoefficientsEntity;