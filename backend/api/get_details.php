<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Content-Type: application/json");

include("../config/db.php");

$id = isset($_GET['id']) ? intval($_GET['id']) : 0;

if ($id <= 0) {
    echo json_encode(["error" => "Invalid ID"]);
    exit;
}

try {
    $stmt = $pdo->prepare("SELECT * FROM pgs WHERE id = ?");
    $stmt->execute([$id]);
    $pg = $stmt->fetch();

    echo json_encode(["data" => $pg]);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}