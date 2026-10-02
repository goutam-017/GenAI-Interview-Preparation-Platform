import * as pdfParse from 'pdf-parse'
import mammoth from "mammoth"


const extractDocumentText = async (file) => {
    if (!file?.buffer || !file?.mimetype) {
        throw new Error("Invalid or missing file.")
    }

    try {
        switch (file.mimetype) {
            // PDF
            case "application/pdf": {
                const parser = new pdfParse.PDFParse(Uint8Array.from(file.buffer))

                const result = await parser.getText()

                return result.text
            }

            // DOCX
            case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
                const result = await mammoth.extractRawText({ buffer: file.buffer })

                return result.value
            }

            // TXT
            case "text/plain": {
                return file.buffer.toString("utf-8")
            }

            default: throw new Error("Unsupported file type. Please upload a PDF, DOCX or TXT file.")
        }
    } catch (error) {
        console.error("Document text extraction error:", error)
        throw error
    }
}

export default extractDocumentText