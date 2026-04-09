<?php
header("Content-Type: application/json");
include("../config/db.php");

$name        = isset($_POST['name'])        ? trim($_POST['name'])              : '';
$rent        = isset($_POST['rent'])        ? intval($_POST['rent'])            : 0;
$deposit     = isset($_POST['deposit'])     ? intval($_POST['deposit'])         : 0;
$gender      = isset($_POST['gender'])      ? trim($_POST['gender'])            : '';
$description = isset($_POST['description']) ? trim($_POST['description'])       : '';
$distance    = isset($_POST['distance'])    ? floatval($_POST['distance'])      : 0;

$allowedGenders = ['boys', 'girls', 'unisex'];

if (empty($name) || mb_strlen($name, 'UTF-8') > 100) {
    http_response_code(400);
    echo json_encode(["error" => "Name is required and must be at most 100 characters"]);
    exit;
}

if ($rent <= 0) {
    http_response_code(400);
    echo json_encode(["error" => "Rent must be a positive number"]);
    exit;
}

if ($deposit < 0) {
    http_response_code(400);
    echo json_encode(["error" => "Deposit cannot be negative"]);
    exit;
}

if (!in_array($gender, $allowedGenders, true)) {
    http_response_code(400);
    echo json_encode(["error" => "Gender must be boys, girls, or unisex"]);
    exit;
}

if (empty($description) || mb_strlen($description, 'UTF-8') > 2000) {
    http_response_code(400);
    echo json_encode(["error" => "Description is required and must be at most 2000 characters"]);
    exit;
}

if ($distance < 0) {
    http_response_code(400);
    echo json_encode(["error" => "Distance cannot be negative"]);
    exit;
}

try {
    $stmt = $pdo->prepare(
        "INSERT INTO pgs (name, rent, deposit, gender, description, distance)
         VALUES (?, ?, ?, ?, ?, ?)"
    );

    $stmt->execute([$name, $rent, $deposit, $gender, $description, $distance]);

    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to add PG"]);
}