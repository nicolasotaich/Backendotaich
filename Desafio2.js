let fs = require('fs');

class Contenedor {
    constructor(url){
        this.url = url;
    }

    async save(obj){
        const products = await this.getAll();
        obj.id = ( products.length === 0 ) ? 1 : products[products.length - 1].id + 1;
        products.push(obj);
        try {
            console.log(`${JSON.stringify(obj)} has been added.`);
            return await fs.promises.writeFile('./desafio2/products.json', JSON.stringify(products, null, 2));
        } catch (error) {
            throw new Error(error);
        }
    }
    async getById(id){
        try {
            const products = await this.getAll();
            return products.find(item => item.id === parseInt(id)) ?? console.log("NON-EXISTENT ID");
        } catch (error) {
            throw new Error(error);
        }
    }
    async getAll(){
        try {
            let products = await fs.promises.readFile(this.url, 'utf-8');
            return JSON.parse( products );
        } catch (error) {
            console.log(error, 'Products was empty.');
            return [];
        }
    }
    async deleteById(id){
        try {
            const products = await this.getAll();
            let deletedProd = await this.getById(id);

            products.splice(products.indexOf(deletedProd), 1);

            await fs.promises.writeFile('./desafio2/products.json', JSON.stringify(products, null, 2));

        } catch (error) {
            throw new Error(error)
        }
    }
    async deleteAll(){
        try {
            let products = await this.getAll();
            products = [];

            await fs.promises.writeFile('./desafio2/products.json', JSON.stringify(products, null, 2));
            console.log('All products deleted.');
        } catch (error) {
            throw new Error(error)
        }
    }
}

const file = new Contenedor('./desafio2/products.json');

/* 
    METODO SAVE
file.save({
    name: 'Alfajor',
    price: 200,
    description: 'Alfajor relleno de ddl'
});
    METODO GET ALL
file.getAll();
    METODO GET BY ID
file.getById(3);
    METODO DELETE BY ID
file.deleteById(2);
    METODO DELETE ALL
file.deleteAll();
*/