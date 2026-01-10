# Scan Haven 📄🛡️

**Scan Haven** is a centralized sanctuary for your digital documents. It is a tool designed to bridge the gap between physical scans and organized digital libraries by utilizing computer vision to enhance, crop, and categorize scanned images automatically.

## 🚀 Key Features

* **Smart Edge Detection:** Automatically detects document boundaries in photos and "deskews" them for a flat, professional look.
* **Batch Processing:** Scan multiple pages at once; Scan Haven will split, clean, and export them as individual or combined PDFs.
* **Image Enhancement:** Built-in filters for background noise removal, contrast boosting, and grayscale conversion to make text pop.
* **OCR Integration:** (Optional) Extract text from scans using Tesseract for searchable document archiving.
* **Automated Organization:** Auto-names files based on date, time, or detected keywords.

## 🛠️ Tech Stack

* **Core:** Python
* **Processing:** OpenCV / Pillow (PIL)
* **PDF Generation:** PyMuPDF / ReportLab
* **Text Recognition:** Pytesseract (Tesseract OCR)

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/samyakrajbayar/scan-haven.git
cd scan-haven

```


2. **Set up a virtual environment:**
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

```


3. **Install dependencies:**
```bash
pip install -r requirements.txt

```



## 🖥️ Usage

Place your raw images/scans in the `input/` folder and run the processor:

```bash
python main.py

```

### Advanced Commands:

* **Thresholding:** Adjust how aggressively the background is removed using `--threshold`.
* **Output Format:** Choose between `--pdf`, `--jpg`, or `--png`.

## 📁 Project Structure

```text
scan-haven/
├── input/           # Raw, unorganized scans
├── output/          # Enhanced and organized digital documents
├── src/
│   ├── enhancer.py  # Image processing logic
│   ├── scanner.py   # Edge detection and perspective warping
│   └── utils.py     # File handling and PDF conversion
└── main.py          # Entry point

```

## 🤝 Contributing

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/NewEnhancer`).
3. Commit your Changes (`git commit -m 'Add adaptive thresholding'`).
4. Push to the Branch (`git push origin feature/NewEnhancer`).
5. Open a Pull Request.

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
