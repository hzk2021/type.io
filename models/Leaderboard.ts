import { Schema, model, models } from "mongoose";

const LeaderBoardSchema = new Schema({
    wpm: {
        type: Number,
        required: [true, 'WPM is required!']
    },
    byUserEmail: {
        type: String,
        required: [true, 'byUserEmail is required']
    }
});

const Leaderboard = models.Leaderboard || model("Leaderboard", LeaderBoardSchema);

export default Leaderboard;