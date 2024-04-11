<?php

include "./partials/Connection.php";
try{
    $SQL = "UPDATE task
    SET title = '{$_POST['title']}', idUser = {$_POST['idUser']}
    WHERE id = {$_POST['id']} ;";

    $state = $conn->query($SQL);

echo json_encode($json);
} catch(PDOException $e){
    die($e->getMessage());
}