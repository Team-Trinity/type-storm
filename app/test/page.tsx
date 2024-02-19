import useText from "@/hooks/useText";
import React from "react";

export default function Test() {
    const [getText] = useText();
    return (
        <div>
            <div className="my-5">{getText(40)}</div>
            <div className="my-5">{getText(50)}</div>
            <div className="my-5">{getText(60)}</div>
            <div className="my-5">{getText(70)}</div>
            <div className="my-5">{getText(100)}</div>
            <div className="my-5">{getText(30)}</div>
        </div>
    );
}
