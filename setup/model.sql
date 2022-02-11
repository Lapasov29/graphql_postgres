create database store;

\c store;

create extension pgcrypto;

create table categories(
    category_id int generated always as identity primary key,
    name varchar(30) not null check (LENGTH(name) > 0 and LENGTH(name) < 50) unique
);

create table products(
    product_id int generated always as identity primary key,
    category_id int references categories(category_id) check (category_id > 0),
    name varchar(50) not null check (LENGTH(name) > 0 and LENGTH(name) < 50),
    price int not null check (price > 0),
    short_info text not null check (LENGTH(short_info) < 1000),
    long_info text not null check (LENGTH(long_info) < 3000),
    img_url text not null check (img_url ~* '[^\s]+(\.(jpg|png|jpeg))$')
);

create table users(
    user_id int generated always as identity primary key,
    username varchar(50) not null check(LENGTH(username) > 0 AND LENGTH(username) < 30) unique,
    password varchar(256) not null check (LENGTH(password) > 0),
    contact varchar(12) not null check (contact ~* '^998(9[01345789]|6[125679]|7[01234569]|33)[0-9]{7}$') unique,
    email varchar(100) not null check (email ~* '^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+[.][A-Za-z]+$') unique,
    role smallint default 2 check(role in (1, 2))
);

create table orders(
    order_id int generated always as identity,
    user_id int references users(user_id) check (user_id > 1),
    products int[] not null,
    isPad boolean default false
);

insert into categories (name) values
('electronics'),
('cars'),
('sport'),
('animals');

insert into products (category_id, name, price, short_info, long_info, img_url) values
(1, 'Redmi 10S', 300, 'The Redmi Note 10S is a slightly more powerful version of the Redmi Note 10 and both', 'The Redmi Note 10S is a slightly more powerful version of the Redmi Note 10', '/redmi10S.jpg'),
(1, 'HP', 700, 'The Redmi Note 10S is a slightly more powerful version of the Redmi Note 10 and both ', 'The Redmi Note 10S is a slightly more powerful version of the Redmi', '/hp10S.jpg'),
(2, 'Audi Q8', 3000, 'Leading the Audi SUV lineup is the Audi Q8, with its captivating design and powerful performance—all wrapped up in a sleek, SUV body', 'Progress, craftsmanship, and a passion for high performance ', '/audiQ8.jpg'),
(2, 'Audi S3', 45800, 'The all-new 2022 Audi S3.', 'Progress, craftsmanship, and a passion for high performance ', '/audiS3.jpg'),
(3, 'ball', 50, 'The all-new 2022 Audi S3.', 'Progress, craftsmanship, and a passion for high performance ', '/ball.jpg'),
(3, 'bicycle', 150, 'The all-new 2022 Audi S3.', 'Progress, craftsmanship, and a passion for high performance ', '/bicycle.jpg'),
(4, 'dog', 100, 'The all-new 2022 Audi S3.', 'Progress, craftsmanship, and a passion for high performance ', '/dog.jpg'),
(4, 'cat', 200, 'The all-new 2022 Audi S3.', 'Progress, craftsmanship, and a passion for high performance ', '/cat.jpg');

-- ('admin', crypt('admin', gen_salt('bf')), '998935783511', 'email@gmail.com', 1),


insert into users (username, password, contact, email) values
('davron', crypt('1111', gen_salt('bf')), '998935783512', 'fmail@gmail.com'),
('hikmat', crypt('22AA', gen_salt('bf')), '998913456378', 'ymail@gmail.com'),
('alisher', crypt('44FF', gen_salt('bf')), '998997890900', 'qmail@gmail.com'),
('hafsa', crypt('00II', gen_salt('bf')), '998975675433', 'wmail@gmail.com');

insert into orders (user_id, products, isPad) values
(2, '{6}', FALSE),
(3, '{4}', TRUE),
(4, '{7, 8}', TRUE),
(2, '{2, 1}', TRUE),
(3, '{2}', TRUE);


delete
from orders
where user_id = 1;