using {northwind as db} from './external/northwind';

service NorthwindService {
    entity Products as projection on db.Products;
    entity Order_Details as projection on db.Order_Details;
    entity Orders as projection on db.Orders;
}