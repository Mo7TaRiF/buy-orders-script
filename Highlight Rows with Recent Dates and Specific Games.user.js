// ==UserScript==
// @name         Highlight Rows with Date Range and Specific Games
// @namespace    http://tampermonkey.net/
// @version      1.96
// @description  Highlight rows based on a date range or specific game names on steam.tools/cards, even after sorting or data changes
// @match        https://steam.tools/cards/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const startDate = new Date('2024-10-23');
    const endDate = new Date('2023-05-15');
    let gameNames = [];

    const style = document.createElement('style');
    style.textContent = `
        .highlight-date { background-color: #ffeb3b !important; }
        .highlight-game { background-color: #87cefa !important; }
        .highlight-both { background: linear-gradient(90deg, #ffeb3b 50%, #87cefa 50%) !important; }
    `;
    document.head.appendChild(style);

    function parseDate(dateStr) {
        dateStr = dateStr.replace(/(\d+)(st|nd|rd|th)/, '$1');
        return new Date(dateStr);
    }

    function isDateInRange(date) {
        return date >= endDate && date <= startDate;
    }

    function highlightRows() {
        document.querySelectorAll('table tbody tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const firstCell = cells[0].textContent.trim();
                const lastCell = cells[cells.length - 1];
                const cellDate = parseDate(lastCell.textContent.trim());

                const isInRange = isDateInRange(cellDate);
                const isSpecificGame = gameNames.includes(firstCell);

                row.classList.remove('highlight-date', 'highlight-game', 'highlight-both');
                if (isInRange && isSpecificGame) {
                    row.classList.add('highlight-both');
                } else if (isInRange) {
                    row.classList.add('highlight-date');
                } else if (isSpecificGame) {
                    row.classList.add('highlight-game');
                }
            }
        });
    }

    async function fetchGameNames() {
        const docId = '1FAPMOu0dGSAWO9Y8oZ06oSN0oWnvFtpBeFci-yLbAdo';
        const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Failed to fetch game names');
            const text = await response.text();
            gameNames = text.split('\n').map(name => name.trim()).filter(name => name);
            highlightRows(); // Re-run after fetching the names
        } catch (error) {
            console.error('Error fetching game names:', error);
        }
    }

    fetchGameNames();

    const observer = new MutationObserver(highlightRows);
    observer.observe(document.body, { childList: true, subtree: true });
})();
