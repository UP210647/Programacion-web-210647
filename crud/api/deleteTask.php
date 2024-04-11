<?php
include "./partials/Connection.php";

try {
    $taskId = intval($_POST['taskId']);
    $SQL = "DELETE FROM task WHERE id = :taskId";
    $state = $conn->prepare($SQL);
    $state->bindParam(':taskId', $taskId, PDO::PARAM_INT);
    $state->execute();

    $response = array('success' => true, 'message' => 'La tarea se eliminó correctamente');
    echo json_encode($response);
} catch (PDOException $e) {
    $response = array('success' => false, 'message' => $e->getMessage());
    echo json_encode($response);
}