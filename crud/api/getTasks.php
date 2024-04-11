<?php

include "./partials/Connection.php";
try{
    $SQL = "SELECT t.id, t.title, u.firstname 
    FROM task t inner join user u on (u.id=t.idUser) order by t.id DESC;";

    $state = $conn->query($SQL);

    $json= [];

    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        $json[] = [
            "id" => $row['id'],
            "user"=> $row['firstname'],
            "description" => $row['title']
          ];
    }

echo json_encode($json);
} catch(PDOException $e){
    die($e->getMessage());
}