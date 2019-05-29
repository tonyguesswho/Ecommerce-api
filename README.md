# TSHIRTSHOP API
[![CircleCI](https://circleci.com/gh/tonyguesswho/Ecommerce-api/tree/develop.svg?style=svg&circle-token=0768d804778c56264ebc1d9b21cca4575829db96)](https://circleci.com/gh/tonyguesswho/Ecommerce-api/tree/develop)

An API for a tshirt online store

## features

* [x] Users can see all items when entering the website.
* [x] Items are displayed properly based on the selected department and category.
* [x] Users can search items through search box.
* [x] Support paging if we have too many items.
* [x] Users can see item details by selecting a specific item.
* [x] Users can add items to their shopping carts.
* [x] Users can register/login using website custom forms, or social login libraries.
* [x] Users can checkout with 3rd party payment gateways: Paypal or Stripe.
* [x] Users will get confirmations over emails about their orders.

## Root Endpoint

[https://protected-mesa-94426.herokuapp.com]

## API Documentation

API documenntation: [https://documenter.getpostman.com/view/6573134/S1LyV85N]

## Getting started

### Prerequisites

In order to install and run this project locally, you would need to have the following installed on you local machine.

* [**Node JS**](https://nodejs.org/en/)
* [**MySQL**](https://www.mysql.com/downloads/)
* [**Redis**](https://redis.io)

### Installation

* Clone this repository

```sh
git clone [https://github.com/tonyguesswho/Ecommerce-api.git]
```

* Navigate to the project directory



* Run `npm install` or `yarn` to instal the projects dependencies
* create a `.env` file and copy the contents of the `.env.sample` file into it and supply the values for each variable

```sh
cp .evn.sample .env
```

* Create a MySQL database and run the `sql` file in the models directory to migrate the database

## Stripe Integration

Shopping orders are paid for using a Stripe integration. In order to use the stripe endpoint send a `POST` request to `/stripe/charge`

You will need to provide a `stripeToken`. To get the token fill out the form at https://ecommerce-turing-core.herokuapp.com/stripe

### Project structure
![](https://user-images.githubusercontent.com/19865565/58978860-ab5f4c80-87c4-11e9-99cc-99fd70619f5c.png)
