<?php

header("Content-Type: application/json");

require __DIR__ . "/../config/db.php";

try {
    $stmt = $pdo->prepare(
        "SELECT id, name, rent, deposit, gender, description, distance, food
         FROM pgs
         WHERE verified = 1
         ORDER BY distance ASC"
    );

    $stmt->execute();
    $pgs = $stmt->fetchAll();

    echo json_encode([
        "status" => "success",
        "data"   => $pgs
    ]);
} catch (Exception $e) {
    http_response_code(500);

    echo json_encode([
        "status"  => "error",
        "message" => "Failed to fetch PGs"
    ]);
}