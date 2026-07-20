const form = document.getElementById("deliveryForm");
const tableBody = document.querySelector("#exceptionTable tbody");

const totalCount = document.getElementById("totalCount");
const pendingCount = document.getElementById("pendingCount");
const resolvedCount = document.getElementById("resolvedCount");
const highCount = document.getElementById("highCount");

const filterPriority = document.getElementById("filterPriority");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    const deliveryId = document.getElementById("deliveryId").value;
    const customerName = document.getElementById("customerName").value;
    const issueType = document.getElementById("issueType").value;

    const priority = document.querySelector('input[name="priority"]:checked');

    const notes = document.querySelector("textarea").value;
    if (
        deliveryId === "" ||
        customerName === "" ||
        issueType === "Select Issue" ||
        !priority
) {
        alert("Please fill all required fields.");
        return;
}

    console.log(deliveryId);
    console.log(customerName);
    console.log(issueType);
    console.log(priority ? priority.value : "No Priority");
    console.log(notes);
    const row = document.createElement("tr");

    row.innerHTML = `
        <td>${deliveryId}</td>
        <td>${customerName}</td>
        <td>${issueType}</td>
        <td>${priority ? priority.value : "Not Selected"}</td>
        <td class="status">Pending</td>
<td>
    <button class="editBtn">Edit</button>
    <button class="deleteBtn">Delete</button>
    <button class="statusBtn">Resolve</button>
</td>
 `;


tableBody.appendChild(row);
updateDashboard();

// Edit Button
const editBtn = row.querySelector(".editBtn");

editBtn.addEventListener("click", function () {

    document.getElementById("deliveryId").value = deliveryId;
    document.getElementById("customerName").value = customerName;
    document.getElementById("issueType").value = issueType;

    document.querySelector(
        `input[name="priority"][value="${priority.value}"]`
    ).checked = true;

    document.querySelector("textarea").value = notes;

    row.remove();

});

// Delete Button
const deleteBtn = row.querySelector(".deleteBtn");

deleteBtn.addEventListener("click", function () {

    const confirmDelete = confirm("Are you sure you want to delete this record?");

    if (confirmDelete) {
        row.remove();
        updateDashboard();
    }

});
// Status Button
const statusBtn = row.querySelector(".statusBtn");

statusBtn.addEventListener("click", function () {

    const statusCell = row.querySelector(".status");

    if (statusCell.textContent === "Pending") {
        statusCell.textContent = "Resolved";
        statusCell.style.color = "green";
        statusBtn.textContent = "Pending";
    } else {
        statusCell.textContent = "Pending";
        statusCell.style.color = "red";
        statusBtn.textContent = "Resolve";
    }
    updateDashboard();

});


form.reset();



});

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup", function () {

    const filter = searchInput.value.toLowerCase();

    const rows = document.querySelectorAll("#exceptionTable tbody tr");

    rows.forEach(function (row) {

        const text = row.textContent.toLowerCase();

        if (text.includes(filter)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});

function updateDashboard() {

    const rows = document.querySelectorAll("#exceptionTable tbody tr");

    totalCount.textContent = rows.length;

    let pending = 0;
    let resolved = 0;
    let high = 0;

    rows.forEach(function (row) {

        const status = row.querySelector(".status").textContent.trim();
        const priority = row.cells[3].textContent.trim();

        if (status === "Pending") {
            pending++;
        }

        if (status === "Resolved") {
            resolved++;
        }

        if (priority === "High") {
            high++;
        }

    });

    pendingCount.textContent = pending;
    resolvedCount.textContent = resolved;
    highCount.textContent = high;

}

filterPriority.addEventListener("change", function () {

    const rows = tableBody.querySelectorAll("tr");

    rows.forEach(function (row) {

        const priority = row.cells[3].textContent.trim();
        const selected = filterPriority.value;

        if (selected === "All" || priority === selected) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }

    });

});
