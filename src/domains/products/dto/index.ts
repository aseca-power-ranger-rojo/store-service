import { Decimal } from "@prisma/client/runtime/library";
import { IsDecimal, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateProductDTO {
    @IsString()
    @IsNotEmpty()
    name!: string

    @IsDecimal()
    @IsNotEmpty()
    price!: string
}

export class GetProductDTO {
    constructor(product: GetProductDTO) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
    }

    id: string;
    name: string;
    price: Decimal;
}