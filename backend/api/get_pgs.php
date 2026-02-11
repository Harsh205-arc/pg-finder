<?php

ini_set ('display_errors',1);
ini_set('display_startup_errors',1);
error_reporting(E_ALL);

header ("Content-Type:application/json");

require __DIR__ ."/../config/db.php";

try{
    $stmt = $pdo ->prepare(
        "SELECT id, name, rent, deposit, gender, description 
         FROM pgs;
         WHERE verified =1
         ORDER by distance ASC"
    );

$stmt->execute();
$pgs= $stmt->fetchAll();

echo json_encode([
    "status"=>"success",
    "data"=> $pgs
]);
}

catch(Exception $e){
    http_response_code(500);

    echo json_encode([
    "status"=> "Failed",
    "message"=>"failed to fetch PGs"
    ]);
}