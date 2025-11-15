// import express from "express";
// import QRCode from "qrcode";

// const app = express();
// const PORT = 3000;

// // vCard contact info
// const vcard = `BEGIN:VCARD
// VERSION:3.0
// FN: Praveen Sharma
// TITLE: Founder & CEO
// ORG: Swastixa Digital
// TEL:+91 9891824688
// EMAIL:abhishek.sharma@swastixa.com
// URL:www.swastixa.com
// ADR:New Delhi, India
// END:VCARD`;
// // Route to display QR in browser
// app.get("/", async (req, res) => {
//     try {
//         const qrDataUrl = await QRCode.toDataURL(vcard);
//         const html = `
//       <h2>Contact QR Code</h2>
//       <img src="${qrDataUrl}" alt="QR Code" />
//       <br><br>
//       <a href="/download" download="contact_qr.png">
//         <button>Download QR Code</button>
//       </a>
//     `;
//         res.send(html);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error generating QR code");
//     }
// });

// // Route to download QR as PNG
// app.get("/download", async (req, res) => {
//     try {
//         const qrBuffer = await QRCode.toBuffer(vcard);
//         res.setHeader("Content-Disposition", "attachment; filename=contact_qr.png");
//         res.setHeader("Content-Type", "image/png");
//         res.send(qrBuffer);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Error downloading QR code");
//     }
// });

// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT} `));




// import express from "express";
// import QRCode from "qrcode";
// // To add a logo, you would also need an image processing library.
// // For example: import sharp from "sharp";
// // You would need to install it: npm install sharp

// const app = express();
// const PORT = 3000;

// // vCard contact info (same as yours)
// const vcard = `BEGIN:VCARD
// VERSION:3.0
// FN: Praveen Sharma
// TITLE: Founder & CEO
// ORG: Swastixa Digital
// TEL:+91 9891824688
// EMAIL:abhishek.sharma@swastixa.com
// URL:www.swastixa.com
// ADR:New Delhi, India
// END:VCARD`;

// // --- New QR Code Options ---
// // We'll define our styling options here
// const qrOptions = {
//   /**
//    * Error correction level.
//    * We use 'H' (High) which allows up to 30% of the QR code
//    * to be covered (e.g., by a logo) and still be scannable.
//    * This is essential for adding a logo.
//    */
//   errorCorrectionLevel: 'H',
//   /**
//    * The 'qrcode' library doesn't add logos, but it lets us
//    * change the colors.
//    */
//   color: {
//     dark: "#233e85", // Green dots (like your example)
//     light: "#FFFFFF", // White background
//   },
//   /**
//    * Adds a small white border.
//    */
//   margin: 2,
//   /**
//    * We want a high-quality PNG.
//    */
//   type: 'png',
//   width: 300,
// };

// // --- How to Add a Logo (Advanced) ---
// // The 'qrcode' library itself doesn't overlay logos.
// // To add a logo like in your example, the process is:
// //
// // 1. Generate the QR code as a buffer (like we do in the /download route).
// // 2. Load your logo file (e.g., 'logo.png') as a buffer.
// // 3. Use an image-processing library (like 'sharp') to:
// //    a. Resize your logo to fit in the center.
// //    b. Composite (overlay) the resized logo onto the QR code buffer.
// // 4. Save or send the final combined image.
// //
// // Example using 'sharp' (you would need to `npm install sharp`):
// /*
// async function createQrWithLogo(data, logoPath) {
//   try {
//     // 1. Generate QR code buffer
//     const qrBuffer = await QRCode.toBuffer(data, qrOptions);

//     // 2. Load and resize logo buffer
//     const logoBuffer = await sharp(logoPath)
//       .resize(80, 80, { fit: 'inside' }) // Resize logo
//       .toBuffer();

//     // 3. Composite logo onto QR code
//     const finalImageBuffer = await sharp(qrBuffer)
//       .composite([{
//         input: logoBuffer,
//         gravity: 'center' // Place logo in the center
//       }])
//       .toBuffer();

//     return finalImageBuffer;
//   } catch (err) {
//     console.error("Error creating QR with logo:", err);
//     throw err;
//   }
// }
// */


