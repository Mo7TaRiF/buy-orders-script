// ==UserScript==
// @name         Add Game Name to Google Docs
// @namespace    https://steam.tools/cards/
// @version      2.0
// @description  Adds a button beside each `[E]` link to send the game name to a Google Docs file.
// @match        https://steam.tools/cards/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

(function () {
    'use strict';

    const googleAppsScriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL'; // Replace with your Google Apps Script URL

    // Function to add buttons to table rows
    function addButtons() {
        document.querySelectorAll('table tbody tr').forEach((row) => {
            const gameNameElement = row.querySelector('span.game');
            const linkElement = row.querySelector('a[href^="https://steam.cards/index.php"]');

            // Avoid adding duplicate buttons
            if (gameNameElement && linkElement && !row.querySelector('.copy-game-name-button')) {
                // Create the button
                const button = document.createElement('button');
                button.textContent = 'Add Game Name to Docs';
                button.className = 'copy-game-name-button';
                button.style.marginLeft = '5px';
                button.style.cursor = 'pointer';
                button.style.padding = '2px 6px';
                button.style.fontSize = '12px';
                button.style.borderRadius = '3px';
                button.style.border = '1px solid #ccc';
                button.style.backgroundColor = '#f9f9f9';

                // Add click event to send the game name to Google Docs
                button.addEventListener('click', () => {
                    const gameName = gameNameElement.textContent.trim();

                    // Send POST request to Google Apps Script
                    GM_xmlhttpRequest({
                        method: 'POST',
                        url: googleAppsScriptUrl,
                        data: `gameName=${encodeURIComponent(gameName)}`,
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        onload: function (response) {
                            // Check if the response status is 200 (OK), but don't show any pop-up or alerts
                            if (response.status === 200) {
                                console.log("Game name added successfully!");
                            } else {
                                // Optionally, you can log to the console if something goes wrong, but no pop-up
                                console.error('Failed to add game name to Google Docs:', response.status, response.responseText);
                            }
                        },
                        onerror: function (error) {
                            // Optionally, log the error to the console (no alert)
                            console.error('Error occurred while adding game name:', error);
                        }
                    });
                });

                // Append the button next to the `[E]` link
                linkElement.parentNode.appendChild(button);
            }
        });
    }

    // Initial button addition
    addButtons();

    // Observe for table changes to reapply the buttons
    const observer = new MutationObserver(() => {
        addButtons();
    });
    observer.observe(document.body, { childList: true, subtree: true });
})();
