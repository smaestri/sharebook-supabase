
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

SET default_tablespace = '';

SET default_table_access_method = "heap";

CREATE TABLE IF NOT EXISTS "public"."book" (
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "title" character varying,
    "author" character varying,
    "category_id" bigint,
    "isbn" "text" NOT NULL,
    "image" "text"
);

ALTER TABLE "public"."book" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."borrow" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "borrower_id" "text" NOT NULL,
    "book_id" bigint NOT NULL,
    "close_date" timestamp with time zone,
    "rdv_date" "date",
    "rdv_time" "text",
    "rdv_place" "text",
    "status" "text" DEFAULT 'PENDING'::"text"
);

ALTER TABLE "public"."borrow" OWNER TO "postgres";

ALTER TABLE "public"."borrow" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."borrow_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."category" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "name" character varying
);

ALTER TABLE "public"."category" OWNER TO "postgres";

ALTER TABLE "public"."category" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."category_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."messages" (
    "id" bigint NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "borrow_id" bigint,
    "email" "text",
    "message" "text"
);

ALTER TABLE "public"."messages" OWNER TO "postgres";

ALTER TABLE "public"."messages" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."messages_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

CREATE TABLE IF NOT EXISTS "public"."user" (
    "email" "text" NOT NULL,
    "pseudo" "text" NOT NULL,
    "city" "text",
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "cp" "text",
    "street" "text"
);

ALTER TABLE "public"."user" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_book" (
    "email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "book_isbn" "text" NOT NULL,
    "id" bigint NOT NULL,
    "state" "text",
    "price" smallint DEFAULT '0'::smallint,
    "status" "text" DEFAULT 'FREE'::"text",
    "place" "text",
    "deleted" boolean DEFAULT false NOT NULL
);

ALTER TABLE "public"."user_book" OWNER TO "postgres";

ALTER TABLE "public"."user_book" ALTER COLUMN "id" ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME "public"."user_book_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);

ALTER TABLE ONLY "public"."book"
    ADD CONSTRAINT "book_pkey" PRIMARY KEY ("isbn");

ALTER TABLE ONLY "public"."borrow"
    ADD CONSTRAINT "borrow_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."category"
    ADD CONSTRAINT "category_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user_book"
    ADD CONSTRAINT "user_books_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "user_pkey" PRIMARY KEY ("email");

ALTER TABLE ONLY "public"."book"
    ADD CONSTRAINT "books_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id");

ALTER TABLE ONLY "public"."borrow"
    ADD CONSTRAINT "borrow_book_id_fkey" FOREIGN KEY ("book_id") REFERENCES "public"."user_book"("id");

ALTER TABLE ONLY "public"."borrow"
    ADD CONSTRAINT "borrow_borrower_id_fkey" FOREIGN KEY ("borrower_id") REFERENCES "public"."user"("email");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_borrow_id_fkey" FOREIGN KEY ("borrow_id") REFERENCES "public"."borrow"("id");

ALTER TABLE ONLY "public"."messages"
    ADD CONSTRAINT "messages_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."user"("email");

ALTER TABLE ONLY "public"."user_book"
    ADD CONSTRAINT "user_book_book_isbn_fkey" FOREIGN KEY ("book_isbn") REFERENCES "public"."book"("isbn");

ALTER TABLE ONLY "public"."user_book"
    ADD CONSTRAINT "user_book_email_fkey" FOREIGN KEY ("email") REFERENCES "public"."user"("email");

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON TABLE "public"."book" TO "anon";
GRANT ALL ON TABLE "public"."book" TO "authenticated";
GRANT ALL ON TABLE "public"."book" TO "service_role";

GRANT ALL ON TABLE "public"."borrow" TO "anon";
GRANT ALL ON TABLE "public"."borrow" TO "authenticated";
GRANT ALL ON TABLE "public"."borrow" TO "service_role";

GRANT ALL ON SEQUENCE "public"."borrow_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."borrow_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."borrow_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."category" TO "anon";
GRANT ALL ON TABLE "public"."category" TO "authenticated";
GRANT ALL ON TABLE "public"."category" TO "service_role";

GRANT ALL ON SEQUENCE "public"."category_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."category_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."category_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."messages" TO "anon";
GRANT ALL ON TABLE "public"."messages" TO "authenticated";
GRANT ALL ON TABLE "public"."messages" TO "service_role";

GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."messages_id_seq" TO "service_role";

GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";

GRANT ALL ON TABLE "public"."user_book" TO "anon";
GRANT ALL ON TABLE "public"."user_book" TO "authenticated";
GRANT ALL ON TABLE "public"."user_book" TO "service_role";

GRANT ALL ON SEQUENCE "public"."user_book_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."user_book_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."user_book_id_seq" TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";

ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";

RESET ALL;
