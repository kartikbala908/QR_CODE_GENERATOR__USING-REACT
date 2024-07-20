import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';

const App = () => {
  const [option, setOption] = useState('text');
  const [text, setText] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [contactDetails, setContactDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });
  const [qrValue, setQrValue] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const generateQRCode = () => {
    switch (option) {
      case 'text':
        setQrValue(text);
        break;
      case 'pdf':
        setQrValue(pdfUrl);
        break;
      case 'contact':
        setQrValue(generateVCard());
        break;
      case 'email':
        setQrValue(`mailto:${contactDetails.email}`);
        break;
      case 'phone':
        setQrValue(`tel:+91${contactDetails.phone}`);
        break;
      default:
        setQrValue('');
    }
    setRefreshKey(prevKey => prevKey + 1);
    setText('');
    setPdfUrl('');
    setContactDetails({
      name: '',
      phone: '',
      email: '',
      address: ''
    });
  };

  const generateVCard = () => {
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${contactDetails.name}
TEL:+91${contactDetails.phone}
EMAIL:${contactDetails.email}
ADR:${contactDetails.address}
END:VCARD`;
    return vCard;
  };

  const downloadQRCode = (format) => {
    const qrCodeElement = document.querySelector('.qr-code');
    html2canvas(qrCodeElement).then(canvas => {
      canvas.toBlob(blob => {
        saveAs(blob, `qrcode.${format}`);
      });
    });
  };

  return (
    <div className="flex h-screen">
      <div className="flex flex-col items-start p-8 w-1/3 bg-gray-100">
        <h1 className="text-3xl font-bold text-blue-600 mb-8">QR Code Generator</h1>

        <div className="mb-4 w-full">
          <h3 className="text-lg font-semibold mb-2">Select Option</h3>
          <select
            value={option}
            onChange={(e) => setOption(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="text">Text</option>
            <option value="pdf">PDF</option>
            <option value="contact">Contact</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
          </select>
        </div>

        {option === 'text' && (
          <div className="mb-4 w-full">
            <h3 className="text-lg font-semibold mb-2">Text to QR</h3>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {option === 'pdf' && (
          <div className="mb-4 w-full">
            <h3 className="text-lg font-semibold mb-2">PDF URL to QR</h3>
            <input
              type="text"
              value={pdfUrl}
              onChange={(e) => setPdfUrl(e.target.value)}
              placeholder="Enter PDF URL"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {option === 'contact' && (
          <div className="mb-4 w-full">
            <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
            <input
              type="text"
              name="name"
              value={contactDetails.name}
              onChange={(e) => setContactDetails({ ...contactDetails, name: e.target.value })}
              placeholder="Name"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="phone"
              value={contactDetails.phone}
              onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
              placeholder="Phone"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="email"
              name="email"
              value={contactDetails.email}
              onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
              placeholder="Email"
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              name="address"
              value={contactDetails.address}
              onChange={(e) => setContactDetails({ ...contactDetails, address: e.target.value })}
              placeholder="Address"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {option === 'email' && (
          <div className="mb-4 w-full">
            <h3 className="text-lg font-semibold mb-2">Email Address to QR</h3>
            <input
              type="email"
              value={contactDetails.email}
              onChange={(e) => setContactDetails({ ...contactDetails, email: e.target.value })}
              placeholder="Enter Email Address"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        {option === 'phone' && (
          <div className="mb-4 w-full">
            <h3 className="text-lg font-semibold mb-2">Phone Number to QR</h3>
            <input
              type="text"
              value={contactDetails.phone}
              onChange={(e) => setContactDetails({ ...contactDetails, phone: e.target.value })}
              placeholder="Enter Phone Number"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        )}

        <button onClick={generateQRCode} className="w-full bg-blue-500 text-white py-2 mt-4 rounded">
          Generate QR Code
        </button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-blue-900 p-8">
        {qrValue ? (
          <div className="flex flex-col items-center">
            <div className="qr-code mb-4 p-4 bg-white shadow-lg rounded">
              <QRCode value={qrValue} size={256} />
            </div>
            <div className="flex space-x-4">
              <button onClick={() => downloadQRCode('jpg')} className="bg-blue-500 text-white py-2 px-4 rounded">
                Download JPG
              </button>
              <button onClick={() => downloadQRCode('png')} className="bg-orange-500 text-white py-2 px-4 rounded">
                Download PNG
              </button>
            </div>
          </div>
        ) : (
          <div className="text-white text-2xl font-bold">
            Your QR here
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
