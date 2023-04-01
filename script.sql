create sequence bundles_id_seq
    as integer;

alter sequence bundles_id_seq owner to postgres;

create table schools
(
    id           serial
        constraint schools_pk
            primary key,
    name         varchar(255),
    active       boolean   not null,
    last_updated timestamp not null
);

alter table schools
    owner to postgres;

create table events
(
    id                 serial
        constraint events_pk
            primary key,
    school_id          integer      not null
        constraint events_schools_id_fk
            references schools,
    active             boolean      not null,
    name               varchar(255) not null,
    ceremony_date      date,
    website_open_date  date,
    website_close_date date,
    last_updated       timestamp    not null
);

alter table events
    owner to postgres;

create table bundle_data
(
    id           integer default nextval('gtnyudb.bundles_id_seq'::regclass) not null
        constraint bundles_pk
            primary key,
    name         varchar(255)                                                not null,
    image        text,
    event_id     integer                                                     not null
        constraint bundles_events_id_fk
            references events,
    last_updated timestamp                                                   not null,
    price        money                                                       not null
);

alter table bundle_data
    owner to postgres;

alter sequence bundles_id_seq owned by bundle_data.id;

create table bundle_products
(
    id   serial
        constraint bundle_products_pk
            primary key,
    name varchar(255) not null
);

alter table bundle_products
    owner to postgres;

create table bundle_products_data
(
    bundle_id         integer not null
        constraint bundle_products_data_bundles_id_fk
            references bundle_data,
    bundle_product_id integer not null
        constraint bundle_products_data_bundle_products_id_fk
            references bundle_products
);

alter table bundle_products_data
    owner to postgres;

create table shipping
(
    id             serial
        constraint shipping_pk
            primary key,
    cost           money     not null,
    address        varchar(255),
    ship_to_school boolean   not null,
    city           varchar(255),
    state          char(2),
    zip            char(5),
    last_updated   timestamp not null,
    event_id       integer   not null
        constraint shipping_events_id_fk
            references events
);

alter table shipping
    owner to postgres;

create table accessory_group_data
(
    name         varchar(255) not null,
    id           serial
        constraint accessory_group_data_pk
            primary key,
    event_id     integer      not null
        constraint accessory_group_data_events_id_fk
            references events,
    last_updated timestamp    not null
);

alter table accessory_group_data
    owner to postgres;

create table accessory_products
(
    id    integer      not null
        constraint accessory_products_pk
            primary key,
    name  varchar(255) not null,
    image text         not null,
    price money
);

alter table accessory_products
    owner to postgres;

create table accessory_group_product_data
(
    product_id integer not null
        constraint accessory_group_product_data_accessory_products_id_fk
            references accessory_products,
    group_id   integer not null
        constraint accessory_group_product_data_accessory_group_data_id_fk
            references accessory_group_data
);

alter table accessory_group_product_data
    owner to postgres;


