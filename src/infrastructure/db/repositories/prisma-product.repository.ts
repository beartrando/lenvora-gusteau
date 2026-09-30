import ProductEntity from "../../../domain/product/product.entity";
import ProductRepository from "../../../domain/product/product.repository";
import ProductId from "../../../domain/product/value-objects/product-id.vo";
import prisma from "../prisma";
import ProductDbMapper from "../mappers/product.db.mapper";

export class PrismaProductRepository implements ProductRepository {
    async save(product: ProductEntity): Promise<ProductEntity> {
        const data = ProductDbMapper.toPersistence(product);

        const result = await prisma.product.upsert({
            where: {
                id: data.id,
            },
            create: data,
            update: data,
        });

        return ProductDbMapper.toDomain(result);
    }

    async findById(id: ProductId): Promise<ProductEntity> {
        const result = await prisma.product.findUniqueOrThrow({
            where: {
                id: id.value,
            },
        });

        return ProductDbMapper.toDomain(result);
    }
}

export default PrismaProductRepository;
