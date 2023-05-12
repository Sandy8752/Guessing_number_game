import React, { useState } from 'react'
import GameBoard from './GameBoard'

function Game() {
    let [name, setName] = useState("")
    let [show, setShow] = useState(false)
    let [arr, setArr] = useState([])
    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(0)
    function newGame() {
        let value = prompt("please enter your name")
        setName(value)
        localStorage.setItem("trys", 0)
        localStorage.setItem('minutes', 0)
        localStorage.setItem('seconds', 0)
        if (value == "") {
            newGame()
        }
        setShow(true)

        setArr(ran())
        setMinutes(0)
        setSeconds(0)

    }


    function ran() {
        let val = (Math.floor(1000 + Math.random() * 9000)).toString();
        let arr = val.split("").map(Number)
        let withoutDuplicate = [...new Set(arr)]
        if (arr.length == withoutDuplicate.length) {
            return arr
        } return ran()
    }


    return (
        <div >
            <button style={{ marginTop: "10px", padding: "12px 20px" }} onClick={() => { newGame() }}>New game</button>

            <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
                {
                    show ? (<div>
                        <div>{`Hi ${name}, guess a 4 digit Number from 0-9`}</div>
                        <GameBoard ran={ran} arr={arr} setArr={setArr} minutes={minutes} seconds={seconds} setMinutes={setMinutes} setSeconds={setSeconds} />
                    </div>) : null
                }
            </div>


        </div>
    )
}

export default Game