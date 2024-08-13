interface Student {
    name: string;
    surname: string;
    grade: number;
    compLevel: number;
}

document.addEventListener('DOMContentLoaded', async () => {
    const studentTableBody = document.querySelector('#studentTable tbody') as HTMLTableSectionElement;

    try {
        const response = await fetch('/student-list');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const students: Student[] = await response.json();

        students.forEach(student => {
            const row = document.createElement('tr');

            // Create and append table cells
            const nameCell = document.createElement('td');
            nameCell.textContent = student.name;
            row.appendChild(nameCell);

            const surnameCell = document.createElement('td');
            surnameCell.textContent = student.surname;
            row.appendChild(surnameCell);

            const gradeCell = document.createElement('td');
            gradeCell.textContent = student.grade.toString();
            row.appendChild(gradeCell);

            const compLevelCell = document.createElement('td');
            compLevelCell.textContent = student.compLevel.toString();
            row.appendChild(compLevelCell);

            // Append the row to the table body
            studentTableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Failed to fetch student data:', err);
    }

});

// Add the CSV export functionality
document.getElementById('exportTableToExcel')?.addEventListener('click', () => {
    const table = document.getElementById('studentTable') as HTMLTableElement;

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
        a.setAttribute('download', 'students.csv');
        a.click();
        window.URL.revokeObjectURL(url);
    }
});