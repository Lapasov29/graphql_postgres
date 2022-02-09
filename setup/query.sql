select
    user_id,
    products[2]
from orders
where user_id = 1;