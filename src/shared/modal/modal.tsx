import React, {ReactNode, useEffect, useRef, useState} from "react";
import './modal.css'
import { createPortal } from "react-dom";

type Props = {
    hideModal: () => void;
    children: ReactNode;
}

export const Modal: React.FC<Props> = ({hideModal, children: content}) => {
    const ref = useRef(null);

    // click вне
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as HTMLElement)) {
                hideModal();
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => {
            document.removeEventListener("mousedown", handleClick);
        };
    }, [hideModal])


    return createPortal(<div className="modal" ref={ref}>
        {content}
    </div>, document.body);
}