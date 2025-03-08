// ==UserScript==
// @name         Highlight Rows with Specific Games
// @namespace    http://tampermonkey.net/
// @version      1.99
// @description  Highlight rows based on specific game names on steam.tools/cards, even after sorting or data changes
// @match        https://steam.tools/cards/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let lowGamesNames = [];
    let highGamesNames = [];

    const style = document.createElement('style');
    style.textContent = `
        .highlight-low { background-color: #87cefa !important; } /* Blue for low games */
        .highlight-high { background-color: #ffeb3b !important; } /* Yellow for high games */
    `;
    document.head.appendChild(style);

    // Function to clean and normalize game names
    function cleanGameName(name) {
        return name.trim().toLowerCase().replace(/[^a-z0-9]/g, ''); // إزالة المسافات والأحرف الخاصة
    }

    // Function to highlight rows based on game names
    function highlightRows() {
        document.querySelectorAll('table tbody tr').forEach(row => {
            const cells = row.querySelectorAll('td');
            if (cells.length > 0) {
                const gameNameElement = cells[0].querySelector('.game');
                if (gameNameElement) {
                    const gameName = cleanGameName(gameNameElement.textContent);

                    const isLowGame = lowGamesNames.includes(gameName);
                    const isHighGame = highGamesNames.includes(gameName);

                    row.classList.remove('highlight-low', 'highlight-high');
                    if (isLowGame) {
                        row.classList.add('highlight-low');
                    } else if (isHighGame) {
                        row.classList.add('highlight-high');
                    }
                }
            }
        });
    }

    // Function to fetch game names from Google Docs
    async function fetchGameNames(docId) {
        const url = `https://docs.google.com/document/d/${docId}/export?format=txt`;
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Failed to fetch game names from document: ${docId}`);
            const text = await response.text();
            return text.split('\n').map(name => cleanGameName(name)).filter(name => name);
        } catch (error) {
            console.error(`Error fetching game names from document ${docId}:`, error);
            return [];
        }
    }

    // Fetch game names from both documents and update the arrays
    async function initializeGameNames() {
        const [lowNames, highNames] = await Promise.all([
            fetchGameNames('1FAPMOu0dGSAWO9Y8oZ06oSN0oWnvFtpBeFci-yLbAdo'),
            fetchGameNames('1fgt2EPiLqynPiWSAsgjbR3-hJZgZpgqXKG85wdaJNZ4')
        ]);

        lowGamesNames = lowNames;
        highGamesNames = highNames;

        // Highlight rows after fetching the names
        highlightRows();
    }

    // Initialize the game names and start observing changes
    initializeGameNames();

    // Observe changes in the DOM to re-highlight rows when the table updates
    const observer = new MutationObserver(highlightRows);
    observer.observe(document.body, { childList: true, subtree: true });
})();
