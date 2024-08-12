import React, { useState } from "react";
import { Header } from "../header/header";
import { Table } from "../table/table";
import { Footer } from "../footer/footer";
import { Modal } from "../modal/modal";


export const App: React.FC = () => {

    return (
        <div>
            <Header/>
            <Table/>
            <Footer/>
            <Modal/>            
        </div>
    )
}