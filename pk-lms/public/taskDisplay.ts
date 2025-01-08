import mongoose from "mongoose";

interface Task {
    title: string;
    description: string;
    staffId: mongoose.Schema.Types.ObjectId; // Reference to a Staff document
    dueDate: Date;
}

document.addEventListener('DOMContentLoaded', async () => {
    const taskTableBody = document.querySelector('#taskTable tbody') as HTMLTableSectionElement;

    try {
        const response = await fetch('/task-list');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const tasks: Task[] = await response.json();

        tasks.forEach(task => {
            const row = document.createElement('tr');

            // Create and append table cells
            const titleCell = document.createElement('td');
            titleCell.textContent = task.title;
            row.appendChild(titleCell);

            const descriptionCell = document.createElement('td');
            descriptionCell.textContent = task.description;
            row.appendChild(descriptionCell);

            const staffIdCell = document.createElement('td');
            staffIdCell.textContent = task.staffId.toString();
            row.appendChild(staffIdCell);

            const dueDateCell = document.createElement('td');
            dueDateCell.textContent = task.dueDate.toString();
            row.appendChild(dueDateCell);

            // Append the row to the table body
            taskTableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Failed to fetch task data:', err);
    }

});

// Add the CSV export functionality
document.getElementById('exportTableToExcel')?.addEventListener('click', () => {
    const table = document.getElementById('taskTable') as HTMLTableElement;

    if (table) {
        const rows = table.querySelectorAll('tr');
        let csvContent = '';

        rows.forEach(row => {
            const cells = row.querySelectorAll('th, td');
            const rowData = Array.from(cells).map(cell => cell.textContent?.replace(/,/g, '') || '').join(',');
            csvContent += rowData + '\n';
        });

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('href', url);
        a.setAttribute('download', 'tasks.csv');
        a.click();
        window.URL.revokeObjectURL(url);
    }
});