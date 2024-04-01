import { useEffect, useState } from "react"

export const Tooltip = ({prefix}) => {
    const bombs = prefix.split("").map((c) => {
        if (c == '0') {
            return 'no bomb - '
        } else {
            return 'bomb - '
        }
    })
    return (
        <p>{bombs}</p>
    )
}