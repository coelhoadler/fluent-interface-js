import data from '../database/data.json';
import FluentSQLBuilder from './fluentSQL.js';

const result = FluentSQLBuilder.for(data)
                .where({
                    category: /^dev/
                })
                .select(['name', 'company'])
                .orderBy('company')
                .build();

console.table(result)
