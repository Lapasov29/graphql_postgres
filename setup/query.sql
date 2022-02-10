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