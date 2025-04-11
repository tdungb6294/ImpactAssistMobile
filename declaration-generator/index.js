const express = require("express");
const puppeteer = require("puppeteer");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post("/generate-pdf", async (req, res) => {
  try {
    const data = req.body;

    // Convert JSON data to HTML template
    const htmlContent = generateHtmlFromJson(data);

    // Generate PDF using Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    // Send the generated PDF as a response
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=output.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating PDF");
  }
});

// Helper function to generate HTML from JSON
function generateHtmlFromJson(declaration) {
  return `
      <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <title>JSON in HTML</title>
    <style>
        @page {
            margin: 0
        }
        
        * {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        .main-container {
            width: 210mm;
            height: 297mm;
            background-color: red;
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        .details-container {
            display: flex;
            width: 100%;
            gap: 4px;
            justify-content: space-between;
        }

        .car-section {
            width: 48%;
        }

        .details-element-container {
            border: black solid 1px;
        }

        .witnesses {
            width: 60%;
        }
    </style>
</head>
<body>
<div class="main-container">
    <h1>Car Accident Declaration</h1>
    <div class="details-container">
        <div class="details-element-container">
            <p><b>Accident Date</b></p>
            <p th:text="${declaration.datetime}"></p>
        </div>
        <div class="details-element-container">
            <p><b>Accident Time</b></p>
            <p th:text="${declaration.datetime}"></p>
        </div>
        <div class="details-element-container">
            <p><b>Accident Location</b></p>
            <p th:text="'latitude: ' + ${declaration.accidentLatLng.latitude} + 'longitude: ' + ${declaration.accidentLatLng.longitude}"></p>
        </div>
        <div class="details-element-container">
            <p><b>Accident Country</b></p>
            <p>Lithuania</p>
        </div>
    </div>
    <div class="details-container">
        <div class="details-element-container">
            <p><b>Damage To Cars</b></p>
            <p>True</p>
        </div>
        <div class="details-element-container">
            <p><b>Damage To Objects</b></p>
            <p>True</p>
        </div>
        <div class="details-element-container witnesses">
            <p><b>Witnesses</b></p>
            <p>Yapfest</p>
        </div>
    </div>

    <div class="details-container">
        <div class="details-container car-section">
            <div class="details-element-container">
                <p><b>Damage To Cars</b></p>
                <p>True</p>
            </div>
            <div class="details-element-container">
                <p><b>Damage To Objects</b></p>
                <p>True</p>
            </div>
            <div class="details-element-container witnesses">
                <p><b>Witnesses</b></p>
                <p>Yapfest</p>
            </div>
        </div>
        <div class="details-container car-section">
            <div class="details-element-container">
                <p><b>Damage To Cars</b></p>
                <p>True</p>
            </div>
            <div class="details-element-container">
                <p><b>Damage To Objects</b></p>
                <p>True</p>
            </div>
            <div class="details-element-container witnesses">
                <p><b>Witnesses</b></p>
                <p>Yapfest</p>
            </div>
        </div>
    </div>
</div>
</body>
</html>
    `;
}

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
