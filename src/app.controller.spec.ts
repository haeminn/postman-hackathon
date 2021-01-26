import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const productId = '6181459806888';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
      imports: [HttpModule]
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('getProduct', () => {
    it('should get product stats', async () => {
      const result = {
        "brands": "Trader Joe's",
        "containsPalmOil": false,
        "mayContainPalmOil": false
      };

      jest.spyOn(appService, 'getProduct').mockImplementation(() => result as any);
      const res = await appController.getProduct(productId);
      console.log(res)
      expect(res.brands).toBe('Trader Joe\'s');
      expect(res.containsPalmOil).toBe(false);
      expect(res.mayContainPalmOil).toBe(false);
    });
  });
});
