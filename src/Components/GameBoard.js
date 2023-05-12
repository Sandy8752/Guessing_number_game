import React, { useEffect, useState } from 'react'

function GameBoard({ ran, arr, setArr, seconds, minutes, setMinutes, setSeconds }) {
    let [codeArray, setCodeArray] = useState([])
    let [inputValue, setinputValue] = useState("")
    let [codeShow, setCodeShow] = useState(false)
    const [error, setError] = useState(false)
    const [trys, setTrys] = useState(0)
    let timer;
    let [arr2, setArr2] = useState([])
    let tmp = []
    let count = 0
    function inputBox(e) {
        setinputValue(e)
        if (e) {
            let value = e.split("").map(Number)
            if (value.length == 4 && value.length == [...new Set(value)].length) {
                setArr2(value)
                setError(false)
            } else {

                setError(true)
            }

        }
    }
    let tri = +localStorage.getItem("trys")
    let minute = +localStorage.getItem("minutes")
    let second = +localStorage.getItem("seconds")

    useEffect(() => {
        let value = [...new Set(codeArray)]
        if (value.length == 1 && value == "+") {
            if (tri === 0) {
                localStorage.setItem("trys", trys)
                localStorage.setItem('minutes', minutes)
                localStorage.setItem('seconds', seconds)
            }
            if ((minutes * 60 + seconds) <= minute * 60 + second && trys <= tri) {
                localStorage.setItem("trys", trys)
                localStorage.setItem('minutes', minutes)
                localStorage.setItem('seconds', seconds)
            }
            alert(`your guess is correct ${arr.join("")}. lets try another 4 digit num`)
            setSeconds(0)
            setMinutes(0)
            setTrys(0)
            setArr(ran())
            setinputValue("")
            setCodeShow(false)

        }
    }, [codeArray])

    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1)
            if (seconds == 60) {
                setMinutes(minutes + 1)
                setSeconds(0)
            }
        }, 1000);
        return () => clearInterval(timer)
    })

    function finalAnswer() {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (arr2[i] == arr[j] && i == j) {
                    tmp.push("+")
                    break
                } else if (arr2[i] == arr[j] && i != j) {
                    tmp.push("-")
                    break
                } else if (arr2[i] != arr[j]) {
                    count++
                }
            }
            if (count == arr.length) {
                tmp.push("*")
            }
            count = 0
        }
        setCodeArray(tmp)
        setTrys(trys + 1)
        setCodeShow(true)
    }
    const stop = () => {
        clearInterval(timer)
    }
    return (
        <div>
            <h2>Best Score
                <div>{`Guesses : ${tri}`}</div>
                <div>{`Best Time : ${minute.toString().padStart(2, "0")} : ${second.toString().padStart(2, "0")}`}</div>
            </h2>
            <h4>
                Guess the Number
            </h4>
            <div style={{ padding: "15px", margin: "10px", backgroundColor: "lightgrey", borderRadius: "7px" }}> Timer : {`${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}</div>
            <input style={{ padding: "12px 25px" }} type='textbox' onChange={(e) => inputBox(e.target.value)} value={inputValue} />
            <p style={{ padding: 0, fontSize: "medium", margin: '5px 0 10px 0', color: "red" }}>{error ? <div>please type 4 digit number without duplicate</div> : null}</p>
            <div>
                <button style={{ padding: "12px 25px" }} onClick={() => finalAnswer()}>Guess</button>
            </div>
            <h3>guess code</h3>
            {/* <button onClick={stop}>stop</button> */}
            {codeShow ? (<div><div style={{ display: "flex", justifyContent: "center" }}>
                {
                    codeArray.map((ele, ind) => {
                        return (
                            <>
                                <div key={ind} style={{ padding: "10px" }}>
                                    {ele}
                                </div>
                            </>
                        )
                    })
                }
            </div>
                <div>{`number of guess : ${trys} `}</div></div>) : null}
        </div>
    )
}

export default GameBoard