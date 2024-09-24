using org from '../db/schema';

extend org.qmacro.Books with {
  virtual urgency: String;
}
service bookshop {
  entity Books as projection on org.qmacro.Books actions {
    function stockValue() returns Integer;
    action setPrice(price: Integer) returns Books;
  };
  entity Authors as projection on org.qmacro.Authors;
  entity Orders as projection on org.qmacro.Orders;

  function totalStock() returns Integer;
}