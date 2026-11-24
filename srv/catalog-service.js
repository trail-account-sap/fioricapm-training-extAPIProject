const cds = require('@sap/cds')

module.exports = class NorthwindService extends cds.ApplicationService { init() {

  const { Products } = cds.entities('NorthwindService')

  /* this.before (['CREATE', 'UPDATE'], Products, async (req) => {
    console.log('Before CREATE/UPDATE Products', req.data)
  }) */
  this.on ('READ', Products, async (req) => {
    //console.log('After READ Products', products)
    const connec = await cds.connect.to("northwind");
    const results = await connec.run(req.query);
    //return connec.run(req.query);
    return results.map((product) => ({
      ...product,
      StockStatus : product.UnitsInStock < 100 ? 'Low Stock' : 'Available'
    }))
  })

  this.on ('READ', 'Order_Details', async (req) => {
    //console.log('After READ Products', products)
    const connec = await cds.connect.to("northwind");
    return connec.run(req.query);
  })

  this.on ('READ', 'Orders', async (req) => {
    //console.log('After READ Products', products)
    const connec = await cds.connect.to("northwind");
    let results = await connec.run(req.query);
    results = results.length < 2 ? results : [results];
    return results.map(prod => ({
      ...prod, regStatus : prod.ShipRegion == null ? 'N' : 'Y'
    }));

  })
  

  return super.init()
}}
