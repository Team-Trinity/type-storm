
  // @ts-ignore
  export const HighScores= ({ highScore, index }) => {
    {console.log(highScore)}
    return (
        <tr className="">
        <td className="py-4 px-6 border-b">{highScore.name}</td>
        <td className="py-4 px-6 border-b">{highScore.topWpm}</td>
        <td className="py-4 px-6 border-b">{highScore.totalCpm}</td>
        <td className="py-4 px-6 border-b text-end">{index+1}</td>
    </tr>
    );
  };