import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param
} from '@nestjs/common';
import { AppService } from './app.service';
import { mapValues } from 'lodash';
import * as data from './data.json';
import { Product } from './product.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':id')
  async getProduct(@Param('id') id: string): Promise<Product> {
    const product = await this.appService.getProduct(id);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    const {
      ingredients,
      brands,
      brand_owner: brandOwner,
      categories,
      serving_size: servingSize,
      product_name: productName,
      serving_quantity: servingsGrams,
      known_ingredients_n: numIngredients,
      ingredients_from_palm_oil_n: numPalmOilIngredients,
      ingredients_from_or_that_may_be_from_palm_oil_n: numPossiblePalmOilIngredients
    } = product;

    const servingKilograms = servingsGrams / 1000;
    const containsPalmOil = !!numPalmOilIngredients;
    const mayContainPalmOil = !!numPossiblePalmOilIngredients;

    // Getting ecological impact stats
    let globalStats = {};
    const newIngredients = (ingredients || []).map((ingredient) => {
      const { id, percent_estimate, text } = ingredient;
      const functionUnit = (servingKilograms * percent_estimate) / 100;

      const match = data.find((d) => d.tags.includes((text || '').toLowerCase()));

      let stats = {};
      if (match) {
        stats = mapValues(match.stats, (stat, key) => {
          globalStats[key] = globalStats[key] || {};
          return mapValues(stat, (s, k) => {
            const v = s * functionUnit;
            globalStats[key][k] = globalStats[key][k]
              ? globalStats[key][k] + v
              : v;
            return v;
          });
        });
      }

      return {
        id,
        text,
        functionUnit,
        stats
      };
    });

    return {
      brands,
      brandOwner,
      categories,
      servingSize,
      productName,
      ingredients: newIngredients,
      numIngredients,
      stats: globalStats,
      servingKilograms,
      containsPalmOil,
      mayContainPalmOil
    };
  }
}
