CREATE TABLE cakes (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL UNIQUE,
    price NUMERIC NOT NULL,
    image VARCHAR NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE clients (
    id SERIAL NOT NULL PRIMARY KEY,
    name VARCHAR NOT NULL,
    address VARCHAR NOT NULL,
    phone VARCHAR
);

CREATE TABLE orders (
    id SERIAL NOT NULL PRIMARY KEY,
    "clientId" INTEGER REFERENCES clients(id),
	"cakeId" INTEGER REFERENCES cakes(id),
    quantity INTEGER NOT NULL,
    "createdAt" TIMESTAMP NOT NULL,
    "totalPrice" NUMERIC NOT NULL
);
