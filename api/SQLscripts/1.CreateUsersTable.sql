CREATE TABLE public.users (
	"id" serial NOT NULL,
	"name" varchar(50) NOT NULL,
    "cpf" varchar(14) NOT NULL UNIQUE,
    "username" varchar(30) NOT NULL UNIQUE,
	"password" varchar(30) NOT NULL,
	"profile_pic" TEXT,
	"admin" BOOLEAN NOT NULL,
	"ong" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
)