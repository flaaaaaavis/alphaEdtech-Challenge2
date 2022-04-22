SELECT * FROM contacts;
SELECT * FROM users;

DELETE FROM contacts WHERE ddd = '11';
DELETE FROM users WHERE cpf = '12345678910';

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

CREATE TABLE public.users (
	"user_id" serial NOT NULL,
	"token_id" integer,
	"name" varchar(50) NOT NULL,
	"cpf" varchar(11) NOT NULL UNIQUE,
	"birthdate" date NOT NULL,
	"contact_id" integer NOT NULL,
	"password" varchar(15) NOT NULL,
	"address_id" integer,
	"deleted" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "users_pk" PRIMARY KEY ("user_id")
) WITH (
  OIDS=FALSE
);