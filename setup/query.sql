select
    user_id,
    products[2]
from orders
where user_id = 1;

select 
    product_id,
    category_id,
    name,
    price,
    img_url
from products
where price between 100 and 500;

    select *
    from orders o join products p
    on p.product_id = any (o.products);

select 
    o.order_id,
    o.user_id,
    (
        select p.*
        from unnest(o.products) id
        left join products p on p.product_id = id
    ),
    o.isPad
from orders o;

select p.*
from unnest(ARRAY[2,7]) id
left join products p on p.product_id = id

select p.*
from (
    SELECT products from orders
) id
left join products p on p.product_id = 7;


select 
o.order_id,
o.user_id,
(
    select 
        name
        price
    from products 
    where product_id = ARRAY{o.products}
) as items,
o.isPad
from orders as o;
