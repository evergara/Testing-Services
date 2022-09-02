import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from './../../environments/environment';

import { Product } from './../models/product.model';
import { ProductsService } from './products.service';
import { CreateProductDTO, UpdateProductDTO } from '../models/dto/product.dto';
import {
  generateManyProduct,
  generateOneProduct,
} from '../models/product.model.mock';

fdescribe('ProductsService', () => {
  let productsService: ProductsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductsService],
    });
    productsService = TestBed.inject(ProductsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(productsService).toBeTruthy();
  });

  describe('test for "getAllSimple"', () => {
    it('should return a product List', (doneFn) => {
      //Arrange
      const productMock = generateManyProduct();
      //Act
      productsService.getAllSimple().subscribe((products) => {
        //Assert
        expect(products.length).toEqual(productMock.length);
        doneFn();
      });

      //http confi
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush(productMock);
    });

    it('should return a product List asyn', async () => {
      //Arrange
      const productMock = generateManyProduct();
      let productsExpect: Product[] = [];
      //Act
      await productsService.getAllSimple().subscribe((products) => {
        productsExpect = products;
      });

      //http confi
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush(productMock);

      expect(productMock.length).toEqual(productsExpect.length);
    });

    it('should call method GET', async () => {
      //Arrange
      //Act
      await productsService.getAllSimple().subscribe(({}) => {});

      //http confi
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush({});

      expect(req.request.method).toEqual('GET');
    });
  });

  describe('test for "getAll"', () => {
    it('should return a product List', async () => {
      //Arrange
      const productMock = generateManyProduct();
      let productsExpect: Product[] = [];
      //Act
      await productsService.getAll().subscribe((products) => {
        productsExpect = products;
      });

      //http confi
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush(productMock);

      //Assert
      expect(productsExpect.length).toEqual(productMock.length);
    });

    it('should return a product List with taxes', async () => {
      //Arrange
      const productMock: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, //19
        },
        {
          ...generateOneProduct(),
          price: 200, //38
        },
      ];
      let productsExpect: Product[] = [];
      //Act
      await productsService.getAll().subscribe((products) => {
        productsExpect = products;
      });

      //http confi
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush(productMock);

      //Assert
      expect(productsExpect.length).toEqual(productMock.length);
      expect(productsExpect[0].taxes).toBe(19);
      expect(productsExpect[1].taxes).toBe(38);
    });

    it('should return a product List with price negative or cero return tax 0 ', async () => {
      //Arrange
      const productMock: Product[] = [
        {
          ...generateOneProduct(),
          price: 100, //19
        },
        {
          ...generateOneProduct(),
          price: 200, //38
        },
        {
          ...generateOneProduct(),
          price: 0, //0
        },
        {
          ...generateOneProduct(),
          price: -100, // 0
        },
      ];
      let productsExpect: Product[] = [];
      //Act
      await productsService.getAll().subscribe((products) => {
        productsExpect = products;
      });

      //http confi
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush(productMock);

      //Assert
      expect(productsExpect.length).toEqual(productMock.length);
      expect(productsExpect[0].taxes).toBe(19);
      expect(productsExpect[1].taxes).toBe(38);
      expect(productsExpect[2].taxes).toBe(0);
      expect(productsExpect[3].taxes).toBe(0);
    });

    it('should call method GET', async () => {
      //Arrange
      //Act
      await productsService.getAll().subscribe(({}) => {});

      //http confi
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush({});

      expect(req.request.method).toEqual('GET');
    });

    it('should send query param with limit 10 and offset 3', async () => {
      //Arrange
      const productMock = generateManyProduct();
      const limit = 10;
      const offset = 3;
      let productsExpect: Product[] = [];
      //Act
      await productsService.getAll(limit, offset).subscribe((products) => {
        productsExpect = products;
      });

      //http confi
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(
        `${url}/products?limit=${limit}&offset=${offset}`
      );
      req.flush(productMock);

      //Assert
      expect(req.request.params.get('limit')).toEqual(`${limit}`);
      expect(req.request.params.get('offset')).toEqual(`${offset}`);
    });
  });

  describe('test for "create"', () => {
    it('#create should return a new product', async () => {
      //Arrange
      const productMock: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12,
      };
      let productExpect: Product = {} as Product;
      //Act
      await productsService.create(dto).subscribe((product) => {
        productExpect = product;
      });

      //Http config
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush(productMock);

      //Assert
      expect(productExpect).toEqual(productMock);
    });

    it('#create should send to API the dto send', async () => {
      //Arrange
      const productMock: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12,
      };
      let productExpect: Product = {} as Product;
      //Act
      await productsService.create(dto).subscribe((product) => {
        productExpect = product;
      });

      //Http config
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush(productMock);

      //Assert
      expect(req.request.body).toEqual(dto);
    });

    it('#create should call method POST', async () => {
      //Arrange
      const productMock: Product = generateOneProduct();
      const dto: CreateProductDTO = {
        title: 'new product',
        price: 100,
        images: ['img'],
        description: 'bla bla bla',
        categoryId: 12,
      };
      let productExpect: Product = {} as Product;
      //Act
      await productsService.create(dto).subscribe((product) => {
        productExpect = product;
      });

      //Http config
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(`${url}/products`);
      req.flush(productMock);

      //Assert
      expect(req.request.method).toEqual('POST');
    });
  });

  describe('test for "update"', () => {
    it('#update should call method PUT', async () => {
      //Arrange
      const productMock: Product = generateOneProduct();
      const uuid_product = productMock.id;
      const updateProductDTO: UpdateProductDTO = {
        title: 'new product  2',
      };
      let productExpect: Product = {} as Product;
      //Act
      await productsService
        .update(uuid_product, { ...updateProductDTO })
        .subscribe((product) => {
          productExpect = product;
        });

      //Http config
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(
        `${url}/products/${uuid_product}`
      );
      req.flush(productMock);

      //Assert
      expect(productExpect).toEqual(productMock);
      expect(req.request.body).toEqual(updateProductDTO);
      expect(req.request.method).toEqual('PUT');
    });
  });

  describe('test for "delete"', () => {
    it('#update should call method DELETE', async () => {
      //Arrange
      const productMock: Product = generateOneProduct();
      const uuid_product = productMock.id;
      let responseExpect = false;
      let productExpect: Product = {} as Product;
      //Act
      await productsService.delete(uuid_product).subscribe((isDelete) => {
        responseExpect = isDelete;
      });

      //Http config
      const url = `${environment.API_URL}/api/v1`;
      const req = httpTestingController.expectOne(
        `${url}/products/${uuid_product}`
      );
      req.flush(true);

      //Assert
      expect(responseExpect).toEqual(true);
      expect(req.request.method).toEqual('DELETE');
    });
  });
});
