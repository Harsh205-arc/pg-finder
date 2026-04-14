<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

require "db.php";

$pg_id = $_POST['pg_id'];

$upload_dir = "uploads/";

foreach ($_FILES['photos']['name'] as $key => $name) {

    $tmp_name = $_FILES['photos']['tmp_name'][$key];

    // create unique filename
    $filename = time() . "_" . basename($name);

    $file_path = $upload_dir . $filename;

    // move file to uploads folder
    if (move_uploaded_file($tmp_name, $file_path)) {

        $stmt = $pdo->prepare(
            "INSERT INTO pg_photos (pg_id, photo_url) VALUES (:pg_id, :photo_url)"
        );

        $stmt->execute([
            ':pg_id' => $pg_id,
            ':photo_url' => $file_path
        ]);
    }
}

echo "Images uploaded successfully";