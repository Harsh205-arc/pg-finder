<?php
header("Content-Type: application/json");
require "../config/db.php";

$owner_id = $_GET['owner_id'] ?? 0;

$stmt = $pdo->prepare(
    "SELECT id, name, rent, deposit 
     FROM pgs 
     WHERE owner_id = ?"
);

$stmt->execute([$owner_id]);
$pgs = $stmt->fetchAll();

echo json_encode([
    "status" => "success",
    "data" => $pgs
]);