
# Add Game Name to Google Docs (Tampermonkey Script)

This Tampermonkey script adds a button beside each `[E]` link on the [Steam Tools Cards](https://steam.tools/cards/) page. The button allows users to send the game name (displayed in the same row) to a Google Docs document using a Google Apps Script API.

## Features
- Adds a button beside each `[E]` link in the table rows.
- Sends the game name to a predefined Google Docs file when the button is clicked.
- Handles requests silently (no pop-ups on success or failure).
- Dynamically adds buttons even after table updates (using a MutationObserver).

## Requirements
- A [Tampermonkey](https://www.tampermonkey.net/) extension installed on your browser.
- A deployed Google Apps Script to handle API requests for appending game names to the Google Docs file.

---

## Installation

### 1. Install Tampermonkey
- Install the [Tampermonkey browser extension](https://www.tampermonkey.net/) for your browser (Chrome, Firefox, Edge, etc.).

### 2. Add the Script
1. Install [Highlight game script](https://github.com/Mo7TaRiF/buy-orders-script/raw/main/Highlight%20Rows%20with%20Date%20Range%20and%20Specific%20Games)
2. Install [Adding game to the Docs File script](https://github.com/Mo7TaRiF/buy-orders-script/raw/main/Add%20Game%20Name%20to%20Google%20Docs).
3. Replace the placeholder `YOUR_GOOGLE_APPS_SCRIPT_URL` with your deployed Google Apps Script URL (detailed below).
4. Save and enable the script.

---

## Google Apps Script Setup

Follow these steps to set up the Google Apps Script API:

### 1. Create a Google Apps Script Project
1. Open [Google Apps Script](https://script.google.com/) and click **New project**.
2. Rename the project for easy identification (e.g., "Steam Tools Game Name API").

### 2. Copy the Script
Paste the following script into the editor:

```javascript
function doPost(e) {
    // Allow cross-origin requests
    var headers = {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*", 
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "Content-Type"
    };

    // Extract game name from the POST request
    var gameName = e.parameter.gameName;

    // Append the game name to the Google Docs file
    var docId = 'YOUR_GOOGLE_DOC_ID'; // Replace with your Google Docs ID
    var doc = DocumentApp.openById(docId);
    var body = doc.getBody();
    body.appendParagraph(gameName);

    // Return a success response
    return ContentService.createTextOutput()
        .setMimeType(ContentService.MimeType.JSON)
        .setContent(JSON.stringify({ status: "success" }))
        .setHeaders(headers);
}
```

### 3. Set the Google Docs File
1. Open the Google Docs file where you want to store the game names.
2. Copy the file’s **ID** from the URL:
   - For example, if your document’s URL is:
     ```
     https://docs.google.com/document/d/1FAPMOu0dGSAWO9Y8oZ06oSN0oWnvFtpBeFci-yLbAdo/edit
     ```
     The ID is:
     ```
     1FAPMOu0dGSAWO9Y8oZ06oSN0oWnvFtpBeFci-yLbAdo
     ```
3. Replace `YOUR_GOOGLE_DOC_ID` in the script with this ID.

### 4. Deploy the Script as a Web App
1. Click **Deploy** in the top-right corner of the Apps Script editor.
2. Select **New deployment**.
3. In the deployment configuration:
   - Under **Select type**, choose **Web app**.
   - Set **Execute as** to `Me` (this ensures the script runs with your permissions).
   - Set **Who has access** to `Anyone` (allows external access).
4. Click **Deploy** and grant any required permissions.
5. Copy the generated **Web App URL**.

### 5. Replace the Script URL
- Go back to the Tampermonkey script and replace the placeholder `YOUR_GOOGLE_APPS_SCRIPT_URL` with the Web App URL from the previous step.

---

## Usage
1. Open [Steam Tools Cards](https://steam.tools/cards/).
2. Locate the "Add Game Name to Docs" button beside each `[E]` link in the table rows.
3. Click the button to send the game name (in the same row) to the Google Docs file.
4. Open the Google Docs file to confirm the game name was added.

---

## Troubleshooting

### Common Issues:
1. **Buttons not appearing**:
   - Ensure the Tampermonkey script is active.
   - Reload the page to ensure the buttons are injected.

2. **Requests failing**:
   - Check the browser console (`F12` or `Ctrl+Shift+I`, then go to the **Console** tab) for any error messages.
   - Ensure the Google Apps Script URL is correctly added in the Tampermonkey script.
   - Verify the Google Apps Script is deployed correctly and accessible.

3. **No updates in Google Docs**:
   - Confirm that the correct document ID is used in the Apps Script.
   - Verify that your Google account has write access to the document.

### Debugging:
- Open the browser console to view any logs (`console.log` or `console.error`).
- Check the **Google Apps Script logs** by opening the Apps Script editor and selecting **Execution Logs** from the menu.

---

## License
This project is licensed under the [MIT License](LICENSE).
