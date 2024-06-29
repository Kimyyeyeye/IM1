// Function to show dashboard content
function showDashboard() {
    document.getElementById('main-content').style.display = 'block';
    document.getElementById('complaints').style.display = 'none';
    document.getElementById('reports').style.display = 'none';
    document.getElementById('pending-complaints').style.display = 'none';
    document.getElementById('resolved-complaints').style.display = 'none';
}

// Function to show complaints section
function showComplaint() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('complaints').style.display = 'block';
    document.getElementById('reports').style.display = 'none';
    document.getElementById('pending-complaints').style.display = 'none';
    document.getElementById('resolved-complaints').style.display = 'none';

    // Update counts when switching to Complaints section
    updateComplaintCounts();
}

// Function to show reports section
function showReport() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('complaints').style.display = 'none';
    document.getElementById('reports').style.display = 'block';
    document.getElementById('pending-complaints').style.display = 'none';
    document.getElementById('resolved-complaints').style.display = 'none';
}

// Function to update complaint counts
function updateComplaintCounts() {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];
    const resolvedCount = complaints.filter(complaint => complaint.resolved).length;
    const pendingCount = complaints.filter(complaint => !complaint.resolved).length;

    document.getElementById('resolved-count').textContent = `RESOLVED (${resolvedCount})`;
    document.getElementById('pending-count').textContent = `PENDING (${pendingCount})`;
    document.getElementById('total-count').textContent = `TOTAL COMPLAINTS (${complaints.length})`;
}

// Function to show pending complaints in the dashboard with inline resolve, delete, and reply buttons
function showPendingComplaints() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('complaints').style.display = 'none';
    document.getElementById('reports').style.display = 'none';
    document.getElementById('pending-complaints').style.display = 'block';
    document.getElementById('resolved-complaints').style.display = 'none';

    // Clear previous content
    document.getElementById('pending-list').innerHTML = '';

    // Get the pending complaints from localStorage (simulated data)
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];

    let pendingIndex = 1; // Start numbering from 1 for pending complaints

    // Display simulated pending complaints (you can modify this to suit actual data structure)
    complaints.forEach((complaint, index) => {
        if (!complaint.resolved) {
            // Create list item for complaint
            const listItem = document.createElement('div');
            listItem.classList.add('complaint-item');

            // Display name of complainant as clickable
            const nameLink = document.createElement('a');
            nameLink.textContent = `${pendingIndex}. ${complaint.name}`;
            nameLink.href = '#';
            nameLink.style.textDecoration = 'none'; // Remove underline
            nameLink.addEventListener('click', (event) => {
                event.preventDefault();
                showComplaintDetails(complaint);
            });
            listItem.appendChild(nameLink);

            // Create and append the "Resolve" button inline
            const resolveButton = document.createElement('button');
            resolveButton.textContent = 'Resolve';
            resolveButton.classList.add('inline-button');
            resolveButton.addEventListener('click', () => {
                resolveComplaint(index);
            });
            listItem.appendChild(resolveButton);

            // Create and append the "Delete" button inline
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('inline-button', 'delete');
            deleteButton.addEventListener('click', () => {
                deleteComplaint(index, false);
            });
            listItem.appendChild(deleteButton);

            // Create and append the "Reply" button inline
            const replyButton = document.createElement('button');
            replyButton.textContent = 'Reply';
            replyButton.classList.add('inline-button', 'reply');
            replyButton.addEventListener('click', () => {
                window.location.href = `mailto:${complaint.email}?subject=Reply to your complaint&body=Dear ${complaint.name},\n\nRegarding your complaint: ${complaint.complaint}\n\nBest regards,\nAdmin`;
            });
            listItem.appendChild(replyButton);

            // Append the complaint item to the pending list container
            document.getElementById('pending-list').appendChild(listItem);

            pendingIndex++; // Increment pending index
        }
    });
}

// Function to show resolved complaints
function showResolvedComplaints() {
    document.getElementById('main-content').style.display = 'none';
    document.getElementById('complaints').style.display = 'none';
    document.getElementById('reports').style.display = 'none';
    document.getElementById('pending-complaints').style.display = 'none';
    document.getElementById('resolved-complaints').style.display = 'block';

    // Clear previous content
    document.getElementById('resolved-list').innerHTML = '';

    // Get the resolved complaints from localStorage (simulated data)
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];

    let resolvedIndex = 1; // Start numbering from 1 for resolved complaints

    // Display simulated resolved complaints (you can modify this to suit actual data structure)
    complaints.forEach((complaint, index) => {
        if (complaint.resolved) {
            const listItem = document.createElement('div');
            listItem.classList.add('complaint-item');

            // Display name of complainant as clickable
            const nameLink = document.createElement('a');
            nameLink.textContent = `${resolvedIndex}. ${complaint.name}`;
            nameLink.href = '#';
            nameLink.style.textDecoration = 'none'; // Remove underline
            nameLink.addEventListener('click', (event) => {
                event.preventDefault();
                showComplaintDetails(complaint);
            });
            listItem.appendChild(nameLink);

            // Create and append the "Delete" button inline
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('inline-button', 'delete');
            deleteButton.addEventListener('click', () => {
                deleteComplaint(index, true);
            });
            listItem.appendChild(deleteButton);

            document.getElementById('resolved-list').appendChild(listItem);

            resolvedIndex++; // Increment resolved index
        }
    });
}

// Function to show all complaints (simulated function)
function showAllComplaints() {
    alert('Displaying all complaints details'); // Replace with actual implementation
}

// Function to show complaint details
function showComplaintDetails(complaint) {
    // Constructing the details message (using simulated data from the complaint form)
    const detailsMessage = `Complaint Details:\n
        Student Number: ${complaint.studentNumber}\n
        Email: ${complaint.email}\n
        Department: ${complaint.department}\n
        Message: ${complaint.complaint}`;
    
    // Displaying the details in an alert (you can customize this as needed)
    alert(detailsMessage);
}

// Function to resolve a pending complaint
function resolveComplaint(index) {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];

    // Mark the complaint as resolved
    complaints[index].resolved = true;
    localStorage.setItem('complaints', JSON.stringify(complaints));

    // Update UI: Move complaint from pending to resolved section
    showResolvedComplaints();
    showPendingComplaints(); // Refresh pending list (optional)
}

// Function to delete a complaint
function deleteComplaint(index, isResolved) {
    const complaints = JSON.parse(localStorage.getItem('complaints')) || [];

    // Remove the complaint from the list
    complaints.splice(index, 1);
    localStorage.setItem('complaints', JSON.stringify(complaints));

    // Refresh the appropriate list of complaints
    if (isResolved) {
        showResolvedComplaints();
    } else {
        showPendingComplaints();
    }

    // Update counts
    updateComplaintCounts();
}

// Initialize dashboard display on page load
showDashboard();
