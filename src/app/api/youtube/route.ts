import { NextResponse } from 'next/server';
import ytSearch from 'yt-search';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query) {
        return NextResponse.json({ error: 'Query parameter "q" is required' }, { status: 400 });
    }

    try {
        const r = await ytSearch(query);
        const videos = r.videos;

        if (videos && videos.length > 0) {
            // Return the ID of the first video
            return NextResponse.json({ videoId: videos[0].videoId });
        } else {
            return NextResponse.json({ error: 'No videos found' }, { status: 404 });
        }
    } catch (error) {
        console.error('YouTube search error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
