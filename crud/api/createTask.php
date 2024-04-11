<?php

include "./partials/Connection.php";
try{
    $SQL = "INSERT INTO task (title,idUser)
    VALUES ('{$_POST['title']}',{$_POST['users']})";

    $state = $conn->prepare($SQL);

    $state->execute();

    echo "Todo bien";
} catch(PDOException $e){
    die($e->getMessage());
}


