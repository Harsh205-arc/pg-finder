<?php
header("Content-Type: application/json");
require "../config/db.php";

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$password = $_POST['password'];

$hashed = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare(
        "INSERT INTO owners (name, phone, email, password_hash)
         VALUES (?, ?, ?, ?)"
    );

    $stmt->execute([$name, $phone, $email, $hashed]);

    $user_id = $pdo->lastInsertId();

    echo json_encode([
        "status" => "success",
        "user_id" => $user_id
    ]);

} catch (PDOException $e) {
    echo json_encode([
        "status" => "error",
        "message" => "Email already exists"
    ]);
}