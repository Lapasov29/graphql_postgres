create database store;

\c store;

create extension pgcrypto;

create table categories(
    category_id int generated always as identity primary key,
    name varchar(30) not null unique
);

create table products(
    product_id int generated always as identity primary key,
    category_id int references categories(category_id),
    name varchar(50) not null,
    price int not null,
    short_info text not null,
    long_info text not null,
    img_url text not null
);

create table users(
    user_id int generated always as identity primary key,
    username varchar(50) not null unique,
    password varchar(256) not null,
    contact varchar(12) not null unique,
    email varchar(100) not null check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$') unique,
    role smallint default 2 check(role in (1, 2))
);

create table orders(
    order_id int generated always as identity,
    user_id int references users(user_id),
    products int[] not null,
    isPad boolean default false
);

insert into categories (name) values
('electronics'),
('cars'),
('sport'),
('animals');

insert into products (category_id, name, price, short_info, long_info, img_url) values
(1, 'Redmi 10S', 300, 'The Redmi Note 10S is a slightly more powerful version of the Redmi Note 10 and both these devices are identical to look at.', 'The Redmi Note 10S is a slightly more powerful version of the Redmi Note 10 and both these devices are identical to look at. It has a 6.43-inch AMOLED display with Corning Gorilla Glass 3. The Redmi Note 10S has stereo speakers and an IR emitter that''s not common on budget smartphones', '/images/redmi10S.jpg'),
(1, 'HP', 700, 'The Redmi Note 10S is a slightly more powerful version of the Redmi Note 10 and both these devices are identical to look at.', 'The Redmi Note 10S is a slightly more powerful version of the Redmi Note 10 and both these devices are identical to look at. It has a 6.43-inch AMOLED display with Corning Gorilla Glass 3.', '/images/hp10S.jpg'),
(2, 'Audi Q8', 3000, 'Leading the Audi SUV lineup is the Audi Q8, with its captivating design and powerful performance—all wrapped up in a sleek, SUV body', 'Progress, craftsmanship, and a passion for high performance come together in the Audi e-tron GT and its RS counterpart, Audi''s fully electric grand touring models.', '/images/audiQ8.jpg'),
(2, 'Audi S3', 45800, 'The all-new 2022 Audi S3 combines impressive performance and an assertive stance that encourages staring.', 'Progress, craftsmanship, and a passion for high performance come together in the Audi e-tron GT and its RS counterpart, Audi''s fully electric grand touring models.', '/images/audiS3.jpg'),
(3, 'ball', 50, 'The all-new 2022 Audi S3 combines impressive performance and an assertive stance that encourages staring.', 'Progress, craftsmanship, and a passion for high performance come together in the Audi e-tron GT and its RS counterpart, Audi''s fully electric grand touring models.', '/images/ball.jpg'),
(3, 'bicycle', 150, 'The all-new 2022 Audi S3 combines impressive performance and an assertive stance that encourages staring.', 'Progress, craftsmanship, and a passion for high performance come together in the Audi e-tron GT and its RS counterpart, Audi''s fully electric grand touring models.', '/images/bicycle.jpg'),
(4, 'dog', 100, 'The all-new 2022 Audi S3 combines impressive performance and an assertive stance that encourages staring.', 'Progress, craftsmanship, and a passion for high performance come together in the Audi e-tron GT and its RS counterpart, Audi''s fully electric grand touring models.', '/images/dog.jpg'),
(4, 'cat', 200, 'The all-new 2022 Audi S3 combines impressive performance and an assertive stance that encourages staring.', 'Progress, craftsmanship, and a passion for high performance come together in the Audi e-tron GT and its RS counterpart, Audi''s fully electric grand touring models.', '/images/cat.jpg');

-- ('coder', crypt('admin', gen_salt('bf')), '99893578311', 'email@gmail.com', 1),


insert into users (username, password, contact, email) values
('davron', crypt('1111', gen_salt('bf')), '99893578312', 'fmail@gmail.com'),
('hikmat', crypt('22AA', gen_salt('bf')), '99891345678', 'ymail@gmail.com'),
('alisher', crypt('44FF', gen_salt('bf')), '998997890900', 'qmail@gmail.com'),
('hafsa', crypt('00II', gen_salt('bf')), '998975675433', 'wmail@gmail.com');

insert into orders (user_id, products, isPad) values
(1, '{1, 5, 8}', TRUE),
(2, '{6}', FALSE),
(3, '{4}', TRUE),
(4, '{7, 8}', TRUE),
(5, '{2, 1}', TRUE),
(3, '{2}', TRUE),
(1, '{3, 7}', FALSE)
where user_id <> 1;

-- inserting with checking the role of user
insert into orders (user_id, products, isPad) values
((CASE 
    WHEN 2 <> 1 THEN 1 
ELSE
        RAISE EXCEPTION 'you cannot insert orders into this user' 
END), '{1}', TRUE),
where user_id <> 1;

delete
from orders
where user_id = 1;