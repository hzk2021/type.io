import Leaderboard from "@models/Leaderboard";

import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@utils/database";

export const revalidate = 15;
export async function GET(req : NextRequest, res: NextResponse) {

    try {
        await connectToDB();

        const leaderboard = await Leaderboard.find().sort({wpm: -1});
    
        return NextResponse.json(leaderboard.slice(0,100));
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }

}