// // Route to display QR in browser
// app.get("/", async (req, res) => {
//   try {
//     // Generate the styled QR code as a Data URL for embedding in HTML
//     const qrDataUrl = await QRCode.toDataURL(vcard, qrOptions);
    
//     // Improved HTML styling
//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>vCard QR Code</title>
//         <style>
//           body {
//             font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
//             display: grid;
//             place-items: center;
//             min-height: 90vh;
//             background-color: #f4f7f6;
//             margin: 0;
//             color: #333;
//           }
//           .container {
//             background: #ffffff;
//             border-radius: 12px;
//             box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
//             padding: 2rem 2.5rem;
//             text-align: center;
//             max-width: 400px;
//           }
//           h2 {
//             margin-top: 0;
//             color: #111;
//           }
//           img {
//             max-width: 100%;
//             height: auto;
//             border-radius: 8px;
//             border: 1px solid #eee;
//           }
//           .download-button {
//             display: inline-block;
//             text-decoration: none;
//             background-color: #1e36efff; /* Green to match QR */
//             color: white;
//             border: none;
//             padding: 12px 24px;
//             border-radius: 8px;
//             cursor: pointer;
//             font-size: 16px;
//             font-weight: 600;
//             transition: background-color 0.3s, transform 0.2s;
//             margin-top: 1.5rem;
//           }
//           .download-button:hover {
//             background-color: #1e36efff;
//             transform: translateY(-2px);
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h2>Contact QR Code</h2>
//           <img src="${qrDataUrl}" alt="Contact vCard QR Code" />
//           <br>
//           <a href="/download" download="contact_qr.png" class="download-button">
//             Download QR Code
//           </a>
//         </div>
//       </body>
//       </html>
//     `;
//     res.send(html);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error generating QR code");
//   }
// });

// // Route to download QR as PNG
// app.get("/download", async (req, res) => {
//   try {
//     // Generate the styled QR code as a Buffer for download
//     const qrBuffer = await QRCode.toBuffer(vcard, qrOptions);

//     // ---
//     // If you were adding a logo, you would call your
//     // createQrWithLogo() function here and send its result.
//     // const finalBuffer = await createQrWithLogo(vcard, 'path/to/your/logo.png');
//     // ---

//     res.setHeader("Content-Disposition", "attachment; filename=contact_qr.png");
//     res.setHeader("Content-Type", "image/png");
    
//     // Send the green QR code buffer.
//     // (Replace qrBuffer with finalBuffer if using the logo function)
//     res.send(qrBuffer);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error downloading QR code");
//   }
// });

// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT} `));



// import express from "express";
// import QRCode from "qrcode";
// // Ab koi image processing library ki zaroorat nahi hai.

// const app = express();
// const PORT = 3000;

// // vCard contact info (Aapka diya hua data)
// const vcard = `BEGIN:VCARD
// VERSION:3.0
// FN: Praveen Sharma
// TITLE: Founder & CEO
// ORG: Swastixa Digital
// TEL:+91 9891824688
// EMAIL:abhishek.sharma@swastixa.com
// URL:www.swastixa.com
// ADR:New Delhi, India
// END:VCARD`;

// // --- Route to display basic QR in browser ---
// app.get("/", async (req, res) => {
//   try {
//     // QRCode.toDataURL() ko bina kisi options ke call karne par, 
//     // yeh default black and white QR code generate karega.
//     const qrDataUrl = await QRCode.toDataURL(vcard);
    
