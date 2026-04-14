<?php
header("Content-Type: application/json");
require "../config/db.php";

// ✅ Validate owner_id
if (!isset($_POST['owner_id']) || empty($_POST['owner_id'])) {
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$owner_id = intval($_POST['owner_id']);
$name = $_POST['name'] ?? '';
$rent = intval($_POST['rent'] ?? 0);
$deposit = intval($_POST['deposit'] ?? 0);
$gender = $_POST['gender'] ?? '';
$description = $_POST['description'] ?? '';
$distance = floatval($_POST['distance'] ?? 0);

try {
    $stmt = $pdo->prepare(
        "INSERT INTO pgs 
        (name, rent, deposit, gender, description, distance, owner_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->execute([
        $name, 
        $rent, 
        $deposit, 
        $gender, 
        $description, 
        $distance, 
        $owner_id
    ]);

    echo json_encode([
        "success" => true,
        "pg_id" => $pdo->lastInsertId()
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "error" => "Failed to add PG"
    ]);
}