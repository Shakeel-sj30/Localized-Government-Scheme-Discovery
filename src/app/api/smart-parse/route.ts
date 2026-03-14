import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
    try {
        const { transcript } = await req.json();

        if (!transcript) {
            return NextResponse.json({ error: 'Transcript is required' }, { status: 400 });
        }

        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is not set.");
            return NextResponse.json({ error: 'AI parsing is currently unavailable.' }, { status: 503 });
        }

        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `
You are an AI assistant designed to extract structured eligibility criteria from an Indian user's natural language input regarding their identity or situation to find government schemes.
Extract the following fields if present. If a field is not mentioned, return "All" for dropdowns or an empty string "" for text inputs.

Fields to extract:
- age: Numeric string (e.g., "25"). Leave empty "" if not found.
- gender: One of ["Male", "Female", "Other", "All"]. Default "All".
- occupation: Extract their profession (e.g., "Farmer", "Student", "Business", "Unemployed", etc). Or "All" if none mentioned.
- income: Annual income as a numeric string (e.g., "250000"). Understand terms like "lakhs", "k", "monthly". If monthly, multiply by 12. If not mentioned, leave empty "".
- category: One of ["General", "SC", "ST", "OBC", "Minority", "All"]. Default "All".
- state: Extract the Indian State or Union Territory name (e.g., "Maharashtra", "Tamil Nadu"). Default "All".

Return ONLY a valid JSON object matching this structure with NO markdown formatting, NO backticks, NO explanations.

Input text: "${transcript}"
`;

        const result = await model.generateContent(prompt);
        const textResponse = result.response.text().trim();
        
        let parsedData;
        try {
            // Strip any accidental markdown formatting (e.g., \`\`\`json ... \`\`\`)
            const cleanJson = textResponse.replace(/^```json\s*/, '').replace(/```\s*$/, '').trim();
            parsedData = JSON.parse(cleanJson);
        } catch (e) {
            console.error("Failed to parse Gemini response as JSON:", textResponse);
            return NextResponse.json({ error: 'Failed to process AI response' }, { status: 500 });
        }

        return NextResponse.json(parsedData);

    } catch (error: any) {
        console.error('Error in smart-parse API:', error);
        return NextResponse.json(
            { error: error?.message || 'Something went wrong processing the AI request' },
            { status: 500 }
        );
    }
}