//     // Basic HTML styling
//     const html = `
//       <!DOCTYPE html>
//       <html lang="en">
//       <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>vCard QR Code</title>
//         <style>
//           body {
//             font-family: Arial, sans-serif;
//             display: grid;
//             place-items: center;
//             min-height: 90vh;
//             background-color: #f4f4f4;
//             margin: 0;
//           }
//           .container {
//             background: #ffffff;
//             border-radius: 10px;
//             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
//             padding: 2rem;
//             text-align: center;
//           }
//           img {
//             max-width: 300px;
//             height: auto;
//             margin: 1rem 0;
//             border: 1px solid #ddd;
//           }
//           .download-button {
//             background-color: #333;
//             color: white;
//             border: none;
//             padding: 10px 20px;
//             border-radius: 5px;
//             cursor: pointer;
//             font-size: 16px;
//             text-decoration: none;
//             display: inline-block;
//             transition: background-color 0.3s;
//           }
//           .download-button:hover {
//             background-color: #555;
//           }
//         </style>
//       </head>
//       <body>
//         <div class="container">
//           <h2>Contact QR Code</h2>
//           <img src="${qrDataUrl}" alt="QR Code" />
//           <br>
//           <a href="/download" download="contact_qr.png" class="download-button">
//             Download QR Code
//           </a>
//         </div>
//       </body>
//       </html>
//     `;
//     res.send(html);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error generating QR code");
//   }
// });

// // --- Route to download QR as PNG ---
// app.get("/download", async (req, res) => {
//   try {
//     // QRCode.toBuffer() ko bina options ke call karne par, yeh default black and white QR code buffer dega.
//     const qrBuffer = await QRCode.toBuffer(vcard);
    
//     res.setHeader("Content-Disposition", "attachment; filename=contact_qr.png");
//     res.setHeader("Content-Type", "image/png");
//     res.send(qrBuffer);

//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Error downloading QR code");
//   }
// });

// app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT} `));
// // ```eof





// // import express from "express";
// // import QRCode from "qrcode";

// // const app = express();
// // const PORT = 3000;

// // const vcard = `BEGIN:VCARD
// // VERSION:3.0
// // FN: Praveen Sharma
// // TITLE: Founder & CEO
// // ORG: Swastixa Digital
// // TEL:+91 9891824688
// // EMAIL:abhishek.sharma@swastixa.com
// // URL:www.swastixa.com
// // ADR:New Delhi, India
// // END:VCARD`;

// // app.get("/", async (req, res) => {
// //   try {
// //     const qrDataUrl = await QRCode.toDataURL(vcard, {
// //       margin: 8, // ⬅ Extra spacing for clean QR
// //     });

// //     const html = `
// //       <!DOCTYPE html>
// //       <html lang="en">
// //       <head>
// //         <meta charset="UTF-8">
// //         <meta name="viewport" content="width=device-width, initial-scale=1.0">
// //         <title>vCard QR Code</title>
// //         <style>
// //           body {
// //             font-family: Arial, sans-serif;
// //             display: grid;
// //             place-items: center;
// //             min-height: 90vh;
// //             background-color: #f4f4f4;
// //             margin: 0;
// //           }
// //           .container {
// //             background: #ffffff;
// //             border-radius: 10px;
// //             box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
// //             padding: 2rem;
// //             text-align: center;
// //           }
// //           img {
// //             max-width: 300px;
// //             height: auto;
// //             margin: 1rem 0;
// //             border: 1px solid #ddd;
// //           }
// //           .download-button {
// //             background-color: #333;
// //             color: white;
// //             border: none;
// //             padding: 10px 20px;
// //             border-radius: 5px;
// //             cursor: pointer;
// //             font-size: 16px;
// //             text-decoration: none;
// //           }
// //           .download-button:hover {
// //             background-color: #555;
// //           }
// //         </style>
// //       </head>
// //       <body>
// //         <div class="container">
// //           <h2>Contact QR Code</h2>
// //           <img src="${qrDataUrl}" alt="QR Code" />
// //           <br>
// //           <a href="/download" download="contact_qr.png" class="download-button">
// //             Download QR Code
// //           </a>
// //         </div>
// //       </body>
// //       </html>
// //     `;
// //     res.send(html);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Error generating QR code");
// //   }
// // });

// // app.get("/download", async (req, res) => {
// //   try {
// //     const qrBuffer = await QRCode.toBuffer(vcard, {
// //       margin: 8, // ⬅ Clean spaced QR in download also
// //     });

// //     res.setHeader("Content-Disposition", "attachment; filename=contact_qr.png");
// //     res.setHeader("Content-Type", "image/png");
// //     res.send(qrBuffer);

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).send("Error downloading QR code");
// //   }
// // });

// // app.listen(PORT, () =>
// //   console.log(`🚀 Server running at http://localhost:${PORT}`)
// // );


