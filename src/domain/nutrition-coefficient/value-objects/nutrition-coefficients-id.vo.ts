import {randomUUID} from "crypto";

export class NutritionCoefficientsId {
    constructor(
        readonly value: string,
    ) {
    }

    static create(): NutritionCoefficientsId {
        return new NutritionCoefficientsId(randomUUID());
    }
}

export default NutritionCoefficientsId;
