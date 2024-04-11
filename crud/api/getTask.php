<?php 

include "./partials/Connection.php";
try{
    $taskId = $_POST['taskId'];
    $SQL = "SELECT t.id, t.title, u.firstname,u.lastname
            FROM task t inner join user u on (u.id=t.idUser)
            where t.id = $taskId
            order by t.id DESC;";
    $state = $conn->query($SQL);
    $json= [];
    
    while($row = $state->fetch(PDO::FETCH_ASSOC)){
        $json[] = [
            "id" => $row['id'],
            "title" => $row['title'],
            "fullname" => "{$row['firstname']} {$row['lastname']}"
        ];
}

echo json_encode($json);

}catch(PDOException $e){
    die($e->getMessage());
}

