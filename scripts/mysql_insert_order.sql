use orders;
INSERT INTO `product` (`product_id`, `name`) VALUES (1, 'Iphone 11');
INSERT INTO `product` (`product_id`, `name`) VALUES (2, 'HUAWEI Mate 20X');
INSERT INTO `product` (`product_id`, `name`) VALUES (3, 'HUAWEI P30');
INSERT INTO `product` (`product_id`, `name`) VALUES (4, 'HUAWEI Mate 30 Pro');

insert `order`(order_id, amount, product_id, total_price) values (1, 1, 1, 100);
insert `order`(order_id, amount, product_id, total_price) values (2, 1, 2, 100);
insert `order`(order_id, amount, product_id, total_price) values (3, 1, 3, 100);
insert `order`(order_id, amount, product_id, total_price) values (4, 1, 4, 100);

select * from `product`;
select * from `order`;