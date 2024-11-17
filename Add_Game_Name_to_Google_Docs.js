// ==UserScript==
// @name         Add Game Name to Google Docs
// @namespace    http://tampermonkey.net/
// @version      3.0
// @description  Adds a button to send game names from Steam Tools Cards to a Google Docs file
// @match        https://steam.tools/cards/
// @grant        GM_xmlhttpRequest
// @connect      script.google.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// ==/UserScript==

(function () {
    'use strict';

    const apiUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL'; // Replace with your Google Apps Script URL

    function createButton(gameName) {
        const button = $('<button>')
            .text('Add Game Name to Docs')
            .css({
                marginLeft: '10px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                padding: '5px 10px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '12px',
            })
            .on('click', function () {
                const $this = $(this);
                $this.prop('disabled', true); // Disable the button
                $this.text('Adding...');

                // Send the request
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: `${apiUrl}?gameName=${encodeURIComponent(gameName)}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    onload: function (response) {
                        if (response.status === 200) {
                            $this.css('backgroundColor', '#28a745'); // Set button color to green
                            $this.text('Added'); // Update button text
                        } else {
                            console.error('Failed to add game name:', response);
                            $this.css('backgroundColor', '#dc3545'); // Set button color to red
                            $this.text('Failed');
                        }
                    },
                    onerror: function (error) {
                        console.error('Error occurred while adding game name:', error);
                        $this.css('backgroundColor', '#dc3545'); // Set button color to red
                        $this.text('Failed');
                    },
                });
            });

        return button;
    }

    function addButtonsToRows() {
        $('table tbody tr').each(function () {
            const $row = $(this);
            const gameName = $row.find('.game').text().trim();
            const $eLink = $row.find('a[href*="steam.cards"][target="_blank"]');

            if (gameName && $eLink.length > 0 && $row.find('button').length === 0) {
                const button = createButton(gameName);
                $eLink.after(button);
            }
        });
    }

    const observer = new MutationObserver(() => {
        addButtonsToRows();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    addButtonsToRows(); // Initial load
})();
