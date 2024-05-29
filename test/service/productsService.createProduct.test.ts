
import { ProductsService } from '@domains/products/service';
import { ProductsRepository } from '@domains/products/repository';
import { CreateProductDTO} from "../../src/domains/products/dto";
import { db } from '@utils';


describe('ProductsService.createProduct', () => {
    let service: ProductsService;
    let repo: ProductsRepository;

    beforeEach(() => {
        repo = new ProductsRepository(db);
        service = new ProductsService(repo);
    });

    describe('createProduct', () => {
        it('test001_Calls repository with correct data when creating a product', async () => {
            const data: CreateProductDTO = {name: "name1" , price: "10" };
            const createProductSpy = jest.spyOn(repo, 'createProduct').mockImplementation(() => Promise.resolve());

            await service.createProduct(data);

            expect(createProductSpy).toHaveBeenCalledWith(data);
        });

        it('test002_Throws an error when data is invalid', async () => {
            const data: CreateProductDTO = { name: "name1" , price: "10"  };
            jest.spyOn(repo, 'createProduct').mockImplementation(() => Promise.reject(new Error('Invalid data')));

            await expect(service.createProduct(data)).rejects.toThrow('Invalid data');
        });
    });
});