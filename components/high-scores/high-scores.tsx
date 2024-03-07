// @ts-ignore
export const HighScores = ({ highScore, index }) => {
    {
        console.log(highScore);
    }
    return (
        <tr className="">
            <td className="border-b px-6 py-4">{highScore.name}</td>
            <td className="border-b px-6 py-4">{Math.max(highScore.topWpm)}</td>
            <td className="border-b px-6 py-4">{highScore.totalCpm}</td>
            <td className="border-b px-6 py-4 text-end">{index + 1}</td>
        </tr>
    );
};
