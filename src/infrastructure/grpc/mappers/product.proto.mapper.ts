import * as gusteauProto from "../../../contracts/proto/gusteau";
import ProductEntity from "../../../domain/product/product.entity";
import ProductId from "../../../domain/product/value-objects/product-id.vo";
import ProductName from "../../../domain/product/value-objects/product-name.vo";
import ProductCalories from "../../../domain/product/value-objects/product-calories.vo";
import ProductProtein from "../../../domain/product/value-objects/product-protein.vo";
import ProductFat from "../../../domain/product/value-objects/product-fat.vo";
import ProductCarbs from "../../../domain/product/value-objects/product-carbs.vo";
import ProfileId from "../../../domain/profile/value-objects/profile-id.vo";

export class ProductProtoMapper {
    static toProto(product: ProductEntity): gusteauProto.ProductObject {
        return gusteauProto.ProductObject.create({
            id: product.id.value,
            profileId: product.profileId.value,
            name: product.name.value,
            calories: product.calories.value,
            protein: product.protein.value,
            fat: product.fat.value,
            carbs: product.carbs.value,
            createdAt: product.createdAt?.toISOString(),
            updatedAt: product.updatedAt?.toISOString(),
        });
    }

    static toDomain(product: gusteauProto.ProductObject): ProductEntity {
        const productEntityProps = {
            id: new ProductId(product.id),
            profileId: new ProfileId(product.profileId),
            name: new ProductName(product.name),
            calories: new ProductCalories(product.calories),
            protein: new ProductProtein(product.protein),
            fat: new ProductFat(product.fat),
            carbs: new ProductCarbs(product.carbs),
            createdAt: product.createdAt
                ? new Date(product.createdAt)
                : undefined,
            updatedAt: product.updatedAt
                ? new Date(product.updatedAt)
                : undefined,
        };

        return ProductEntity.create(productEntityProps);
    }
}

export default ProductProtoMapper;
