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



select o.order_id,
o.user_id,
o.isPad
from orders o 
left join products p on ARRAY[o.products] = p.product_id;