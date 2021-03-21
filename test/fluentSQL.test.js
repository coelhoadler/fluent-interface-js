import { expect, describe, test } from '@jest/globals';
import FluentSQLBuilder from '../src/fluentSQL';

const data = [
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
        const expected = [];
        
        expect(result).toStrictEqual(expected);
    });

    test.todo('#limit given a collection it should limit results');

    test.todo('#where given a collection it should filter data');

    test.todo('#select given a collection it should return only specific fields');

    test.todo('#orderBy given a collection it should return order results by field');

    test.todo('#pipeline');
    
});