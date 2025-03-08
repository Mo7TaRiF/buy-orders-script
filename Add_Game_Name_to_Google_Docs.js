// ==UserScript==
// @name         Add Game Name to Google Docs
// @namespace    http://tampermonkey.net/
// @version      1.6
// @description  Adds buttons to send game names from Steam Tools Cards to Google Docs files, skipping highlighted rows
// @match        https://steam.tools/cards/
// @grant        GM_xmlhttpRequest
// @connect      script.google.com
// @require      https://code.jquery.com/jquery-3.6.0.min.js
// @connect      script.google.com
// @connect      script.googleusercontent.com
// ==/UserScript==

(function () {
    'use strict';

    const apiUrl = 'https://script.google.com/macros/s/AKfycbz5l9FE0gc5UxXzuKWZtB8YYYQW71aNkkdCVXdY_y6krBm6I6MBy0K9JkYCaO2avkfT/exec'; // Replace with your Google Apps Script URL

    function createButton(gameName, buttonText, docId, buttonColor) {
        const button = $('<button>')
            .text(buttonText)
            .css({
                marginLeft: '10px',
                backgroundColor: buttonColor,
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

                // Prepare the data to send
                const data = JSON.stringify({
                    gameName: gameName,
                    docId: docId,
                });

                console.log(`Sending data: ${data}`); // Debugging: Log the data being sent

                // Send the request
                GM_xmlhttpRequest({
                    method: 'POST',
                    url: apiUrl,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json', // Send data as JSON
                    },
                    onload: function (response) {
                        if (response.status === 200) {
                            console.log(`Game "${gameName}" added successfully to ${buttonText}.`);
                            $this.css('backgroundColor', '#28a745'); // Green for success
                            $this.text('Added');
                        } else {
                            console.warn(`Game "${gameName}" may not have been added. Response:`, response);
                            $this.css('backgroundColor', '#dc3545'); // Red for failure
                            $this.text('Failed');
                        }
                    },
                    onerror: function (error) {
                        console.error(`Error occurred while adding "${gameName}":`, error);
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
                const toLowButton = createButton(gameName, 'To Low', '1FAPMOu0dGSAWO9Y8oZ06oSN0oWnvFtpBeFci-yLbAdo', '#007bff');
                const toHighButton = createButton(gameName, 'To High', '1fgt2EPiLqynPiWSAsgjbR3-hJZgZpgqXKG85wdaJNZ4', '#ffc107'); // Yellow color for To High

                // Hide buttons based on row color
                if ($row.hasClass('highlight-low')) {
                    toLowButton.hide(); // Hide To Low button if row is highlighted blue
                }
                if ($row.hasClass('highlight-high')) {
                    toHighButton.hide(); // Hide To High button if row is highlighted yellow
                }

                $eLink.after(toLowButton);
                $eLink.after(toHighButton);
            }
        });
    }

    function delayedButtonAdd() {
        // Introduce a delay to wait for the highlight script to finish processing
        setTimeout(() => {
            addButtonsToRows();
        }, 2000); // Adjust delay if needed
    }

    const observer = new MutationObserver(() => {
        delayedButtonAdd();
    });

    observer.observe(document.body, { childList: true, subtree: true });
    delayedButtonAdd(); // Initial load
})();
