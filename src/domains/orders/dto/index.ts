import { GetProductDTO } from "@domains/products/dto";
import { Decimal } from "@prisma/client/runtime/library";
import { Type } from "class-transformer";
import { IsUUID, IsNotEmpty, IsOptional, IsNumber, IsArray, ValidateNested, IsDecimal } from "class-validator";

export class CreateOrderDTO {
    @IsArray()
    @IsNotEmpty()
    @ValidateNested({ each: true })
    @Type(() => CreateProductOrderDTO)
    products!: CreateProductOrderDTO[];

    @IsDecimal()
    @IsNotEmpty()
    totalPrice!: string;
}

class CreateProductOrderDTO {
    @IsUUID()
    @IsNotEmpty()
    productId!: string;

    @IsNumber()
    @IsOptional()
    quantity?: number;
}

export class GetOrderDTO {
    constructor(order: GetOrderDTO) {
        this.id = order.id;
        this.totalPrice = order.totalPrice;
        this.products = order.products.map(product => new GetProductOrderDTO(product));
    }

    id: string;
    totalPrice: Decimal;
    products: GetProductOrderDTO[];
}

class GetProductOrderDTO {
    constructor(product: GetProductOrderDTO) {
        this.quantity = product.quantity;
        this.product = new GetProductDTO(product.product);
    }

    quantity: number;
    product: GetProductDTO;
}