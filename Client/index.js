document.getElementById("start-scan").addEventListener("click", () => {
  document.getElementById("interactive").style.display = "block";
  Quagga.init(
    {
      inputStream: {
        name: "Live",
        type: "LiveStream",
        target: document.querySelector("#interactive"),
      },
      decoder: {
        readers: ["code_128_reader"],
      },
    },
    (err) => {
      if (err) {
        console.error(err);
        return;
      }
      Quagga.start();
    }
  );
});

Quagga.onDetected(async (result) => {
  const code = result.codeResult.code;
  Quagga.stop();
  document.getElementById("interactive").style.display = "none";
  try {
    const response = await fetch(
      "https://barcode-scanner-36a1.onrender.com/barcode",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ barcode: code }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      const newTab = window.open();
      newTab.document.head.innerHTML = `
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              padding: 20px;
              background-color: #f4f7f6;
              color: #333;
            }
            h1 {
              color: #4CAF50;
              border-bottom: 2px solid #4CAF50;
              padding-bottom: 10px;
            }
            h2 {
              margin-top: 40px;
              color: #4CAF50;
              border-bottom: 1px solid #ddd;
              padding-bottom: 5px;
            }
            p {
              margin: 10px 0;
            }
            img {
              display: block;
              margin: 20px 0;
              max-width: 100%;
              height: auto;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .medical-record {
              background: #fff;
              padding: 10px;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
              margin-bottom: 20px;
            }
          </style>
        `;
      newTab.document.body.innerHTML = `
          <div>
            <h1>${data.species_name.common}</h1>
            <p><strong>Scientific Name:</strong> ${
              data.species_name.scientific
            }</p>
            <img src="${data.image}" alt="${data.species_name.common}">
            <p><strong>Individual Name:</strong> ${
              data.individual_identification.name
            }</p>
            <p><strong>ID:</strong> ${data.individual_identification.id}</p>
            <p><strong>Sex:</strong> ${data.sex}</p>
            <p><strong>Age:</strong> ${data.age.estimated_age}</p>
            <p><strong>Origin:</strong> ${data.origin}</p>
            <h2>Health and Medical History</h2>
            ${data.health_and_medical.medical_history
              .map(
                (record) => `
                  <div class="medical-record">
                    <p><strong>Date:</strong> ${new Date(
                      record.date
                    ).toLocaleDateString()}</p>
                    <p><strong>Condition:</strong> ${record.condition}</p>
                    <p><strong>Treatment:</strong> ${record.treatment}</p>
                    <p><strong>Outcome:</strong> ${record.outcome}</p>
                  </div>
                `
              )
              .join("")}
          </div>
        `;
    } else {
      alert("Barcode not found.");
    }
  } catch (error) {
    console.error(error);
  }
});
