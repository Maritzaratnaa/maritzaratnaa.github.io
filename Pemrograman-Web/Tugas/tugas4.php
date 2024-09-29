/*
nama        : Maritza Ratnamaya N.
npm         : 140810230076
kelas       : B
deskripsi   : Membuat web form input data menggunakan PHP
*/


<?php
    $koneksi = mysqli_connect("localhost:3306", "root", "", "tugas4");
    if(isset($_POST['simpan'])){
        $npm = mysqli_real_escape_string($koneksi, $_POST['npm']);
        $nama = mysqli_real_escape_string($koneksi, $_POST['nama']);
        $alamat = mysqli_real_escape_string($koneksi, $_POST['alamat']);
        $tempat_lahir = mysqli_real_escape_string($koneksi, $_POST['tempat_lahir']);
        $tanggal_lahir = mysqli_real_escape_string($koneksi, $_POST['tanggal_lahir']);
        $jenis_kelamin = mysqli_real_escape_string($koneksi, $_POST['jenis_kelamin']);
        $hobi = mysqli_real_escape_string($koneksi, $_POST['hobi']);

        $simpan = mysqli_query($koneksi, "INSERT INTO input VALUES ('$npm', '$nama', '$alamat', '$tempat_lahir', '$tanggal_lahir', '$jenis_kelamin', '$hobi')");

        if($simpan){
            $data_baru = $npm;
            echo "<script>alert('Data berhasil disimpan!');</script>";
        } else{
            echo "<script>alert('Data gagal disimpan!');</script>";
        }

    }
 ?>
 <html lang="en">
 <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Form</title>
 </head>
 <body>
    <center>
    <h1>Form Input Data Mahasiswa</h1>
    <form action="" method="post">
        <table>
            <tr>
                <td>NPM</td>
                <td>
                    <input type="text" placeholder="Masukkan NPM" name="npm" required>
                </td>
            </tr>
            <tr>
                <td>Nama</td>
                <td>
                    <input type="text" placeholder="Masukkan nama" name="nama" required>
                </td>
            </tr>
            <tr>
                <td>Alamat</td>
                <td>
                    <textarea name="alamat" placeholder="Masukkan alamat" required></textarea>
                </td>
            </tr>
            <tr>
                <td>Tempat Lahir</td>
                <td>
                    <input type="text" name="tempat_lahir" placeholder="Masukkan tempat lahir" required>
                </td>
            </tr>
            <tr>
                <td>Tanggal Lahir</td>
                <td>
                    <input type="date" placeholder="Masukkan tanggal lahir" name="tanggal_lahir" required>
                </td>
            </tr>
            <tr>
                <td>Jenis Kelamin</td>
                <td>
                    <input type="text" name="jenis_kelamin" placeholder="Masukkan jenis kelamin" required>
                </td>
            </tr>
            <tr>
                <td>Hobi</td>
                <td>
                    <input type="text" name="hobi" placeholder="Masukkan hobi" required>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>
                    <input type="submit" name="simpan" value="Simpan Data">
                </td>
            </tr>
        </table>
    </form>
    
    <br>

    <?php if(isset($data_baru)):?>
        <?php
            $input = mysqli_query($koneksi, "SELECT * FROM input WHERE npm = '$data_baru'");
            $cetak = mysqli_fetch_array($input);

            if($cetak):
        ?>
    <h1>Data Hasil Input</h1>
    <table>
        <tr>
            <td>NPM</td>
            <td>Nama</td>
            <td>Alamat</td>
            <td>Tempat Lahir</td>
            <td>Tanggal Lahir</td>
            <td>Jenis Kelamin</td>
            <td>Hobi</td>
        </tr>
                <tr>
                    <td><?= $cetak['npm']; ?></td>
                    <td style="text-transform: uppercase;"><?= $cetak['nama']; ?></td>
                    <td style="text-transform: uppercase;"><?= $cetak['alamat']; ?></td>
                    <td><?= $cetak['tempat_lahir']; ?></td>
                    <td><?= $cetak['tanggal_lahir']; ?></td>
                    <td><?= $cetak['jenis_kelamin']; ?></td>
                    <td><?= $cetak['hobi']; ?></td>
                </tr>
        </table>
        <?php else: ?>
            <p>Data tidak ditemukan!</p>
        <?php endif; ?>
        <?php endif; ?>
    </center>
 </body>
 </html>