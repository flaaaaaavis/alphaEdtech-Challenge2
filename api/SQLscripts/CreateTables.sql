CREATE TABLE public.users (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"password" varchar(30) NOT NULL,
	"cpf" varchar(14) NOT NULL UNIQUE,
	"profile_pic" TEXT NOT NULL,
	"username" varchar(30) NOT NULL UNIQUE,
	"admin" BOOLEAN NOT NULL,
	"ong" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL,
	"token_id" serial NOT NULL,
	"address_id" serial NOT NULL,
	"contact_id" serial NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.addresses (
	"id" serial NOT NULL,
	"cod_ibge_id" serial NOT NULL UNIQUE,
	"uf_id" serial NOT NULL,
	"city_id" serial NOT NULL,
	"latitude" bigint NOT NULL,
	"longitude" bigint NOT NULL,
	CONSTRAINT "addresses_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.pets (
	"id" serial NOT NULL,
	"name" varchar(20) NOT NULL,
	"description" TEXT NOT NULL,
	"age" integer,
	"birth_date" DATE,
	"weight" DECIMAL(2,2),
	"gender" varchar(5) NOT NULL,
	"pics_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"address_id" serial,
	"specie_id" serial NOT NULL,
	CONSTRAINT "pets_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.species (
	"id" serial NOT NULL,
	"name" varchar(30) NOT NULL,
	"size_id" serial NOT NULL,
	CONSTRAINT "species_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.contacts (
	"id" serial NOT NULL,
	"email" varchar(40) NOT NULL UNIQUE,
	"ddd" integer NOT NULL,
	"phone" varchar(9) NOT NULL,
	CONSTRAINT "contacts_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.tags (
	"id" serial NOT NULL UNIQUE,
	"name" varchar(50) NOT NULL UNIQUE,
	CONSTRAINT "tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.bridge_tags_pets (
	"pet_id" serial NOT NULL,
	"tag_id" serial NOT NULL,
	CONSTRAINT "bridge_tags_pets_pk" PRIMARY KEY ("pet_id","tag_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.bridge_fav_pets (
	"pet_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	CONSTRAINT "bridge_fav_pets_pk" PRIMARY KEY ("pet_id","user_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.reports (
	"id" serial NOT NULL,
	"description" varchar(255) NOT NULL,
	"tag_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"pet_id" serial NOT NULL,
	CONSTRAINT "reports_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.adoptions (
	"id" serial NOT NULL,
	"date" DATE NOT NULL,
	"adopter_id" serial NOT NULL,
	"user_id" serial NOT NULL,
	"pet_id" serial NOT NULL,
	CONSTRAINT "adoptions_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.report_tags (
	"id" serial NOT NULL,
	"name" varchar(30) NOT NULL,
	CONSTRAINT "report_tags_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.pets_pics (
	"id" serial NOT NULL,
	"link" TEXT NOT NULL,
	CONSTRAINT "pets_pics_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.size_options (
	"id" serial NOT NULL,
	"name" varchar(10) NOT NULL,
	CONSTRAINT "size_options_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.ufs (
	"id" serial NOT NULL,
	"name" varchar(15) NOT NULL,
	"code" varchar(2) NOT NULL,
	CONSTRAINT "ufs_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.uf_cities (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
	"uf_id" serial NOT NULL,
	CONSTRAINT "uf_cities_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.token (
	"id" serial NOT NULL,
	"code" varchar(8) NOT NULL UNIQUE,
	"due_date" DATE NOT NULL,
	CONSTRAINT "token_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.cod_ibge (
	"id" serial NOT NULL,
	"code" varchar(9) NOT NULL UNIQUE,
	CONSTRAINT "cod_ibge_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE "users" ADD CONSTRAINT "users_fk0" FOREIGN KEY ("token_id") REFERENCES "token"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk1" FOREIGN KEY ("address_id") REFERENCES "addresses"("id");
ALTER TABLE "users" ADD CONSTRAINT "users_fk2" FOREIGN KEY ("contact_id") REFERENCES "contacts"("id");

ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk0" FOREIGN KEY ("cod_ibge_id") REFERENCES "cod_ibge"("id");
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk1" FOREIGN KEY ("uf_id") REFERENCES "ufs"("id");
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_fk2" FOREIGN KEY ("city_id") REFERENCES "uf_cities"("id");

ALTER TABLE "pets" ADD CONSTRAINT "pets_fk0" FOREIGN KEY ("pics_id") REFERENCES "pets_pics"("id");
ALTER TABLE "pets" ADD CONSTRAINT "pets_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "pets" ADD CONSTRAINT "pets_fk2" FOREIGN KEY ("address_id") REFERENCES "addresses"("id");
ALTER TABLE "pets" ADD CONSTRAINT "pets_fk3" FOREIGN KEY ("specie_id") REFERENCES "species"("id");

ALTER TABLE "species" ADD CONSTRAINT "species_fk0" FOREIGN KEY ("size_id") REFERENCES "size_options"("id");

ALTER TABLE "bridge_tags_pets" ADD CONSTRAINT "bridge_tags_pets_fk0" FOREIGN KEY ("pet_id") REFERENCES "pets"("id");
ALTER TABLE "bridge_tags_pets" ADD CONSTRAINT "bridge_tags_pets_fk1" FOREIGN KEY ("tag_id") REFERENCES "tags"("id");

ALTER TABLE "bridge_fav_pets" ADD CONSTRAINT "bridge_fav_pets_fk0" FOREIGN KEY ("pet_id") REFERENCES "pets"("id");
ALTER TABLE "bridge_fav_pets" ADD CONSTRAINT "bridge_fav_pets_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");

ALTER TABLE "reports" ADD CONSTRAINT "reports_fk0" FOREIGN KEY ("tag_id") REFERENCES "report_tags"("id");
ALTER TABLE "reports" ADD CONSTRAINT "reports_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "reports" ADD CONSTRAINT "reports_fk2" FOREIGN KEY ("pet_id") REFERENCES "pets"("id");

ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_fk0" FOREIGN KEY ("adopter_id") REFERENCES "users"("id");
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_fk1" FOREIGN KEY ("user_id") REFERENCES "users"("id");
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_fk2" FOREIGN KEY ("pet_id") REFERENCES "pets"("id");

ALTER TABLE "uf_cities" ADD CONSTRAINT "uf_cities_fk0" FOREIGN KEY ("uf_id") REFERENCES "ufs"("id");