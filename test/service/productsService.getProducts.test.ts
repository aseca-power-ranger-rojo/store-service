import { ProductsService } from '@domains/products/service';
import { ProductsRepository } from '@domains/products/repository';
import { db } from '@utils';

describe('ProductsService.getProducts', () => {
    let service: ProductsService;
    let repo: ProductsRepository;

    beforeEach(() => {
        repo = new ProductsRepository(db);
        service = new ProductsService(repo);
    });

    it('test_001 should return an empty list when there are no products', async () => {
        jest.spyOn(repo, 'getProducts').mockResolvedValue([]);

        const products = await service.getProducts();

        expect(products).toEqual([]);
        expect(jest.isMockFunction(repo.getProducts)).toBeTruthy(); // Check if getProducts is a mock function
        expect(repo.getProducts).toHaveBeenCalled(); // Check if getProducts was called
    });
});
