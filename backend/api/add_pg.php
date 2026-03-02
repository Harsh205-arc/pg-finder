<?php
header("Content-Type: application/json");
include("../config/db.php");

$name = $_POST['name'];
$rent = $_POST['rent'];
$deposit = $_POST['deposit'];
$gender = $_POST['gender'];
$description = $_POST['description'];
$distance = $_POST['distance'] ?? 0;
try {
    $stmt = $pdo->prepare(
        "INSERT INTO pgs (name, rent, deposit, gender, description, distance)
         VALUES (?, ?, ?, ?, ?, ?)"
    );

    $stmt->execute([$name, $rent, $deposit, $gender, $description, $distance]);

    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}