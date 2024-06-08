
CREATE OR REPLACE VIEW V_PELANGGAN_MEMBERSHIP AS
SELECT 
    P.ID_PELANGGAN AS P_ID_PELANGGAN,
    P.NAMA_DEPAN || ' ' || P.NAMA_BELAKANG AS NAMA_PELANGGAN,
    P.ALAMAT,
    P.NOMOR_TELEPON,
    P.EMAIL,
    P.ID_MEMBERSHIP AS P_ID_MEMBERSHIP,
    P.FOTO_PELANGGAN,
    M.ID_MEMBERSHIP AS M_ID_MEMBERSHIP,
    M.JENIS_MEMBERSHIP,
    M.POINT_MEMEBERSHIP
FROM 
    PANDAWA.PELANGGAN P
INNER JOIN 
    PANDAWA.MEMBERSHIP M
ON 
    P.ID_MEMBERSHIP = M.ID_MEMBERSHIP;
    
    
    
SELECT *
FROM (
    SELECT *
    FROM V_KENDARAAN_KATALOG
    ORDER BY BANYAK_SEWA DESC
)
WHERE ROWNUM <= 3


SELECT *
FROM (
    SELECT *
    FROM V_PELANGGAN_MEMBERSHIP
    WHERE JENIS_MEMBERSHIP = 'Gold'
)
WHERE ROWNUM <= 4



