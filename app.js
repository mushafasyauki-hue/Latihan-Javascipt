// Ambil elemen dari HTML
const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const warning = document.getElementById("warning");
const taskList = document.getElementById("taskList");
const inputBox = document.querySelector(".input-box");

const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");
const pendingCount = document.getElementById("pendingCount");

// Rekap statistik: dihitung ulang setiap ada perubahan
function updateStats() {
  const total = taskList.querySelectorAll("li").length;
  const done = taskList.querySelectorAll("li.completed").length;

  totalCount.textContent = total;
  doneCount.textContent = done;
  pendingCount.textContent = total - done;
}

// Tampilkan / sembunyikan pesan peringatan
function showWarning(show) {
  warning.hidden = !show;
  inputBox.classList.toggle("error", show);
}

//  Tandai tugas selesai / belum selesai
function toggleComplete(li, checkbox) {
  li.classList.toggle("completed", checkbox.checked);
  updateStats();
}

//  Tambah tugas baru
function addTask() {
  const text = taskInput.value.trim();

  // . Validasi input kosong
  if (text === "") {
    showWarning(true);
    taskInput.focus();
    return;
  }
  showWarning(false);

  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "×";
  deleteBtn.setAttribute("aria-label", "Hapus tugas");

  // Centang checkbox -> tandai selesai
  checkbox.addEventListener("change", () => toggleComplete(li, checkbox));

  // Klik teks tugas -> ikut mencentang
  span.addEventListener("click", () => {
    checkbox.checked = !checkbox.checked;
    toggleComplete(li, checkbox);
  });

  // 4. Hapus tugas dengan remove()
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateStats();
  });

  li.append(checkbox, span, deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
  taskInput.focus();
  updateStats();
}

// Klik tombol "tambah"
addBtn.addEventListener("click", addTask);

// Tekan Enter di kolom input
taskInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});

// Sembunyikan peringatan saat mulai mengetik lagi
taskInput.addEventListener("input", () => showWarning(false));

