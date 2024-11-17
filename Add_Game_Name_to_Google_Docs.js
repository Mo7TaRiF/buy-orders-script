// ==UserScript==
// @name         Add Game Name to Google Docs
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  Adds a button to send game names from Steam Tools Cards to a Google Docs file, skipping highlighted rows
// @match        https://steam.tools/cards/
// @grant        GM_xmlhttpRequest
// @connect      script.google.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @connect      script.google.com
// @connect      script.googleusercontent.com
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

                GM_xmlhttpRequest({
                    method: 'POST',
                    url: `${apiUrl}?gameName=${encodeURIComponent(gameName)}`,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    onload: function (response) {
                        if (response.status === 200) {
                            $this.css('backgroundColor', '#28a745'); // Green for success
                            $this.text('Added');
                        } else {
                            console.error('Failed to add game name:', response);
                            $this.css('backgroundColor', '#dc3545'); // Red for failure
                            $this.text('Failed');
                        }
                    },
                    onerror: function (error) {
                        console.error('Error occurred while adding game name:', error);
                        $this.css('backgroundColor', '#dc3545'); // Red for failure
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

            // Skip rows with highlight classes or if the button already exists
            if (
                gameName &&
                $eLink.length > 0 &&
                $row.find('button').length === 0 &&
                !$row.hasClass('highlight-date') &&
                !$row.hasClass('highlight-game') &&
                !$row.hasClass('highlight-both')
            ) {
                const button = createButton(gameName);
                $eLink.after(button);
            }
        });
    }

    function delayedButtonAdd() {
        // Introduce a delay to wait for the highlight script to finish processing
        setTimeout(() => {
            addButtonsToRows();
        }, 5000); // Adjust delay if needed
    }

    const observer = new MutationObserver(() => {
        delayedButtonAdd();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    delayedButtonAdd(); // Initial load
})();
