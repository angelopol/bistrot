// Get the modal
var modal = document.getElementById("myModal");
modal.style.display = "none"; // Set display to none on page load

// Get the button that opens the modal
var btn = document.getElementById("new-request-button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function(event) {
  event.stopPropagation();
  modal.style.display = "none";
};

// Get the "Ver registro" button
var viewRegistryButton = document.getElementById("view-registry-button");

// Get the registry panel
var registryPanel = document.getElementById("registry-panel");
registryPanel.style.display = "none"; // Set display to none on page load

// When the user clicks the "Ver registro" button, open the registry panel
viewRegistryButton.onclick = function() {
  registryPanel.style.display = "block";
  displayAcceptedRequests();
}

// Function to display accepted requests
function displayAcceptedRequests() {
  var acceptedRequestsList = document.getElementById("accepted-requests-list");
  acceptedRequestsList.innerHTML = ""; // Clear the list
  absenceRequests.forEach(function(request) {
    if (request.status === "Aceptado" || request.status === "Rechazado") {
      displayAcceptedRequest(request);
    }
  });
  registryPanel.style.display = "block"; // Show the registry panel
}

function displayAcceptedRequest(request) {
  var acceptedRequestsList = document.getElementById("accepted-requests-list");
  var requestHTML = `
    <li>
      <p><strong>Motivo de ausencia:</strong> ${request.reason}</p>
      <p><strong>Fecha de inicio:</strong> ${request.startDate}</p>
      <p><strong>Fecha de fin:</strong> ${request.endDate}</p>
      <p><strong>Estado:</strong> ${request.status}</p>
    </li>
  `;
  acceptedRequestsList.innerHTML += requestHTML;
}
// When the user clicks anywhere outside of the registry panel, close it
registryPanel.addEventListener("click", function(event) {
  if (event.target === registryPanel) {
    registryPanel.style.display = "none";
  }
});

// Get the accept/reject modal
var acceptRejectModal = document.getElementById("accept-reject-modal");
acceptRejectModal.style.display = "none"; // Set display to none on page load

// Get the button that opens the accept/reject modal
var acceptButton = document.getElementById("accept-button");

// Get the <span> element that closes the accept/reject modal
var acceptRejectSpan = document.getElementsByClassName("close")[1];

// When the user clicks the button, open the accept/reject modal
acceptButton.onclick = function() {
  acceptRejectModal.style.display = "block";
  populateRequestsList();
}

// When the user clicks on <span> (x), close the accept/reject modal
acceptRejectSpan.onclick = function(event) {
  event.stopPropagation();
  acceptRejectModal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
modal.addEventListener("click", function(event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// When the user clicks anywhere outside of the accept/reject modal, close it
acceptRejectModal.addEventListener("click", function(event) {
  if (event.target === acceptRejectModal) {
    acceptRejectModal.style.display = "none";
  }
});

// Creamos un objeto que represente una solicitud de ausencia
function AbsenceRequest(reason, startDate, endDate, status) {
  this.reason = reason;
  this.startDate = startDate;
  this.endDate = endDate;
  this.status = status;
}

// Creamos un array para almacenar todas las solicitudes
var absenceRequests = [];

// Función para agregar una nueva solicitud al array
function addAbsenceRequest(reason, startDate, endDate) {
  var newRequest = new AbsenceRequest(reason, startDate, endDate, "En Proceso");
  absenceRequests.push(newRequest);
  displayPermissionsInProcess(); // Call this function to update the list
  modal.style.display = "none"; // Close the modal after submitting the form
}

function displayPermissionsInProcess() {
  var permissionsList = document.getElementById("permissions-list");
  permissionsList.innerHTML = ""; // Clear the list
  absenceRequests.forEach(function(permission) {
    if (permission.status === "En Proceso") {
      displayPermissionInProcess(permission);
    }
  });
}

function displayPermissionInProcess(permission) {
  var permissionsList = document.getElementById("permissions-list");
  var permissionHTML = `
    <li>
      <p><strong>Motivo de ausencia:</strong> ${permission.reason}</p>
      <p><strong>Fecha de inicio:</strong> ${permission.startDate}</p>
      <p><strong>Fecha de fin:</strong> ${permission.endDate}</p>
      <p><strong>Estado:</strong> En Proceso </p>
    </li>
  `;
  permissionsList.innerHTML += permissionHTML;
}

// When the user submits the absence request form
document.getElementById("submit-button").addEventListener("click", function(event) {
  event.preventDefault();
  var reason = document.getElementById("reason").value;
  var startDate = document.getElementById("start-date").value;
  var endDate = document.getElementById("end-date").value;
  
  var startDateObj = new Date(startDate);
  var endDateObj = new Date(endDate);

  if (startDateObj > endDateObj) {
    alert("La fecha de inicio no puede ser posterior a la fecha de fin");
    return;
  }

  addAbsenceRequest(reason, startDate, endDate);
  modal.style.display = "none"; // Close the modal after submitting the form
});

function populateRequestsList() {
  var requestsList = document.getElementById("requests-list");
  requestsList.innerHTML = ""; // Clear the list
  absenceRequests.forEach(function(request) {
    var requestHTML = `
      <li>
        <p><strong>Motivo de ausencia:</strong> ${request.reason}</p>
        <p><strong>Fecha de inicio:</strong> ${request.startDate}</p>
        <p><strong>Fecha de fin:</strong> ${request.endDate}</p>
        <button class="button" onclick="acceptRequest('${request.reason}', '${request.startDate}', '${request.endDate}')">Aceptar</button>
        <button class="button" onclick="rejectRequest('${request.reason}', '${request.startDate}', '${request.endDate}')">Rechazar</button>
      </li>
    `;
    requestsList.innerHTML += requestHTML;
  });
}

function acceptRequest(reason, startDate, endDate) {
  absenceRequests.forEach(function(request) {
    if (request.reason === reason && request.startDate === startDate && request.endDate === endDate) {
      request.status = "Aceptado";
    }
  });
  displayPermissionsInProcess();
  displayAcceptedRequests(); // Update the accepted requests list
  // You can also send the updated request data to a backend server to store it
  removeRequestFromList(reason, startDate, endDate);
}

function rejectRequest(reason, startDate, endDate) {
  absenceRequests.forEach(function(request) {
    if (request.reason === reason && request.startDate === startDate && request.endDate === endDate) {
      request.status = "Rechazado";
    }
  });
  displayPermissionsInProcess();
  displayAcceptedRequests(); // Update the accepted requests list
  removeRequestFromList(reason, startDate, endDate);
}

function removeRequestFromList(reason, startDate, endDate) {
  var requestsList = document.getElementById("requests-list");
  var requests = requestsList.children;
  for (var i = 0; i < requests.length; i++) {
    var request = requests[i];
    var requestReason = request.children[0].textContent.replace("Motivo de ausencia: ", "");
    var requestStartDate = request.children[1].textContent.replace("Fecha de inicio: ", "");
    var requestEndDate = request.children[2].textContent.replace("Fecha de fin: ", "");
    if (requestReason === reason && requestStartDate === startDate && requestEndDate === endDate) {
      requestsList.removeChild(request);
      break;
    }
  }
}