// import QRCode from "qrcode";
// import { createCanvas } from "canvas";

// async function generateQR() {
//   const qr = await QRCode.create(vcard);

//   const cellSize = 12;
//   const gap = 2; // ← line spacing
//   const size = (qr.modules.size * (cellSize + gap)) + gap;

//   const canvas = createCanvas(size, size);
//   const ctx = canvas.getContext("2d");

//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, size, size);

//   for (let r = 0; r < qr.modules.size; r++) {
//     for (let c = 0; c < qr.modules.size; c++) {
//       if (qr.modules.get(r, c)) {
//         ctx.fillStyle = "black";
//         ctx.fillRect(
//           c * (cellSize + gap) + gap,
//           r * (cellSize + gap) + gap,
//           cellSize,
//           cellSize
//         );
//       }
//     }
//   }

//   return canvas.toDataURL();
// }



import express from "express";
import QRCode from "qrcode";
import { createCanvas } from "canvas";

const app = express();
const PORT = 3000;

// ---- YOUR VCARD ----
const vcard = `BEGIN:VCARD
VERSION:3.0
FN: Praveen Sharma
TITLE: Founder & CEO
ORG: Swastixa Digital
TEL:+91 9891824688
EMAIL:abhishek.sharma@swastixa.com
URL:www.swastixa.com
ADR:New Delhi, India
END:VCARD`;


// ------ FUNCTION TO GENERATE GAP QR ------
async function generateQR() {
  const qr = await QRCode.create(vcard);

  const cellSize = 12; // black square size
  const gap = 2;       // white line gap
  const size = (qr.modules.size * (cellSize + gap)) + gap;

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  // background white
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, size, size);

  // draw QR grid with white spacing
  for (let r = 0; r < qr.modules.size; r++) {
    for (let c = 0; c < qr.modules.size; c++) {
      if (qr.modules.get(r, c)) {
        ctx.fillStyle = "black";
        ctx.fillRect(
          c * (cellSize + gap) + gap,
          r * (cellSize + gap) + gap,
          cellSize,
          cellSize
        );
      }
    }
  }

  return canvas.toDataURL(); // returns base64 image
}


// ------ MAIN PAGE SHOWING QR ------
app.get("/", async (req, res) => {
  try {
    const qrDataUrl = await generateQR();

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Designer QR Code</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: grid;
            place-items: center;
            min-height: 90vh;
            background-color: #f4f4f4;
            margin: 0;
          }
          .container {
            background: #fff;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.1);
            text-align: center;
          }
          img {
            max-width: 320px;
            margin: 1rem 0;
            border: 1px solid #ddd;
          }
          a {
            background: #333;
            color: #fff;
            padding: 10px 20px;
            display: inline-block;
            border-radius: 5px;
            text-decoration: none;
          }
          a:hover {
            background: #555;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Designer QR Code (With Spacing)</h2>
          <img src="${qrDataUrl}" />
          <br />
          <a href="/download">Download QR</a>
        </div>
      </body>
      </html>
    `;

    res.send(html);
  } catch (e) {
    console.error(e);
    res.status(500).send("QR error");
  }
});


// ------ DOWNLOAD ROUTE ------
app.get("/download", async (req, res) => {
  try {
    const qr = await QRCode.create(vcard);

    const cellSize = 25;
    const gap = 2;
    const size = (qr.modules.size * (cellSize + gap)) + gap;

    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");   // <-- FIXED HERE

    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, size, size);

    for (let r = 0; r < qr.modules.size; r++) {
      for (let c = 0; c < qr.modules.size; c++) {
        if (qr.modules.get(r, c)) {
          ctx.fillStyle = "black";
          ctx.fillRect(
            c * (cellSize + gap) + gap,
            r * (cellSize + gap) + gap,
            cellSize,
            cellSize
          );
        }
      }
    }

    const buffer = canvas.toBuffer("image/png");

    res.setHeader("Content-Disposition", "attachment; filename=designer_qr.png");
    res.setHeader("Content-Type", "image/png");
    res.send(buffer);

  } catch (e) {
    console.error(e);
    res.status(500).send("Download error");
  }
});


app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
