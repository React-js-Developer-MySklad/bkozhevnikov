import React from "react";
import { Logo } from "../assets/logo";
import { AddImg } from "../assets/add";
import './header.css';

export const Header: React.FC = () => {
    return (
        <header className="header-with-logo">
            <Logo/>
            <button id="add-button-container"
                    data-modal-target="default-modal" data-modal-toggle="default-modal"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800
        add-button" type="button">
                <AddImg/>
            </button>
        </header>
    )
}