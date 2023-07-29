import Leaderboard from "@models/Leaderboard";
import User from "@models/User";
import { connectToDB } from "@utils/database";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest, res : NextResponse) {
    try {

        // const data = await req.formData();
        // const email = data.get("email");
        // const wpm = data.get("wpm");

        const data = await req.json();
        const email = data.email;
        const wpm = data.wpm;
        const secret = data.secret === process.env.NEXT_PUBLIC_SECRET;
        
        if (secret === false || secret === null || secret === undefined) return NextResponse.json("Unauthorised access!");

        await connectToDB();

        const recordExist = await Leaderboard.find({
            byUserEmail: email
        });

        if (recordExist.length >= 1){
            await Leaderboard.deleteMany({ byUserEmail: email });
        }

        const createRecord = await Leaderboard.create({
            wpm: wpm,
            byUserEmail: email
        });

        if (createRecord) return NextResponse.json("Record created successfully!");
        else {
            throw new Error("Record created unsuccessfully");
        }

    } catch (error) {
        console.error(error);
        return NextResponse.json(error);
    }
}