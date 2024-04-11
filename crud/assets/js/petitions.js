export async function getAllUsers(){
    const resp = await fetch("/crud/api/getUsers.php");
    const json = await resp.json();

    return json;
}

export async function getAllTasks(){
    const resp = await fetch("/crud/api/getTasks.php");
    const json = await resp.json();

    return json;
}

export async function getTask(){
    const resp = await fetch("/crud/api/getTask.php");
    const json = await resp.json();

    return json;
}

export async function createTask(data) {
   const resp = await fetch('/crud/api/createTask.php', {
        method: 'POST',
        body: data
    });
}

export async function deleteTask(taskId) {
        const resp = await fetch('/crud/api/deleteTask.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `taskId=${taskId}`
        });
        return await resp.json();
}


export async function sendIdTask(taskId) {
    const resp = await fetch('/crud/api/getTask.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `taskId=${taskId}`
    });
    return await resp.json();
}

export async function update(fromdata) {
    const resp = await fetch('/crud/api/updateTask.php', {
        method: 'POST',
        body: fromdata
    });
}
