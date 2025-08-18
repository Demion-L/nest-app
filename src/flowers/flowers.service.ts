import { Injectable } from '@nestjs/common';

@Injectable()
export class FlowersService {
    findAll() {
        return [
            {
            name: 'Rose',
            color: 'Red',
            price: 100,
        }, {
            name: 'Tulip',
            color: 'Yellow',
            price: 50,
        }, {
            name: 'Chrysanthemum',
            color: 'Orange',
            price: 75,
        }
    ];
    }
}
