--------------------------------------------------------
--  File created - Monday-June-10-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Sequence PELANGGAN_SEQ
--------------------------------------------------------

   CREATE SEQUENCE  "PANDAWA"."PELANGGAN_SEQ"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 NOCACHE  NOORDER  NOCYCLE ;
--------------------------------------------------------
--  DDL for Table KARYAWAN
--------------------------------------------------------

  CREATE TABLE "PANDAWA"."KARYAWAN" 
   (	"ID_KARYAWAN" NUMBER(*,0), 
	"NAMA_BELAKANG" VARCHAR2(50 BYTE), 
	"ALAMAT" VARCHAR2(50 BYTE), 
	"NOMOR_TELEPON" NUMBER(*,0), 
	"GAJI" NUMBER(*,0), 
	"JABATAN" VARCHAR2(50 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table KATALOG_KENDARAAN
--------------------------------------------------------

  CREATE TABLE "PANDAWA"."KATALOG_KENDARAAN" 
   (	"ID_KATEGORI" NUMBER(*,0), 
	"NAMA_KATEGORI" VARCHAR2(50 CHAR), 
	"TIPE_KATEGORI" VARCHAR2(50 CHAR), 
	"STATUS_KETERSEDIAAN" VARCHAR2(50 CHAR)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table KENDARAAN
--------------------------------------------------------

  CREATE TABLE "PANDAWA"."KENDARAAN" 
   (	"ID_KENDARAAN" NUMBER(*,0), 
	"NAMA_KENDARAAN" VARCHAR2(100 BYTE), 
	"NOPOL" VARCHAR2(100 BYTE), 
	"TIPE_KENDARAAN" VARCHAR2(100 BYTE), 
	"HARGA" NUMBER(*,0), 
	"STATUS" VARCHAR2(50 CHAR), 
	"KATALOG_KENDARAAN_ID_KATEGORI" NUMBER(*,0), 
	"FOTO_KENDARAAN" BLOB, 
	"BANYAK_SEWA" NUMBER(*,0), 
	"TOP_SPEED" NUMBER(*,0), 
	"LAST_SERVICE" DATE, 
	"CAP_PENUMPANG" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" 
 LOB ("FOTO_KENDARAAN") STORE AS BASICFILE (
  TABLESPACE "SYSTEM" ENABLE STORAGE IN ROW CHUNK 8192 RETENTION 
  NOCACHE LOGGING 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)) ;
--------------------------------------------------------
--  DDL for Table MEMBERSHIP
--------------------------------------------------------

  CREATE TABLE "PANDAWA"."MEMBERSHIP" 
   (	"ID_MEMBERSHIP" NUMBER(*,0), 
	"JENIS_MEMBERSHIP" VARCHAR2(10 BYTE), 
	"POINT_MEMEBERSHIP" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table PELANGGAN
--------------------------------------------------------

  CREATE TABLE "PANDAWA"."PELANGGAN" 
   (	"ID_PELANGGAN" NUMBER(*,0), 
	"NAMA_DEPAN" VARCHAR2(255 CHAR), 
	"NAMA_BELAKANG" VARCHAR2(255 CHAR), 
	"ALAMAT" VARCHAR2(255 CHAR), 
	"NOMOR_TELEPON" NUMBER(*,0), 
	"EMAIL" VARCHAR2(150 CHAR), 
	"FOTO_PELANGGAN" BLOB, 
	"MEMBER_ID_PELANGGAN" NUMBER(*,0), 
	"NIK" NUMBER(*,0), 
	"PASSWORD" VARCHAR2(255 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" 
 LOB ("FOTO_PELANGGAN") STORE AS BASICFILE (
  TABLESPACE "SYSTEM" ENABLE STORAGE IN ROW CHUNK 8192 RETENTION 
  NOCACHE LOGGING 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)) ;
--------------------------------------------------------
--  DDL for Table PEMBAYARAN
--------------------------------------------------------

  CREATE TABLE "PANDAWA"."PEMBAYARAN" 
   (	"ID_PEMBAYARAN" NUMBER(*,0), 
	"METODE_PEMBAYARAN" VARCHAR2(50 CHAR), 
	"TANGGAL_PEMBAYARAN" DATE, 
	"JUMLAH_PEMBAYARAN" NUMBER(*,0), 
	"PEMESANAN_ID_PEMESANAN" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Table PEMESANAN
--------------------------------------------------------

  CREATE TABLE "PANDAWA"."PEMESANAN" 
   (	"ID_PEMESANAN" NUMBER(*,0), 
	"TANGGAL_PEMESANAN" DATE, 
	"TANGGA_MULAI_SEWA" DATE, 
	"TANGGAL_AKHIR_SEWA" DATE, 
	"TOTAL" NUMBER(*,0), 
	"STATUS_PEMESANAN" VARCHAR2(50 CHAR), 
	"PELANGGAN_ID_PELANGGAN" NUMBER(*,0), 
	"KARYAWAN_ID_KARYAWAN" NUMBER(*,0), 
	"KENDARAAN_ID_KENDARAAN" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for View V_KENDARAAN_KATALOG
--------------------------------------------------------

  CREATE OR REPLACE FORCE VIEW "PANDAWA"."V_KENDARAAN_KATALOG" ("TIPE_KATEGORI", "STATUS_KETERSEDIAAN", "NAMA_KENDARAAN", "NOPOL", "TIPE_KENDARAAN", "HARGA", "STATUS", "KATALOG_KENDARAAN_ID_KATEGORI", "FOTO_KENDARAAN", "CAP_PENUMPANG", "LAST_SERVICE", "TOP_SPEED", "BANYAK_SEWA") AS 
  SELECT
    KK.TIPE_KATEGORI,
    KK.STATUS_KETERSEDIAAN,
    K.NAMA_KENDARAAN,
    K.NOPOL,
    K.TIPE_KENDARAAN,
    K.HARGA,
    K.STATUS,
    K.KATALOG_KENDARAAN_ID_KATEGORI,
    K.FOTO_KENDARAAN,
    K.CAP_PENUMPANG,
    K.LAST_SERVICE,
    K.TOP_SPEED,
    K.BANYAK_SEWA
FROM
    PANDAWA.KENDARAAN K
INNER JOIN
    PANDAWA.KATALOG_KENDARAAN KK
ON
    K.KATALOG_KENDARAAN_ID_KATEGORI = KK.ID_KATEGORI
;
--------------------------------------------------------
--  DDL for View V_PELANGGAN_MEMBERSHIP
--------------------------------------------------------

  CREATE OR REPLACE FORCE VIEW "PANDAWA"."V_PELANGGAN_MEMBERSHIP" ("P_ID_PELANGGAN", "NAMA_PELANGGAN", "ALAMAT", "NOMOR_TELEPON", "EMAIL", "P_ID_MEMBERSHIP", "FOTO_PELANGGAN", "M_ID_MEMBERSHIP", "JENIS_MEMBERSHIP", "POINT_MEMEBERSHIP") AS 
  SELECT 
    P.ID_PELANGGAN AS P_ID_PELANGGAN,
    P.NAMA_DEPAN || ' ' || P.NAMA_BELAKANG AS NAMA_PELANGGAN,
    P.ALAMAT,
    P.NOMOR_TELEPON,
    P.EMAIL,
    P.MEMBER_ID_PELANGGAN AS P_ID_MEMBERSHIP,
    P.FOTO_PELANGGAN,
    M.ID_MEMBERSHIP AS M_ID_MEMBERSHIP,
    M.JENIS_MEMBERSHIP,
    M.POINT_MEMEBERSHIP
FROM 
    PANDAWA.PELANGGAN P
INNER JOIN 
    PANDAWA.MEMBERSHIP M
ON 
    P.MEMBER_ID_PELANGGAN = M.ID_MEMBERSHIP
;
REM INSERTING into PANDAWA.KARYAWAN
SET DEFINE OFF;
Insert into PANDAWA.KARYAWAN (ID_KARYAWAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,GAJI,JABATAN) values ('1','Smith','Jl. Merdeka No. 10','123456789','5000000','Manager');
Insert into PANDAWA.KARYAWAN (ID_KARYAWAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,GAJI,JABATAN) values ('2','Johnson','Jl. Sudirman No. 15','987654321','3500000','Staff');
Insert into PANDAWA.KARYAWAN (ID_KARYAWAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,GAJI,JABATAN) values ('3','Williams','Jl. Thamrin No. 20','555666777','3000000','Staff');
Insert into PANDAWA.KARYAWAN (ID_KARYAWAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,GAJI,JABATAN) values ('4','Jones','Jl. Gatot Subroto No. 25','111222333','4000000','Supervisor');
Insert into PANDAWA.KARYAWAN (ID_KARYAWAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,GAJI,JABATAN) values ('5','Brown','Jl. HR Rasuna Said No. 30','999888777','4500000','Staff');
REM INSERTING into PANDAWA.KATALOG_KENDARAAN
SET DEFINE OFF;
Insert into PANDAWA.KATALOG_KENDARAAN (ID_KATEGORI,NAMA_KATEGORI,TIPE_KATEGORI,STATUS_KETERSEDIAAN) values ('1','Mobil','Sedan','Tersedia');
Insert into PANDAWA.KATALOG_KENDARAAN (ID_KATEGORI,NAMA_KATEGORI,TIPE_KATEGORI,STATUS_KETERSEDIAAN) values ('2','Mobil','SUV','Tersedia');
Insert into PANDAWA.KATALOG_KENDARAAN (ID_KATEGORI,NAMA_KATEGORI,TIPE_KATEGORI,STATUS_KETERSEDIAAN) values ('3','Motor','Sport','Tidak Tersedia');
Insert into PANDAWA.KATALOG_KENDARAAN (ID_KATEGORI,NAMA_KATEGORI,TIPE_KATEGORI,STATUS_KETERSEDIAAN) values ('4','Motor','Matic','Tersedia');
Insert into PANDAWA.KATALOG_KENDARAAN (ID_KATEGORI,NAMA_KATEGORI,TIPE_KATEGORI,STATUS_KETERSEDIAAN) values ('5','Mobil','Hatchback','Tidak Tersedia');
REM INSERTING into PANDAWA.KENDARAAN
SET DEFINE OFF;
Insert into PANDAWA.KENDARAAN (ID_KENDARAAN,NAMA_KENDARAAN,NOPOL,TIPE_KENDARAAN,HARGA,STATUS,KATALOG_KENDARAAN_ID_KATEGORI,BANYAK_SEWA,TOP_SPEED,LAST_SERVICE,CAP_PENUMPANG) values ('1','Toyota Camry','B 1234 AB','Sedan','300000000','Tersedia','1',null,'155',to_date('09-01-2024','DD-MM-RRRR'),'4');
Insert into PANDAWA.KENDARAAN (ID_KENDARAAN,NAMA_KENDARAAN,NOPOL,TIPE_KENDARAAN,HARGA,STATUS,KATALOG_KENDARAAN_ID_KATEGORI,BANYAK_SEWA,TOP_SPEED,LAST_SERVICE,CAP_PENUMPANG) values ('2','Honda CR-V','B 5678 CD','SUV','350000000','Tersedia','2',null,'125',to_date('31-08-2023','DD-MM-RRRR'),'6');
Insert into PANDAWA.KENDARAAN (ID_KENDARAAN,NAMA_KENDARAAN,NOPOL,TIPE_KENDARAAN,HARGA,STATUS,KATALOG_KENDARAAN_ID_KATEGORI,BANYAK_SEWA,TOP_SPEED,LAST_SERVICE,CAP_PENUMPANG) values ('3','Yamaha R1','B 9012 EF','Sport','150000000','Tidak Tersedia','3',null,'110',to_date('10-06-2023','DD-MM-RRRR'),'2');
Insert into PANDAWA.KENDARAAN (ID_KENDARAAN,NAMA_KENDARAAN,NOPOL,TIPE_KENDARAAN,HARGA,STATUS,KATALOG_KENDARAAN_ID_KATEGORI,BANYAK_SEWA,TOP_SPEED,LAST_SERVICE,CAP_PENUMPANG) values ('4','Honda Scoopy','B 3456 GH','Matic','20000000','Tersedia','4',null,'150',to_date('18-04-2024','DD-MM-RRRR'),'2');
Insert into PANDAWA.KENDARAAN (ID_KENDARAAN,NAMA_KENDARAAN,NOPOL,TIPE_KENDARAAN,HARGA,STATUS,KATALOG_KENDARAAN_ID_KATEGORI,BANYAK_SEWA,TOP_SPEED,LAST_SERVICE,CAP_PENUMPANG) values ('5','Toyota Yaris','B 7890 IJ','Hatchback','250000000','Tidak Tersedia','5',null,'120',to_date('22-01-2024','DD-MM-RRRR'),'4');
REM INSERTING into PANDAWA.MEMBERSHIP
SET DEFINE OFF;
Insert into PANDAWA.MEMBERSHIP (ID_MEMBERSHIP,JENIS_MEMBERSHIP,POINT_MEMEBERSHIP) values ('1','Silver','100');
Insert into PANDAWA.MEMBERSHIP (ID_MEMBERSHIP,JENIS_MEMBERSHIP,POINT_MEMEBERSHIP) values ('2','Gold','200');
Insert into PANDAWA.MEMBERSHIP (ID_MEMBERSHIP,JENIS_MEMBERSHIP,POINT_MEMEBERSHIP) values ('3','Platinum','300');
Insert into PANDAWA.MEMBERSHIP (ID_MEMBERSHIP,JENIS_MEMBERSHIP,POINT_MEMEBERSHIP) values ('4','Bronze','50');
Insert into PANDAWA.MEMBERSHIP (ID_MEMBERSHIP,JENIS_MEMBERSHIP,POINT_MEMEBERSHIP) values ('5','Regular','0');
REM INSERTING into PANDAWA.PELANGGAN
SET DEFINE OFF;
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('1','John','Doe','Jl. Pahlawan No. 5','111222333','john.doe@example.com','2',null,null);
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('2','Jane','Doe','Jl. Veteran No. 10','444555666','jane.doe@example.com',null,null,null);
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('3','Alice','Smith','Jl. Diponegoro No. 15','777888999','alice.smith@example.com','3',null,null);
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('4','Bob','Johnson','Jl. Ahmad Yani No. 20','333444555','bob.johnson@example.com',null,null,null);
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('5','Emily','Williams','Jl. Asia Afrika No. 25','666777888','emily.williams@example.com','1',null,null);
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('6','Hasbi','Ash','Jl. Jabon','819177230730','hasbi@gmail.com','2',null,'myPass');
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('7','Rusdy','Maestro','Jl. Darjo','67657578','rusdy@yahoo.com','2',null,null);
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('8','Andi','Ka','Jl. Jombang','796215732','andik@gmail.com','2',null,null);
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('9','Salam','Abdul','Jl. Bimasakti','9716497136','Abdul@gmail.com','2',null,null);
Insert into PANDAWA.PELANGGAN (ID_PELANGGAN,NAMA_DEPAN,NAMA_BELAKANG,ALAMAT,NOMOR_TELEPON,EMAIL,MEMBER_ID_PELANGGAN,NIK,PASSWORD) values ('10','Putra','put','Jl. Arjuna','2479842328','putra@yahoo.com','2',null,null);
REM INSERTING into PANDAWA.PEMBAYARAN
SET DEFINE OFF;
Insert into PANDAWA.PEMBAYARAN (ID_PEMBAYARAN,METODE_PEMBAYARAN,TANGGAL_PEMBAYARAN,JUMLAH_PEMBAYARAN,PEMESANAN_ID_PEMESANAN) values ('1','Transfer Bank',to_date('01-06-2024','DD-MM-RRRR'),'500000','1');
Insert into PANDAWA.PEMBAYARAN (ID_PEMBAYARAN,METODE_PEMBAYARAN,TANGGAL_PEMBAYARAN,JUMLAH_PEMBAYARAN,PEMESANAN_ID_PEMESANAN) values ('2','Kartu Kredit',to_date('02-06-2024','DD-MM-RRRR'),'350000','2');
Insert into PANDAWA.PEMBAYARAN (ID_PEMBAYARAN,METODE_PEMBAYARAN,TANGGAL_PEMBAYARAN,JUMLAH_PEMBAYARAN,PEMESANAN_ID_PEMESANAN) values ('3','Tunai',to_date('03-06-2024','DD-MM-RRRR'),'300000','3');
Insert into PANDAWA.PEMBAYARAN (ID_PEMBAYARAN,METODE_PEMBAYARAN,TANGGAL_PEMBAYARAN,JUMLAH_PEMBAYARAN,PEMESANAN_ID_PEMESANAN) values ('4','Transfer Bank',to_date('04-06-2024','DD-MM-RRRR'),'400000','4');
Insert into PANDAWA.PEMBAYARAN (ID_PEMBAYARAN,METODE_PEMBAYARAN,TANGGAL_PEMBAYARAN,JUMLAH_PEMBAYARAN,PEMESANAN_ID_PEMESANAN) values ('5','Kartu Debit',to_date('05-06-2024','DD-MM-RRRR'),'450000','5');
REM INSERTING into PANDAWA.PEMESANAN
SET DEFINE OFF;
Insert into PANDAWA.PEMESANAN (ID_PEMESANAN,TANGGAL_PEMESANAN,TANGGA_MULAI_SEWA,TANGGAL_AKHIR_SEWA,TOTAL,STATUS_PEMESANAN,PELANGGAN_ID_PELANGGAN,KARYAWAN_ID_KARYAWAN,KENDARAAN_ID_KENDARAAN) values ('1',to_date('01-06-2024','DD-MM-RRRR'),to_date('10-06-2024','DD-MM-RRRR'),to_date('20-06-2024','DD-MM-RRRR'),'500000','Selesai','1','1','1');
Insert into PANDAWA.PEMESANAN (ID_PEMESANAN,TANGGAL_PEMESANAN,TANGGA_MULAI_SEWA,TANGGAL_AKHIR_SEWA,TOTAL,STATUS_PEMESANAN,PELANGGAN_ID_PELANGGAN,KARYAWAN_ID_KARYAWAN,KENDARAAN_ID_KENDARAAN) values ('2',to_date('02-06-2024','DD-MM-RRRR'),to_date('12-06-2024','DD-MM-RRRR'),to_date('22-06-2024','DD-MM-RRRR'),'350000','Selesai','2','2','2');
Insert into PANDAWA.PEMESANAN (ID_PEMESANAN,TANGGAL_PEMESANAN,TANGGA_MULAI_SEWA,TANGGAL_AKHIR_SEWA,TOTAL,STATUS_PEMESANAN,PELANGGAN_ID_PELANGGAN,KARYAWAN_ID_KARYAWAN,KENDARAAN_ID_KENDARAAN) values ('3',to_date('03-06-2024','DD-MM-RRRR'),to_date('15-06-2024','DD-MM-RRRR'),to_date('25-06-2024','DD-MM-RRRR'),'300000','Proses','3','3','3');
Insert into PANDAWA.PEMESANAN (ID_PEMESANAN,TANGGAL_PEMESANAN,TANGGA_MULAI_SEWA,TANGGAL_AKHIR_SEWA,TOTAL,STATUS_PEMESANAN,PELANGGAN_ID_PELANGGAN,KARYAWAN_ID_KARYAWAN,KENDARAAN_ID_KENDARAAN) values ('4',to_date('04-06-2024','DD-MM-RRRR'),to_date('18-06-2024','DD-MM-RRRR'),to_date('28-06-2024','DD-MM-RRRR'),'400000','Proses','4','4','4');
Insert into PANDAWA.PEMESANAN (ID_PEMESANAN,TANGGAL_PEMESANAN,TANGGA_MULAI_SEWA,TANGGAL_AKHIR_SEWA,TOTAL,STATUS_PEMESANAN,PELANGGAN_ID_PELANGGAN,KARYAWAN_ID_KARYAWAN,KENDARAAN_ID_KENDARAAN) values ('5',to_date('05-06-2024','DD-MM-RRRR'),to_date('20-06-2024','DD-MM-RRRR'),to_date('30-06-2024','DD-MM-RRRR'),'450000','Belum Bayar','5','5','5');
--------------------------------------------------------
--  DDL for Index PEMBAYARAN__IDX
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."PEMBAYARAN__IDX" ON "PANDAWA"."PEMBAYARAN" ("PEMESANAN_ID_PEMESANAN") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index KATALOG_KENDARAAN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."KATALOG_KENDARAAN_PK" ON "PANDAWA"."KATALOG_KENDARAAN" ("ID_KATEGORI") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index PEMESANAN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."PEMESANAN_PK" ON "PANDAWA"."PEMESANAN" ("ID_PEMESANAN") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index PELANGGAN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."PELANGGAN_PK" ON "PANDAWA"."PELANGGAN" ("ID_PELANGGAN") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index PEMESANAN_ID_PELANGGAN_UN
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."PEMESANAN_ID_PELANGGAN_UN" ON "PANDAWA"."PEMESANAN" ("PELANGGAN_ID_PELANGGAN") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index KARYAWAN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."KARYAWAN_PK" ON "PANDAWA"."KARYAWAN" ("ID_KARYAWAN") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index MEMBERSHIP_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."MEMBERSHIP_PK" ON "PANDAWA"."MEMBERSHIP" ("ID_MEMBERSHIP") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index PEMBAYARAN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."PEMBAYARAN_PK" ON "PANDAWA"."PEMBAYARAN" ("ID_PEMBAYARAN") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  DDL for Index KENDARAAN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "PANDAWA"."KENDARAAN_PK" ON "PANDAWA"."KENDARAAN" ("ID_KENDARAAN") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM" ;
--------------------------------------------------------
--  Constraints for Table PEMBAYARAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."PEMBAYARAN" ADD CONSTRAINT "PEMBAYARAN_PK" PRIMARY KEY ("ID_PEMBAYARAN")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "PANDAWA"."PEMBAYARAN" MODIFY ("PEMESANAN_ID_PEMESANAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMBAYARAN" MODIFY ("JUMLAH_PEMBAYARAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMBAYARAN" MODIFY ("TANGGAL_PEMBAYARAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMBAYARAN" MODIFY ("METODE_PEMBAYARAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMBAYARAN" MODIFY ("ID_PEMBAYARAN" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table MEMBERSHIP
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."MEMBERSHIP" ADD CONSTRAINT "MEMBERSHIP_PK" PRIMARY KEY ("ID_MEMBERSHIP")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "PANDAWA"."MEMBERSHIP" MODIFY ("JENIS_MEMBERSHIP" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."MEMBERSHIP" MODIFY ("ID_MEMBERSHIP" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table PELANGGAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."PELANGGAN" ADD CONSTRAINT "PELANGGAN_PK" PRIMARY KEY ("ID_PELANGGAN")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "PANDAWA"."PELANGGAN" MODIFY ("EMAIL" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PELANGGAN" MODIFY ("NOMOR_TELEPON" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PELANGGAN" MODIFY ("ALAMAT" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PELANGGAN" MODIFY ("NAMA_DEPAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PELANGGAN" MODIFY ("ID_PELANGGAN" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table KARYAWAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."KARYAWAN" ADD CONSTRAINT "KARYAWAN_PK" PRIMARY KEY ("ID_KARYAWAN")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "PANDAWA"."KARYAWAN" MODIFY ("JABATAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KARYAWAN" MODIFY ("GAJI" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KARYAWAN" MODIFY ("NOMOR_TELEPON" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KARYAWAN" MODIFY ("ALAMAT" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KARYAWAN" MODIFY ("NAMA_BELAKANG" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KARYAWAN" MODIFY ("ID_KARYAWAN" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table KENDARAAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."KENDARAAN" ADD CONSTRAINT "KENDARAAN_PK" PRIMARY KEY ("ID_KENDARAAN")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "PANDAWA"."KENDARAAN" MODIFY ("FOTO_KENDARAAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KENDARAAN" MODIFY ("KATALOG_KENDARAAN_ID_KATEGORI" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KENDARAAN" MODIFY ("STATUS" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KENDARAAN" MODIFY ("HARGA" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KENDARAAN" MODIFY ("TIPE_KENDARAAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KENDARAAN" MODIFY ("NOPOL" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KENDARAAN" MODIFY ("NAMA_KENDARAAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KENDARAAN" MODIFY ("ID_KENDARAAN" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table PEMESANAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."PEMESANAN" ADD CONSTRAINT "PEMESANAN_ID_PELANGGAN_UN" UNIQUE ("PELANGGAN_ID_PELANGGAN")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "PANDAWA"."PEMESANAN" ADD CONSTRAINT "PEMESANAN_PK" PRIMARY KEY ("ID_PEMESANAN")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("KENDARAAN_ID_KENDARAAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("KARYAWAN_ID_KARYAWAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("PELANGGAN_ID_PELANGGAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("STATUS_PEMESANAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("TOTAL" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("TANGGAL_AKHIR_SEWA" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("TANGGA_MULAI_SEWA" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("TANGGAL_PEMESANAN" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."PEMESANAN" MODIFY ("ID_PEMESANAN" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table KATALOG_KENDARAAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."KATALOG_KENDARAAN" ADD CONSTRAINT "KATALOG_KENDARAAN_PK" PRIMARY KEY ("ID_KATEGORI")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1 BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "SYSTEM"  ENABLE;
  ALTER TABLE "PANDAWA"."KATALOG_KENDARAAN" MODIFY ("TIPE_KATEGORI" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KATALOG_KENDARAAN" MODIFY ("NAMA_KATEGORI" NOT NULL ENABLE);
  ALTER TABLE "PANDAWA"."KATALOG_KENDARAAN" MODIFY ("ID_KATEGORI" NOT NULL ENABLE);
--------------------------------------------------------
--  Ref Constraints for Table KENDARAAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."KENDARAAN" ADD CONSTRAINT "KENDARAAN_KATALOG_KENDARAAN_FK" FOREIGN KEY ("KATALOG_KENDARAAN_ID_KATEGORI")
	  REFERENCES "PANDAWA"."KATALOG_KENDARAAN" ("ID_KATEGORI") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table PEMBAYARAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."PEMBAYARAN" ADD CONSTRAINT "PEMBAYARAN_PEMESANAN_FK" FOREIGN KEY ("PEMESANAN_ID_PEMESANAN")
	  REFERENCES "PANDAWA"."PEMESANAN" ("ID_PEMESANAN") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table PEMESANAN
--------------------------------------------------------

  ALTER TABLE "PANDAWA"."PEMESANAN" ADD CONSTRAINT "PEMESANAN_KARYAWAN_FK" FOREIGN KEY ("KARYAWAN_ID_KARYAWAN")
	  REFERENCES "PANDAWA"."KARYAWAN" ("ID_KARYAWAN") ENABLE;
  ALTER TABLE "PANDAWA"."PEMESANAN" ADD CONSTRAINT "PEMESANAN_KENDARAAN_FK" FOREIGN KEY ("KENDARAAN_ID_KENDARAAN")
	  REFERENCES "PANDAWA"."KENDARAAN" ("ID_KENDARAAN") ENABLE;
  ALTER TABLE "PANDAWA"."PEMESANAN" ADD CONSTRAINT "PEMESANAN_PELANGGAN_FK" FOREIGN KEY ("PELANGGAN_ID_PELANGGAN")
	  REFERENCES "PANDAWA"."PELANGGAN" ("ID_PELANGGAN") ENABLE;
