import React from "react";
import wallet from '../assets/wallet.svg'

export default function Header({ account }) {

    return (
        <div className="header">
            <div>TODO's</div>
            <div className="wallet">
                <img src={wallet} alt="wallet" />
                <abbr title={account} style={{ textDecoration: "none", overflow: "hidden" }}>{account}</abbr>
            </div>
        </div>
    )
}