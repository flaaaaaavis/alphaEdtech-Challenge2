CREATE TABLE public.users (
	"user_id" serial NOT NULL,
	"token_id" integer,
	"name" varchar(50) NOT NULL,
	"cpf" varchar(11) NOT NULL UNIQUE,
	"birthdate" date NOT NULL,
	"contact_id" integer NOT NULL,
	"password" varchar(150) NOT NULL,
	"address_id" integer,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.token (
	"token_id" serial NOT NULL,
	"code" text NOT NULL,
	"due_date" date NOT NULL,
	CONSTRAINT "token_pk" PRIMARY KEY ("token_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.stores (
	"store_id" serial NOT NULL,
	"name" varchar(30) NOT NULL,
	"user_id" integer NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "stores_pk" PRIMARY KEY ("store_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.products (
	"product_id" serial NOT NULL,
	"name" varchar(20) NOT NULL,
	"value" money NOT NULL,
	"description" text NOT NULL,
	"model" varchar(30) NOT NULL,
	"size_id" integer,
	"store_id" integer,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "products_pk" PRIMARY KEY ("product_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.photos (
	"photo_id" serial NOT NULL,
	"product_id" integer NOT NULL,
	"image_src" TEXT NOT NULL,
	CONSTRAINT "photos_pk" PRIMARY KEY ("photo_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.sizes (
	"size_id" serial NOT NULL,
	"size" varchar(5) NOT NULL,
	"height" integer NOT NULL,
	"width" integer NOT NULL,
	"depth" integer NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "sizes_pk" PRIMARY KEY ("size_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.carts (
	"cart_id" serial NOT NULL,
	"user_id" integer NOT NULL,
	"finished" BOOLEAN NOT NULL DEFAULT 'false',
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "carts_pk" PRIMARY KEY ("cart_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.addresses (
	"address_id" serial NOT NULL,
	"cep" varchar(8) NOT NULL,
	"estado" varchar(2) NOT NULL,
	"cidade" varchar(40) NOT NULL,
	"bairro" varchar(40) NOT NULL,
	"logradouro" varchar(50) NOT NULL,
	"number" varchar(5) NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "addresses_pk" PRIMARY KEY ("address_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.contacts (
	"contact_id" serial NOT NULL,
	"email" varchar NOT NULL UNIQUE,
	"ddd" varchar(2) NOT NULL,
	"phone" varchar(9) NOT NULL,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "contacts_pk" PRIMARY KEY ("contact_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.cart_product (
	"cart_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"amount" int NOT NULL
) WITH (
  OIDS=FALSE
);

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("address_id") REFERENCES "addresses"("address_id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("contact_id") REFERENCES "contacts"("contact_id");

ALTER TABLE "stores" ADD CONSTRAINT "stores_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");

ALTER TABLE "products" ADD CONSTRAINT "products_fk1" FOREIGN KEY ("size_id") REFERENCES "sizes"("size_id");
ALTER TABLE "products" ADD CONSTRAINT "products_fk2" FOREIGN KEY ("store_id") REFERENCES "stores"("store_id");

ALTER TABLE "carts" ADD CONSTRAINT "carts_fk0" FOREIGN KEY ("user_id") REFERENCES "users"("user_id");

ALTER TABLE "cart_product" ADD CONSTRAINT "cart_product_fk0" FOREIGN KEY ("cart_id") REFERENCES "carts"("cart_id");
ALTER TABLE "cart_product" ADD CONSTRAINT "cart_product_fk1" FOREIGN KEY ("product_id") REFERENCES "products"("product_id");

ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("product_id") REFERENCES "products"("product_id");