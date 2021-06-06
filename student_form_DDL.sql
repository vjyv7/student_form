-- DROP SCHEMA document_schema ;

CREATE SCHEMA document_schema
    AUTHORIZATION postgres;

CREATE TABLE document_schema.student
(
    id bigserial,
    name character varying(40),
    email character varying(80),
    gender character varying(8),
    dob date,
    comments character varying(160),
    course character varying(8),
    terms character varying(16),
    CONSTRAINT "pk_ID" PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE document_schema.student
    OWNER to postgres;