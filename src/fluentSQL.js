export default class FluentSQLBuilder {
    
    #database = [];
    #limit = 0;
    #select = [];
    #where = [];
    #orderBy = '';

    constructor({database}) {
        this.#database = database;
    }

    static for(database) {
        return new FluentSQLBuilder({ database });
    }
    
    limit(max) {
        this.#limit = max;

        return this
    }

    select(props) {
        this.#select = props;

        return this
    }

    where(query) {
        const [[key, value]] = Object.entries(query);
        const whereFilter = value instanceof RegExp ? value : new RegExp(value)

        this.#where.push({ key, filter: whereFilter});

        return this
    }

    orderBy(field) {
        this.#orderBy = field;

        return this
    }

    #performWhere(item) {
        for (const { filter, key } of this.#where) {
            if (!filter.test(item[key])) return false
        }
        return true
    }    

    #performLimit(results) {
        return this.#limit && results.length === this.#limit
    }

    #performSelect(item) {
        const currentItem = {};
        const entries = Object.entries(item);
        
        for (const [key, value] of entries) {
            if (this.#select.length && !this.#select.includes(key)) continue;

            currentItem[key] = value;
        }

        return currentItem;
    }

    #performOrderBy(results) {
        if (!this.#orderBy) return results;
        return results.sort((prev, next) => {
            return (prev[this.#orderBy]).localeCompare(next[this.#orderBy]);
        })
    }

    build() {
        const results = [];

        for (const item in this.#database) {
            const obj = this.#database[item];

            if (!this.#performWhere(obj)) continue
            
            const currentItem = this.#performSelect(obj)

            results.push(currentItem);

            if (this.#performLimit(results)) break
        }

        const finalResult = this.#performOrderBy(results);
        return finalResult;
    }

}