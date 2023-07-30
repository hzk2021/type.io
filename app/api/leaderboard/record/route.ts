import Leaderboard from "@models/Leaderboard";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req : Request) {

    try {
        const data = await req.json();
        const email = data.email;

        await connectToDB();
        
        const playerFound = await User.findOne({
            email: email
        });
        if (!playerFound) return;


        const playerRecord = await Leaderboard.findOne({
            byUserEmail: email
        });
        if (!playerRecord) return NextResponse.json({wpm: 0});
    
        return NextResponse.json(playerRecord);
    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }

}