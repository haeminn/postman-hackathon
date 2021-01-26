# Food eco stats API

Get metrics on the environmental impact of food products.

## Background

It's no secret that our climate is changing, and food production is one of the biggest contributors. From greenhouse gas emissions, to water usage, to fertilizer run-off into water sources, agriculture and livestock farming play a major role in our health and climate.

Check out these statistics from [Our World in Data](https://ourworldindata.org/environmental-impacts-of-food)

> - Food accounts for over a quarter (26%) of global greenhouse gas emissions<sup>1</sup>;
> - Half of the world’s habitable (ice- and desert-free) land is used for agriculture;
> - 70% of global freshwater withdrawals are used for agriculture<sup>2</sup>;
> - 78% of global ocean and freshwater eutrophication (the pollution of waterways with nutrient-rich pollutants) is caused by agriculture<sup>3</sup>;
> - 94% of mammal biomass (excluding humans) is livestock. This means livestock outweigh wild mammals by a factor of 15-to-1.<sup>4</sup> Of the 28,000 species evaluated to be threatened with extinction on the IUCN Red List, agriculture and aquaculture is listed as a threat for 24,000 of them.<sup>5</sup>

Source: [Our World in Data](https://ourworldindata.org/environmental-impacts-of-food)

## Raw data

Stats per ingredient: [Google Sheet](https://docs.google.com/spreadsheets/d/1LymaSw6AIP2ryTqNAxl1S0cOShONy4sgGOeIHLykBMw/edit?usp=sharing)

## Endpoints

### `GET /:productISBN`

Returns stats on a product by ISBN (barcode)

## Example Payload

```
{
  "brandOwner": "Nestle USA Inc.",
  "brands": "Hot Pockets",
  "containsPalmOil": false,
  "mayContainPalmOil": false,
  "numIngredients": 84,
  "productName": "Four cheese pizza with parmesan, cheddar & reduced fat provolone & mozzarella cheeses in a garlic buttery crust sandwiches",
  "servingKilograms": 0.12,
  "stats": {
    ...
    "ghg_emissions": {
      "mean": 0.7055285098522162,
      "median": 0.5320506804187187
    },
    "land_use": {
      "mean": 2.552801114532017,
      "median": 0.7542392580049255
    },
    "stress_weighted_water_use": {
      "mean": 7378.098337130538,
      "median": 3123.8892692118206
    }
    ...
  },
  "ingredients": [
    {
      "functionUnit": 0.0548689655172414,
      "id": "en:flour",
      "stats": {
        ...
        "ghg_emissions": {
          "mean": 0.08779034482758624,
          "median": 0.07132965517241383
        }
        ...
      },
      "text": "flour"
    }
    ...
  ]
}
```

## Installation

This API is built with [Nest](https://github.com/nestjs/nest), a Node.js framework for building API's. Please refer to their docs for more information.

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
