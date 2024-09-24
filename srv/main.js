const cds = require('@sap/cds')
const { Books } = cds.entities('bookshop')
const logger = cds.log('capb2b')
const totalStock = `totalStock`
module.exports = cds.service.impl(function () {
    const changeUrgencyDueToSubject = (data) => {
        if (data) {
            const books = Array.isArray(data) ? data : [data];
            books.forEach((book) => {
                if (book.title?.toLowerCase().includes("harmless")) {
                    book.urgency = "HIGH"
                }
            });
        }
    }
    this.on(totalStock, async () => {
        const result = await SELECT .one .from(Books) .columns('sum(stock) as total') 
        return result.total
    })
    this.after('READ', Books, changeUrgencyDueToSubject)

    //this.on('getStock','Foo', ({params:[id]}) => stocks[id])
    this.on('stockValue',Books, async ({params:[id]}) => {
        const result = await SELECT 
        .one
        .columns(['stock * price as stockValue']) 
        .from (Books)
        .where `ID = ${id}`
        return result.stockValue
    })
    this.on('setPrice',Books, async req => {
        const id = req.params[0]
        logger(req.data)
        await UPDATE (Books, id) .with ({
            price: req.data.price
        })
        return await SELECT (Books, id)
    })
})
