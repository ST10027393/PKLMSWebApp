interface Staff {
    name: string;
    surname: string;
    email: string;
    role: string;
    securityLevel: string; // Changed to match the form field
}

document.addEventListener('DOMContentLoaded', async () => {
    const staffTableBody = document.querySelector('#staffTable tbody') as HTMLTableSectionElement;

    try {
        const response = await fetch('/staff-data');
        if (!response.ok) throw new Error('Network response was not ok');
        
        const staffs: Staff[] = await response.json();

        staffs.forEach(staff => {
            const row = document.createElement('tr');

            // Create and append table cells
            const nameCell = document.createElement('td');
            nameCell.textContent = staff.name;
            row.appendChild(nameCell);

            const surnameCell = document.createElement('td');
            surnameCell.textContent = staff.surname;
            row.appendChild(surnameCell);

            const emailCell = document.createElement('td');
            emailCell.textContent = staff.email;
            row.appendChild(emailCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = staff.role;
            row.appendChild(roleCell);

            const securityLevelCell = document.createElement('td');
            securityLevelCell.textContent = staff.securityLevel;
            row.appendChild(securityLevelCell);

            // Append the row to the table body
            staffTableBody.appendChild(row);
        });
    } catch (err) {
        console.error('Failed to fetch staff data:', err);
    }

});

// Add the CSV export functionality
document.getElementById('exportTableToExcel')?.addEventListener('click', () => {
    const table = document.getElementById('staffTable') as HTMLTableElement;

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
        a.setAttribute('download', 'staff.csv');
        a.click();
        window.URL.revokeObjectURL(url);
    }
});