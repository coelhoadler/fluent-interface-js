import { expect, describe, test } from '@jest/globals';
import FluentSQLBuilder from '../src/fluentSQL';

const data = [
    {
        id: 0,
        name: 'Adler',
        category: 'developer'
    },
    {
        id: 2,
        name: 'Ilma',
        category: 'manager'
    },    
    {
        id: 1,
        name: 'Adriane',
        category: 'developer'
    },
    {
        id: 3,
        name: 'Rafael',
        category: 'SM'
    }    
];

describe('Test suite for FluentSQL builder', () => {

    test('#for should return a FluentSQLBuilder instance', () => {
        const result = FluentSQLBuilder.for(data);
        const expected = new FluentSQLBuilder({ database: data });

        expect(result).toStrictEqual(expected);
    });

    test('#build should return empty object instance', () => {
        const result = new FluentSQLBuilder({ database: data }).build();
        const expected = data;
        
        expect(result).toStrictEqual(expected);
    });

    test('#limit given a collection it should limit results', () => {
        const result = new FluentSQLBuilder({ database: data }).limit(1).build();

        const expected = [data[0]];
        
        expect(result).toStrictEqual(expected);
    });

    test('#where given a collection it should filter data', () => {
        const result = new FluentSQLBuilder({ database: data }).where({
            category: /^man/
        }).build();

        const expected = data.filter(({category}) => category.slice(0, 3) == 'man');

        expect(result).toStrictEqual(expected);
    });

    test('#select given a collection it should return only specific fields', () => {
        const result = new FluentSQLBuilder({ database: data }).select(['id', 'name']).limit(1).build();

        const expected = [{
            id: 0,
            name: 'Adler'
        }];

        expect(result).toStrictEqual(expected);
    });

    test('#orderBy given a collection it should return order results by field', () => {
        const result = new FluentSQLBuilder({ database: data }).orderBy('name').build();

        // lista ordenada
        const expected = [
            {
                id: 0,
                name: 'Adler',
                category: 'developer'
            },
            {
                id: 1,
                name: 'Adriane',
                category: 'developer'
            },
            {
                id: 2,
                name: 'Ilma',
                category: 'manager'
            },            
            {
                id: 3,
                name: 'Rafael',
                category: 'SM'
            }
        ];

        expect(result).toStrictEqual(expected);
    });

    test('#pipeline', () => {
        const result = new FluentSQLBuilder({ database: data })
        .where({category: 'developer'})
        .orderBy('name')
        .select(['name', 'category'])
        .limit(1)
        .build();

        const expected = data.filter(({ id }) => id === 0).map(({name, category}) => ({name, category}));

        console.log('expected', expected)
        expect(result).toStrictEqual(expected);
    });
    
});