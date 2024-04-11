import {
  createTask,
  deleteTask,
  getAllTasks,
  getAllUsers,
  getTask,
  sendIdTask,
  update,
} from "./petitions.js";

const listUsers = document.getElementById("users");
const listTasks = document.getElementById("bodyTasks");
const input = document.getElementById("title");
const formSelect = document.getElementById("form-select");
const textArea = document.getElementById("description");
const form = document.getElementById("form-task");
let updateId;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(e.target);
  console.log(document.getElementById("saveBtn").value);
  if (document.getElementById("saveBtn").value == "update") {
    const formdata = new FormData();
    formdata.append("id", updateId);
    formdata.append("title", document.getElementById("title").value);
    formdata.append("idUser", document.getElementById("users").value);
    await update(formdata);
  } else {
    const resp = await createTask(data);
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const users = await getAllUsers();

  let templateUsers = "";
  for (const user of users) {
    templateUsers += `
      <option value="${user.id}">${user.fullname}</option>
    `;
  }

  listUsers.innerHTML = templateUsers;
  let templateTasks = "";
  const tasks = await getAllTasks();
  for (const task of tasks) {
    templateTasks += `
  <tr>
    <td>${task.id}</td>
    <td>${task.user}</td>
    <td>${task.description}</td>
    <td>${task.description}</td>

    <td>
      <button class="btn btn-secondary btn-sm updateBtn" id="${task.id}">
        <span>Update</span> <i class="nf nf-md-pencil" ></i>
      </button>
      <button class="btn btn-danger btn-sm deleteBtn" id="${task.id}">
        <span>Delete</span> <i class="nf nf-cod-trash"></i>
      </button>
    </td>
  </tr>
  `;
  }

  listTasks.innerHTML = templateTasks;

  const updateBtns = document.querySelectorAll(".updateBtn");
  updateBtns.forEach((updateButton) => {
    updateButton.addEventListener("click", async (e) => {
      console.log(updateButton.id);
      const updateId = updateButton.id;

      const resp2 = await sendIdTask(updateId);
      console.log(resp2);
      const task = await getTask();
      console.log(task.fullname);
    });
  });

  const deleteBtns = document.querySelectorAll(".deleteBtn");
  deleteBtns.forEach((button) => {
    button.addEventListener("click", async (e) => {
      console.log(button.id);
      const deleteId = button.id;

      try {
        const resp = await deleteTask(deleteId);
        console.log(resp);
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });

  const updateBtn = document.querySelectorAll(".updateBtn");
  updateBtn.forEach((button) => {
    button.addEventListener("click", async (e) => {
      console.log(button.id);
      updateId = button.id;
      const resp = await sendIdTask(updateId);
      console.log(resp);
      document.getElementById("form-title").innerText = "Update";
      document.getElementById("title").value = resp[0].title;
      document.getElementById("description").value = resp[0].title;
      document.getElementById("saveBtn").value = "update";
    });
  });
});
