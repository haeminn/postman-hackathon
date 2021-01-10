import { HttpService, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private httpService: HttpService) {}

  async getProduct(id: string) {
    const response = await this.httpService
      .get(`https://world.openfoodfacts.org/api/v0/product/${id}.json`)
      .toPromise();
    return (response as any).data.product;
  }
}
