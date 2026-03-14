import { NextResponse } from 'next/server';
import Tesseract from 'tesseract.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get('file') as File;
        
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const buffer = await file.arrayBuffer();
        const nodeBuffer = Buffer.from(buffer);

        console.log("Starting Tesseract OCR...");
        // Run OCR on the image
        const worker = await Tesseract.createWorker('eng');
        const ret = await worker.recognize(nodeBuffer);
        await worker.terminate();

        const extractedText = ret.data.text;
        console.log("OCR Extracted Text:\n", extractedText);

        if (!process.env.GEMINI_API_KEY) {
            return NextResponse.json({ 
                text: extractedText,
                warning: 'GEMINI_API_KEY not set, skipping structured extraction.'
            });
        }

        console.log("Sending to Gemini for parsing...");
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are an AI assistant designed to extract structured profile information from Raw OCR text of an Indian Identity Document (like Aadhaar card, PAN card, Voter ID, Driving License).
Extract the following fields if present. If a field is not found, return "All" for dropdowns or an empty string "" for text inputs.

Expected Fields:
- name: Full name string.
- age: Calculate age from Date of Birth (DOB) or Year of Birth. E.g. if DOB is 1990, age is roughly ${new Date().getFullYear() - 1990}. Leave empty "" if not found.
- gender: One of ["Male", "Female", "Other", "All"]. Default "All".
- state: Indian state name if an address is present. E.g., "Maharashtra". Default "All".

Return ONLY a valid JSON object matching this structure with NO markdown formatting, NO backticks, NO explanations.

OCR Text:
"""
${extractedText}
"""
`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text().trim();
        
        let parsedData = {};
        try {
            const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
            parsedData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse Gemini OCR response as JSON:", textResponse);
        }

        return NextResponse.json({
            text: extractedText,
            parsed: parsedData
        });

    } catch (error: any) {
        console.error('Error in OCR API:', error);
        return NextResponse.json(
            { error: error?.message || 'Something went wrong processing the document' },
            { status: 500 }
        );
    }
}
