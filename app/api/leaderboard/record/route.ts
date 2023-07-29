import Leaderboard from "@models/Leaderboard";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req : Request) {

    try {

        const {searchParams} = new URL(req.url);

        await connectToDB();
        
        const playerFound = await User.findOne({
            email: searchParams.get("email")
        });
        if (!playerFound) return;


        const playerRecord = await Leaderboard.findOne({
            byUserEmail: searchParams.get("email")
        });
        if (!playerRecord) return NextResponse.json({wpm: 0});
    
        return NextResponse.json(playerRecord);
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }

}